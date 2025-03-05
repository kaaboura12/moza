document.addEventListener('DOMContentLoaded', () => {
    // Heart click handler
    const heartIntro = document.querySelector('.heart-intro');
    const mainContent = document.querySelector('.main-content');
    const bigHeart = document.querySelector('.big-heart');

    bigHeart.addEventListener('click', () => {
        heartIntro.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        mainContent.classList.add('fade-in');
        
        // Initialize the rest of the animations after the main content is visible
        setTimeout(initializeMainContent, 1000);
    });

    // Function to initialize main content animations
    function initializeMainContent() {
        // Smooth scroll for navigation
        document.querySelector('.scroll-down').addEventListener('click', () => {
            document.querySelector('.photo-section').scrollIntoView({
                behavior: 'smooth'
            });
        });

        // Animate elements on scroll
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.photo-container, .message-container, .memory-card');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const elementBottom = element.getBoundingClientRect().bottom;
                
                if (elementTop < window.innerHeight && elementBottom > 0) {
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }
            });
        };

        // Initial styles for animation
        const elements = document.querySelectorAll('.photo-container, .message-container, .memory-card');
        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(50px)';
            element.style.transition = 'all 0.8s ease-out';
        });

        // Add scroll event listener
        window.addEventListener('scroll', animateOnScroll);
        animateOnScroll(); // Initial check

        // Add floating hearts animation
        const createHeart = () => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 2 + 's';
            document.body.appendChild(heart);

            setTimeout(() => {
                heart.remove();
            }, 5000);
        };

        // Create floating hearts periodically
        setInterval(createHeart, 3000);

        // Add CSS for floating hearts
        const style = document.createElement('style');
        style.textContent = `
            .floating-heart {
                position: fixed;
                font-size: 1.5rem;
                user-select: none;
                pointer-events: none;
                animation: float-up linear forwards;
                z-index: 1000;
            }

            @keyframes float-up {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                }
                100% {
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
        `;
        document.head.appendChild(style);
    }
}); 