/**
 * UTM Generator and Tracker
 *
 * This script handles UTM parameter generation, tracking, and persistence.
 * It allows for tracking user journeys through the site and attributing
 * conversions to specific marketing efforts.
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize UTM tracking
    initUTMTracking();

    // Add UTM parameters to external links
    addUTMToExternalLinks();

    // Track outbound clicks
    trackOutboundClicks();
});

/**
 * Initialize UTM tracking by capturing and storing UTM parameters
 */
function initUTMTracking() {
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_content: urlParams.get('utm_content'),
        utm_term: urlParams.get('utm_term')
    };

    // Store UTM parameters in session storage if they exist
    let hasUtmParams = false;
    for (const [key, value] of Object.entries(utmParams)) {
        if (value) {
            sessionStorage.setItem(key, value);
            hasUtmParams = true;
        }
    }

    // If UTM parameters exist, store the landing page
    if (hasUtmParams) {
        sessionStorage.setItem('landing_page', window.location.pathname);
        sessionStorage.setItem('landing_time', new Date().toISOString());
    }

    // Track page view
    trackPageView();
}

/**
 * Add UTM parameters to all external links
 */
function addUTMToExternalLinks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentDomain = window.location.hostname;

    links.forEach(link => {
        // Skip if link already has UTM parameters
        if (link.href.includes('utm_source=')) return;

        // Skip if link is to the same domain
        const linkDomain = new URL(link.href).hostname;
        if (linkDomain === currentDomain) return;

        // Skip if link has attribute to prevent UTM addition
        if (link.hasAttribute('data-no-utm')) return;

        // Get UTM parameters to add
        const utmParams = getUTMParams(link);

        // Add UTM parameters to link
        link.href = addParamsToUrl(link.href, utmParams);
    });
}

/**
 * Get UTM parameters to add to a link
 *
 * @param {HTMLAnchorElement} link - The link element
 * @returns {Object} UTM parameters object
 */
function getUTMParams(link) {
    // Default UTM parameters
    const utmParams = {
        utm_source: 'blog-site',
        utm_medium: 'website',
        utm_campaign: 'general'
    };

    // Use data attributes if available
    if (link.dataset.utmMedium) utmParams.utm_medium = link.dataset.utmMedium;
    if (link.dataset.utmCampaign) utmParams.utm_campaign = link.dataset.utmCampaign;
    if (link.dataset.utmContent) utmParams.utm_content = link.dataset.utmContent;
    if (link.dataset.utmTerm) utmParams.utm_term = link.dataset.utmTerm;

    // Use stored UTM parameters if available
    const storedSource = sessionStorage.getItem('utm_source');
    if (storedSource) utmParams.utm_source = storedSource;

    return utmParams;
}

/**
 * Add parameters to a URL
 *
 * @param {string} url - The URL to add parameters to
 * @param {Object} params - The parameters to add
 * @returns {string} URL with parameters
 */
function addParamsToUrl(url, params) {
    const urlObj = new URL(url);

    for (const [key, value] of Object.entries(params)) {
        if (value) urlObj.searchParams.set(key, value);
    }

    return urlObj.toString();
}

/**
 * Track outbound clicks
 */
function trackOutboundClicks() {
    const links = document.querySelectorAll('a[href^="http"]');
    const currentDomain = window.location.hostname;

    links.forEach(link => {
        const linkDomain = new URL(link.href).hostname;

        // Only track external links
        if (linkDomain !== currentDomain) {
            link.addEventListener('click', function(e) {
                // Track outbound click
                const clickData = {
                    event: 'outbound_click',
                    link_url: link.href,
                    link_text: link.innerText || link.textContent,
                    link_domain: linkDomain,
                    page_url: window.location.href,
                    utm_source: sessionStorage.getItem('utm_source') || 'direct',
                    utm_medium: sessionStorage.getItem('utm_medium') || 'none',
                    utm_campaign: sessionStorage.getItem('utm_campaign') || 'none'
                };

                // Send to analytics if available
                if (window.gtag) {
                    gtag('event', 'outbound_click', clickData);
                }

                // Log for debugging
                console.log('Outbound click:', clickData);
            });
        }
    });
}

/**
 * Track page view
 */
function trackPageView() {
    // Get UTM parameters from session storage
    const utmSource = sessionStorage.getItem('utm_source') || 'direct';
    const utmMedium = sessionStorage.getItem('utm_medium') || 'none';
    const utmCampaign = sessionStorage.getItem('utm_campaign') || 'none';
    const landingPage = sessionStorage.getItem('landing_page') || window.location.pathname;

    // Prepare page view data
    const pageViewData = {
        event: 'page_view',
        page_url: window.location.href,
        page_title: document.title,
        utm_source: utmSource,
        utm_medium: utmMedium,
        utm_campaign: utmCampaign,
        landing_page: landingPage
    };

    // Send to analytics if available
    if (window.gtag) {
        gtag('event', 'page_view', pageViewData);
    }

    // Log for debugging
    console.log('Page view:', pageViewData);
}