/**
 * Content Teaser and Gating System
 *
 * This script handles content gating mechanisms for premium content.
 * It allows for teasing premium content and redirecting users to payment/signup flows.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize content gating
    initContentGating();

    // Set up premium content teasers
    setupContentTeasers();

    // Set up email capture forms
    setupEmailCaptureForms();
});

/**
 * Initialize content gating
 */
function initContentGating() {
    // Check if user is on a gated content page
    const gatedContent = document.querySelector('.gated-content');
    if (!gatedContent) return;

    // Check if user has access to this content
    const contentId = gatedContent.getAttribute('data-content-id');
    const hasAccess = checkContentAccess(contentId);

    if (hasAccess) {
        // User has access, show full content
        showFullContent(gatedContent);
    } else {
        // User doesn't have access, show teaser
        showContentTeaser(gatedContent);
    }
}

/**
 * Check if user has access to content
 *
 * @param {string} contentId - The ID of the content to check
 * @returns {boolean} Whether the user has access
 */
function checkContentAccess(contentId) {
    // Check local storage for access token
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) return false;

    // Check if token grants access to this content
    try {
        const accessData = JSON.parse(localStorage.getItem('access_data') || '{}');

        // Check if content is in the access list
        if (accessData.contentIds && accessData.contentIds.includes(contentId)) {
            return true;
        }

        // Check if user has premium access
        if (accessData.isPremium) {
            return true;
        }

        // Check if content is in user's purchased items
        if (accessData.purchasedItems && accessData.purchasedItems.includes(contentId)) {
            return true;
        }
    } catch (error) {
        console.error('Error checking content access:', error);
    }

    return false;
}

/**
 * Show full content
 *
 * @param {HTMLElement} gatedContent - The gated content element
 */
function showFullContent(gatedContent) {
    // Show the full content
    const fullContent = gatedContent.querySelector('.full-content');
    if (fullContent) {
        fullContent.style.display = 'block';
    }

    // Hide the teaser
    const contentTeaser = gatedContent.querySelector('.content-teaser');
    if (contentTeaser) {
        contentTeaser.style.display = 'none';
    }
}

/**
 * Show content teaser
 *
 * @param {HTMLElement} gatedContent - The gated content element
 */
function showContentTeaser(gatedContent) {
    // Show the teaser
    const contentTeaser = gatedContent.querySelector('.content-teaser');
    if (contentTeaser) {
        contentTeaser.style.display = 'block';
    }

    // Hide the full content
    const fullContent = gatedContent.querySelector('.full-content');
    if (fullContent) {
        fullContent.style.display = 'none';
    }
}

/**
 * Set up content teasers
 */
function setupContentTeasers() {
    const teasers = document.querySelectorAll('.content-teaser');

    teasers.forEach(teaser => {
        // Get action buttons
        const subscribeButton = teaser.querySelector('.subscribe-button');
        const purchaseButton = teaser.querySelector('.purchase-button');
        const loginButton = teaser.querySelector('.login-button');

        // Add event listeners
        if (subscribeButton) {
            subscribeButton.addEventListener('click', handleSubscribeClick);
        }

        if (purchaseButton) {
            purchaseButton.addEventListener('click', handlePurchaseClick);
        }

        if (loginButton) {
            loginButton.addEventListener('click', handleLoginClick);
        }
    });
}

/**
 * Handle subscribe button click
 *
 * @param {Event} event - The click event
 */
function handleSubscribeClick(event) {
    const button = event.currentTarget;
    const contentId = button.getAttribute('data-content-id');
    const subscribeUrl = button.getAttribute('data-subscribe-url') || '/newsletter/subscribe';

    // Add UTM parameters
    const utmParams = {
        utm_source: 'blog-site',
        utm_medium: 'content-teaser',
        utm_campaign: 'premium-content',
        utm_content: contentId
    };

    // Redirect to subscribe page
    window.location.href = addParamsToUrl(subscribeUrl, utmParams);
}

/**
 * Handle purchase button click
 *
 * @param {Event} event - The click event
 */
function handlePurchaseClick(event) {
    const button = event.currentTarget;
    const contentId = button.getAttribute('data-content-id');
    const productId = button.getAttribute('data-product-id');
    const purchaseUrl = button.getAttribute('data-purchase-url');

    if (!purchaseUrl) return;

    // Add UTM parameters
    const utmParams = {
        utm_source: 'blog-site',
        utm_medium: 'content-teaser',
        utm_campaign: 'premium-content',
        utm_content: contentId,
        product_id: productId
    };

    // Redirect to purchase page
    window.location.href = addParamsToUrl(purchaseUrl, utmParams);
}

/**
 * Handle login button click
 *
 * @param {Event} event - The click event
 */
function handleLoginClick(event) {
    const button = event.currentTarget;
    const contentId = button.getAttribute('data-content-id');
    const loginUrl = button.getAttribute('data-login-url') || '/login';

    // Add UTM parameters
    const utmParams = {
        utm_source: 'blog-site',
        utm_medium: 'content-teaser',
        utm_campaign: 'premium-content',
        utm_content: contentId,
        redirect_to: window.location.pathname
    };

    // Redirect to login page
    window.location.href = addParamsToUrl(loginUrl, utmParams);
}

/**
 * Set up email capture forms
 */
function setupEmailCaptureForms() {
    const forms = document.querySelectorAll('.email-capture-form');

    forms.forEach(form => {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // Get form data
            const email = form.querySelector('input[type="email"]').value;
            const name = form.querySelector('input[name="name"]') ? .value || '';
            const contentId = form.getAttribute('data-content-id');
            const redirectUrl = form.getAttribute('data-redirect-url');

            // Store email in local storage
            localStorage.setItem('user_email', email);
            if (name) localStorage.setItem('user_name', name);

            // Track email capture
            trackEmailCapture(email, contentId);

            // Show success message
            const successMessage = form.querySelector('.success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
            }

            // Hide form
            form.querySelector('.form-fields').style.display = 'none';

            // Redirect if needed
            if (redirectUrl) {
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 2000);
            }
        });
    });
}

/**
 * Track email capture
 *
 * @param {string} email - The captured email
 * @param {string} contentId - The ID of the content
 */
function trackEmailCapture(email, contentId) {
    // Prepare email capture data
    const emailCaptureData = {
        event: 'email_capture',
        email_hash: hashEmail(email), // Hash for privacy
        content_id: contentId,
        page_url: window.location.href,
        utm_source: sessionStorage.getItem('utm_source') || 'direct',
        utm_medium: sessionStorage.getItem('utm_medium') || 'none',
        utm_campaign: sessionStorage.getItem('utm_campaign') || 'none'
    };

    // Send to analytics if available
    if (window.gtag) {
        gtag('event', 'email_capture', emailCaptureData);
    }

    // Log for debugging
    console.log('Email capture:', emailCaptureData);
}

/**
 * Hash email for privacy
 *
 * @param {string} email - The email to hash
 * @returns {string} Hashed email
 */
function hashEmail(email) {
    // Simple hash function for demo purposes
    // In production, use a proper hashing function
    let hash = 0;
    for (let i = 0; i < email.length; i++) {
        const char = email.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return hash.toString(36);
}

/**
 * Add parameters to a URL
 *
 * @param {string} url - The URL to add parameters to
 * @param {Object} params - The parameters to add
 * @returns {string} URL with parameters
 */
function addParamsToUrl(url, params) {
    const urlObj = new URL(url, window.location.origin);

    for (const [key, value] of Object.entries(params)) {
        if (value) urlObj.searchParams.set(key, value);
    }

    return urlObj.toString();
}