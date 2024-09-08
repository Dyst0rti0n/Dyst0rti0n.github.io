document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const navbarMenu = document.querySelector('#navbar-menu');

    mobileMenu.addEventListener('click', () => {
        // Toggle 'is-active' on both the button and menu
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');

        // Smooth transition for the menu height
        if (navbarMenu.classList.contains('is-active')) {
            navbarMenu.style.maxHeight = navbarMenu.scrollHeight + 'px';  // Set maxHeight based on content height
        } else {
            navbarMenu.style.maxHeight = '0';  // Collapse the menu when closed
        }
    });

    // Close the menu if clicking outside of it
    document.addEventListener('click', (e) => {
        if (!navbarMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            navbarMenu.classList.remove('is-active');
            mobileMenu.classList.remove('is-active');
            navbarMenu.style.maxHeight = '0';  // Ensure menu collapses when clicked outside
        }
    });

    // Ensure the menu closes when resizing from mobile to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbarMenu.classList.remove('is-active');
            mobileMenu.classList.remove('is-active');
            navbarMenu.style.maxHeight = 'none';  // Reset maxHeight for desktop
        }
    });
});
