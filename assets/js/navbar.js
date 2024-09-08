document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const navbarMenu = document.querySelector('#navbar-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');

        // Manage the max-height transition for opening/closing the mobile menu
        if (navbarMenu.classList.contains('is-active')) {
            navbarMenu.style.maxHeight = navbarMenu.scrollHeight + 'px';
        } else {
            navbarMenu.style.maxHeight = '0';
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
            navbarMenu.style.maxHeight = 'none';  // Reset for desktop view
        }
    });
});
