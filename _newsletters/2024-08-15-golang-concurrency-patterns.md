---
layout: newsletter
title: "Advanced Go Concurrency Patterns"
date: 2024-08-15
categories: [programming, golang]
description: "Deep dive into powerful concurrency patterns in Go"
image: "/assets/images/newsletter/go-concurrency.jpg"
premium: false
related_product: "go-toolkit"
---

# Advanced Go Concurrency Patterns

Go's concurrency model is one of its most powerful features, but mastering it requires understanding several key patterns. This newsletter explores advanced concurrency techniques that can help you write more efficient and maintainable Go code.

## The Context Package: Managing Cancellation

The `context` package is essential for controlling cancellation across API boundaries and between goroutines:

```go
func processRequest(ctx context.Context, data []byte) (Result, error) {
    // Create a derived context with timeout
    ctx, cancel := context.WithTimeout(ctx, 2*time.Second)
    defer cancel() // Always call cancel to release resources

    resultCh := make(chan Result, 1)
    errCh := make(chan error, 1)

    go func() {
        result, err := performExpensiveOperation(ctx, data)
        if err != nil {
            errCh <- err
            return
        }
        resultCh <- result
    }()

    select {
    case result := <-resultCh:
        return result, nil
    case err := <-errCh:
        return Result{}, err
    case <-ctx.Done():
        return Result{}, ctx.Err() // Returns context.DeadlineExceeded or context.Canceled
    }
}
```

## Worker Pools: Controlling Concurrency

Worker pools help limit the number of concurrent operations, preventing resource exhaustion:

```go
func processItems(items []Item) []Result {
    numWorkers := 5
    jobs := make(chan Item, len(items))
    results := make(chan Result, len(items))

    // Start workers
    var wg sync.WaitGroup
    wg.Add(numWorkers)
    for i := 0; i < numWorkers; i++ {
        go func() {
            defer wg.Done()
            for job := range jobs {
                results <- processItem(job)
            }
        }()
    }

    // Send jobs
    for _, item := range items {
        jobs <- item
    }
    close(jobs)

    // Wait for workers to finish
    go func() {
        wg.Wait()
        close(results)
    }()

    // Collect results
    var allResults []Result
    for result := range results {
        allResults = append(allResults, result)
    }
    return allResults
}
```

## Error Handling in Concurrent Code

Error handling in concurrent code requires special attention:

```go
func concurrentProcessing(items []Item) ([]Result, error) {
    var (
        mu      sync.Mutex
        wg      sync.WaitGroup
        results = make([]Result, len(items))
        errChan = make(chan error, 1) // Buffer of 1 to avoid goroutine leaks
    )

    for i, item := range items {
        wg.Add(1)
        go func(i int, item Item) {
            defer wg.Done()

            result, err := processItem(item)
            if err != nil {
                select {
                case errChan <- fmt.Errorf("item %d: %w", i, err):
                default:
                    // Another error was already sent
                }
                return
            }

            mu.Lock()
            results[i] = result
            mu.Unlock()
        }(i, item)
    }

    // Wait for all goroutines to complete
    wg.Wait()

    // Check if any errors occurred
    select {
    case err := <-errChan:
        return nil, err
    default:
        return results, nil
    }
}
```

## The errgroup Package

The `golang.org/x/sync/errgroup` package provides a cleaner way to handle errors in concurrent operations:

```go
func processWithErrgroup(ctx context.Context, urls []string) ([]Response, error) {
    g, ctx := errgroup.WithContext(ctx)
    responses := make([]Response, len(urls))

    for i, url := range urls {
        i, url := i, url // Create local variables to avoid closure issues
        g.Go(func() error {
            resp, err := fetchURL(ctx, url)
            if err != nil {
                return fmt.Errorf("fetching %s: %w", url, err)
            }
            responses[i] = resp
            return nil
        })
    }

    // Wait for all fetches to complete or for an error
    if err := g.Wait(); err != nil {
        return nil, err
    }
    return responses, nil
}
```

## Rate Limiting

Rate limiting is crucial when interacting with external services:

```go
func rateLimitedRequests(urls []string, rps int) []Response {
    limiter := time.Tick(time.Second / time.Duration(rps))
    var responses []Response

    for _, url := range urls {
        <-limiter // Wait for next slot in rate limit
        resp, err := http.Get(url)
        if err != nil {
            // Handle error
            continue
        }
        // Process response
        responses = append(responses, processResponse(resp))
    }

    return responses
}
```

## Conclusion

Mastering these concurrency patterns will help you write Go code that's both performant and maintainable. Remember these key principles:

1. Always use context for cancellation and timeouts
2. Control concurrency with worker pools
3. Handle errors carefully in concurrent code
4. Use synchronization primitives appropriately
5. Consider rate limiting for external service calls

In our next newsletter, we'll explore advanced error handling patterns in Go, including wrapping errors, custom error types, and error hierarchies.

---

*Want to learn more about Go programming patterns? Check out our Go Developer's Toolkit with comprehensive resources for building efficient Go applications.*
