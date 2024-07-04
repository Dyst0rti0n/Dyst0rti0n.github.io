document.addEventListener('DOMContentLoaded', function () {
    const module1Link = document.querySelector('#module1 .academy-card-link');
    const module2Card = document.querySelector('#module2');
    const module2Link = document.querySelector('#module2 .academy-card-link');

    // Check local storage for module completion
    const module1Completed = localStorage.getItem('module1Completed');

    // If module 1 is completed, unlock module 2
    if (module1Completed) {
        module2Card.classList.remove('locked');
        module2Link.classList.remove('locked-link');
        module2Link.setAttribute('href', '/academy/module2/lesson1');
        module2Link.removeAttribute('onclick');
    }

    // Listen for completion of module 1
    module1Link.addEventListener('click', function () {
        // Simulate module 1 completion
        localStorage.setItem('module1Completed', true);
    });
});
