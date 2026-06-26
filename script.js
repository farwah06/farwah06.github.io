(function() {
            // Theme Toggle
            const themeToggle = document.getElementById('themeToggle');
            const html = document.documentElement;
            const savedTheme = localStorage.getItem('theme') || 'light';
            html.setAttribute('data-theme', savedTheme);

            themeToggle.addEventListener('click', function() {
                const currentTheme = html.getAttribute('data-theme');
                const newTheme = currentTheme === 'light' ? 'dark' : 'light';
                html.setAttribute('data-theme', newTheme);
                localStorage.setItem('theme', newTheme);
            });

            // Typing Effect
            const words = ['secure', 'resilient', 'protected', 'defended'];
            let wordIndex = 0;
            let charIndex = 0;
            let isDeleting = false;
            const typingElement = document.getElementById('typingText');

            function typeEffect() {
                const currentWord = words[wordIndex];

                if (isDeleting) {
                    typingElement.textContent = currentWord.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    typingElement.textContent = currentWord.substring(0, charIndex + 1);
                    charIndex++;
                }

                let typeSpeed = isDeleting ? 100 : 200;

                if (!isDeleting && charIndex === currentWord.length) {
                    typeSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    isDeleting = false;
                    wordIndex = (wordIndex + 1) % words.length;
                    typeSpeed = 500;
                }

                setTimeout(typeEffect, typeSpeed);
            }

            setTimeout(typeEffect, 1000);

            // Scroll Animations
            const observerOptions = {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            };

            const observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, observerOptions);

            document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
                observer.observe(el);
            });

            // Smooth Scroll
            document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                });
            });

            // Active Navigation Highlight
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');

            window.addEventListener('scroll', function() {
                let current = '';
                sections.forEach(function(section) {
                    const sectionTop = section.offsetTop;
                    if (scrollY >= sectionTop - 200) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(function(link) {
                    link.style.color = '';
                    if (link.getAttribute('href') === '#' + current) {
                        link.style.color = 'var(--text)';
                    }
                });
            });

            // Console Easter Egg
            console.log('%c🔒 Cybersecurity Portfolio', 'font-size: 20px; font-weight: bold; color: #2563eb;');
            console.log('%cWelcome, fellow security enthusiast!', 'font-size: 14px; color: #6b7280;');
        })();
