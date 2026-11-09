document.addEventListener('DOMContentLoaded', () => {
    // Add any interactive JavaScript here
    // For example, smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {
    // Typing effect for "About Me"
    const text = "Computer Science graduate from the University of Southampton with a passion for artificial intelligence and software development. Equipped with hands-on experience in various programming languages and IT disciplines, I have successfully completed multiple projects showcasing my problem-solving and teamwork skills. Eager to apply my knowledge and creativity to develop innovative solutions in the tech industry.";
    const container = document.getElementById("about-me-text");
    
    let i = 0;

    function typeWriter() {
        if (i < text.length) {
            container.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 10); // Fast typing speed
        }
    }
    
    typeWriter();
    
    // Fade-in effect for the page
    document.body.classList.add('fade-in');
});

document.addEventListener('DOMContentLoaded', () => {
    const textElement = document.getElementById('typing-text');
    const text = 'Available for Freelance Work';
    let index = 0;

    function type() {
        if (index < text.length) {
            textElement.textContent += text.charAt(index);
            index++;
            setTimeout(type, 100);
        } else {
            setTimeout(() => {
                textElement.textContent = '';
                index = 0;
                type();
            }, 1000); // 2 second pause before starting the loop again
        }
    }

    type();
});

document.querySelector('.btn').addEventListener('click', function(event) {
    event.preventDefault();
    var href = this.getAttribute('href');
    setTimeout(function() {
        window.location = href;
    }, 300); // Delay to allow the fade out effect to complete
});

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navUl = document.querySelector('nav ul');

    menuToggle.addEventListener('click', function() {
        navUl.classList.toggle('show');
    });
});