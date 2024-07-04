document.addEventListener('DOMContentLoaded', function () {
    var navbar = document.getElementById('navbar');
    var lastScrollTop = 0;

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop) {
            // Downscroll
            navbar.classList.add('hidden');
        } else {
            // Upscroll
            navbar.classList.remove('hidden');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });

    document.querySelector('.icon').addEventListener('click', function () {
        var navbarCenter = document.getElementById('navbar-center');
        if (navbarCenter.style.display === 'flex') {
            navbarCenter.style.display = 'none';
        } else {
            navbarCenter.style.display = 'flex';
        }
    });
});
