document.addEventListener('DOMContentLoaded', function() {
    let startTime = Date.now();

    // Track time spent on page
    window.addEventListener('beforeunload', function() {
        let timeSpent = (Date.now() - startTime) / 1000;
        gtag('event', 'time_spent', {
            'event_category': 'engagement',
            'event_label': 'Time Spent on Page',
            'value': timeSpent
        });
    });

    // Track clicks on navigation links
    document.querySelectorAll('nav ul li a').forEach(link => {
        link.addEventListener('click', function() {
            gtag('event', 'click', {
                'event_category': 'navigation',
                'event_label': link.textContent,
                'value': 1
            });
        });
    });

    // Track clicks on GitHub repository links
    document.addEventListener('click', function(event) {
        if (event.target.matches('.repo')) {
            gtag('event', 'click', {
                'event_category': 'GitHub Repo',
                'event_label': event.target.querySelector('h3').textContent,
                'value': 1
            });
        }
    });
});