document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const navbarMenu = document.querySelector('#navbar-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('is-active');

        // Adjust max-height for the sliding effect
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
            navbarMenu.style.maxHeight = '0';
        }
    });

    // Ensure the menu resets when resizing from mobile to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            navbarMenu.classList.remove('is-active');
            mobileMenu.classList.remove('is-active');
            navbarMenu.style.maxHeight = 'none'; // Remove max-height for desktop
        }
    });
});
