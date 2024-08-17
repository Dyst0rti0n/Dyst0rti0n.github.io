document.addEventListener('DOMContentLoaded', () => {
    const mobileMenu = document.querySelector('#mobile-menu');
    const navbarMenu = document.querySelector('.navbar-menu');

    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('is-active');
        navbarMenu.classList.toggle('active');

        if (navbarMenu.classList.contains('active')) {
            navbarMenu.style.maxHeight = navbarMenu.scrollHeight + 'px';
        } else {
            navbarMenu.style.maxHeight = '0';
        }
    });

    // Close the menu if you click outside of it
    document.addEventListener('click', (e) => {
        if (!navbarMenu.contains(e.target) && !mobileMenu.contains(e.target)) {
            navbarMenu.classList.remove('active');
            mobileMenu.classList.remove('is-active');
            navbarMenu.style.maxHeight = '0';
        }
    });
});
