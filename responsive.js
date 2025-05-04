document.addEventListener('DOMContentLoaded', function () {
    const body = document.querySelector('body');
    const menuToggle = document.querySelector('.menu-toggle'); // your hamburger
    const nav = document.querySelector('nav ul'); // the nav links list
    const navLinks = document.querySelectorAll('nav ul li a');

    // Toggle mobile menu
    menuToggle.addEventListener('click', function () {
        nav.classList.toggle('show');
        menuToggle.classList.toggle('active');
        body.classList.toggle('no-scroll'); // Prevent background scrolling
    });

    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            nav.classList.remove('show');
            menuToggle.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    });
});
