
        // Navigation menu toggle for mobile
        function toggleMenu() {
            const navLinks = document.getElementById('navLinks');
            navLinks.classList.toggle('active');
        }

        // Smooth scrolling and active link highlighting
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu after click
                document.getElementById('navLinks').classList.remove('active');
            });
        });

        // Intersection Observer for fade-in animations
        const faders = document.querySelectorAll('.fade-in');
        const appearOptions = {
            threshold: 0.1
        };

        const appearOnScroll = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('visible');
                
                // For skill bars, we want them to animate even if they are in view on load
                if (entry.target.classList.contains('progress-visible')) {
                    entry.target.classList.add('visible');
                }
                
                observer.unobserve(entry.target);
            });
        }, appearOptions);

        faders.forEach(fader => {
            appearOnScroll.observe(fader);
        });

        // Force visibility of skill bars on page load
        window.addEventListener('load', () => {
            document.querySelectorAll('.progress-visible').forEach(skill => {
                skill.classList.add('visible');
            });
        });

        // Remplacer la gestion du formulaire existante par :
document.querySelector('.contact-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    try {
        const response = await fetch('http://localhost:5000/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        const result = await response.json();
        
        if (result.success) {
            alert('Merci ! Votre message a été envoyé.');
            this.reset();
        } else {
            alert('Erreur : ' + (result.error || 'Veuillez réessayer'));
        }
    } catch (error) {
        alert('Erreur de connexion au serveur. Vérifiez que le backend est en cours d\'exécution.');
        console.error('Erreur:', error);
    }
});

        // Active section highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav ul li a');
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (pageYOffset >= sectionTop - 100 && pageYOffset < sectionTop + sectionHeight - 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });