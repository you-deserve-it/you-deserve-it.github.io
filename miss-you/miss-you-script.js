document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loader = document.getElementById('loader');
    const mainContainer = document.getElementById('mainContainer');
    const heartButton = document.getElementById('heartButton');
    const loveNotes = document.getElementById('loveNotes');
    const heartsBackground = document.getElementById('heartsBackground');
    
    // Hide loader and show main content
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
            setTimeout(() => {
                mainContainer.classList.add('show');
                startFloatingHearts();
            }, 500);
        }, 1500);
    });
    
    // Heart button click event
    let notesShown = false;
    heartButton.addEventListener('click', function() {
        if (!notesShown) {
            // Show love notes with animations
            loveNotes.classList.add('show');
            
            // Animate each note card individually
            const noteCards = loveNotes.querySelectorAll('.note-card');
            noteCards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('animate__bounceIn');
                }, index * 200);
            });
            
            // Show the hidden footer message after note cards
            const footerMessageHidden = document.getElementById('footerMessageHidden');
            if (footerMessageHidden) {
                setTimeout(() => {
                    footerMessageHidden.classList.add('animate__animated', 'animate__fadeInUp');
                }, noteCards.length * 200 + 300);
            }
            
            // Update button text
            this.querySelector('.button-text').textContent = 'Yeyyy I knew it hehehehe! 💕';
            
            // Add extra hearts animation
            createHeartBurst();
            
            notesShown = true;
        } else {
            // Hide notes
            loveNotes.classList.remove('show');
            const noteCards = loveNotes.querySelectorAll('.note-card');
            noteCards.forEach(card => {
                card.classList.remove('animate__bounceIn');
            });
            
            // Hide the footer message
            const footerMessageHidden = document.getElementById('footerMessageHidden');
            if (footerMessageHidden) {
                footerMessageHidden.classList.remove('animate__animated', 'animate__fadeInUp');
            }
            
            // Reset button text
            this.querySelector('.button-text').textContent = 'Click if you miss me too hehehehe!';
            notesShown = false;
        }
    });
    
    // Create floating hearts in background
    function startFloatingHearts() {
        setInterval(() => {
            createFloatingHeart();
        }, 1500);
    }
    
    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        // Random heart emoji
        const hearts = ['💕', '💖', '💗', '💓', '💝', '❤️', '🥰', '😍'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        // Random position
        heart.style.left = Math.random() * 100 + '%';
        
        // Random animation duration
        const duration = 8 + Math.random() * 4;
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        heartsBackground.appendChild(heart);
        
        // Remove heart after animation
        setTimeout(() => {
            heart.remove();
        }, (duration + 2) * 1000);
    }
    
    // Create heart burst effect when button is clicked
    function createHeartBurst() {
        const button = heartButton;
        const rect = button.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.className = 'burst-heart';
            heart.textContent = '💕';
            heart.style.position = 'fixed';
            heart.style.left = centerX + 'px';
            heart.style.top = centerY + 'px';
            heart.style.fontSize = (15 + Math.random() * 15) + 'px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            
            document.body.appendChild(heart);
            
            // Random direction
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 100 + Math.random() * 100;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            // Animate
            let opacity = 1;
            let x = 0;
            let y = 0;
            const animation = setInterval(() => {
                x += vx * 0.016;
                y += vy * 0.016;
                opacity -= 0.02;
                
                heart.style.transform = `translate(${x}px, ${y}px)`;
                heart.style.opacity = opacity;
                
                if (opacity <= 0) {
                    clearInterval(animation);
                    heart.remove();
                }
            }, 16);
        }
    }
    
    // Add sparkle effect to main heading
    const heading = document.querySelector('.miss-you-message h1');
    if (heading) {
        setInterval(() => {
            createSparkle(heading);
        }, 500);
    }
    
    function createSparkle(element) {
        const sparkle = document.createElement('span');
        sparkle.textContent = '✨';
        sparkle.style.position = 'absolute';
        sparkle.style.fontSize = '20px';
        sparkle.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        sparkle.style.left = (rect.left + Math.random() * rect.width) + 'px';
        sparkle.style.top = (rect.top + Math.random() * rect.height) + 'px';
        
        document.body.appendChild(sparkle);
        
        let opacity = 1;
        let y = 0;
        const animation = setInterval(() => {
            y -= 2;
            opacity -= 0.05;
            sparkle.style.transform = `translateY(${y}px)`;
            sparkle.style.opacity = opacity;
            
            if (opacity <= 0) {
                clearInterval(animation);
                sparkle.remove();
            }
        }, 30);
    }
    
    // Add hover effect to study characters
    const characters = document.querySelectorAll('.character img');
    characters.forEach(char => {
        char.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) rotate(5deg)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        char.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });
    
    // Add typing effect to subtitle
    const subtitleElements = document.querySelectorAll('.subtitle p');
    if (subtitleElements.length > 0) {
        setTimeout(() => {
            subtitleElements.forEach((elem, index) => {
                setTimeout(() => {
                    elem.style.opacity = '0';
                    const text = elem.textContent;
                    elem.textContent = '';
                    elem.style.opacity = '1';
                    
                    let charIndex = 0;
                    const typeInterval = setInterval(() => {
                        if (charIndex < text.length) {
                            elem.textContent += text.charAt(charIndex);
                            charIndex++;
                        } else {
                            clearInterval(typeInterval);
                        }
                    }, 50);
                }, index * 2000);
            });
        }, 2000);
    }
    
    // Add click effect to corner decorations
    const cornerDecos = document.querySelectorAll('.corner-deco');
    cornerDecos.forEach(deco => {
        deco.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = '';
            }, 10);
            
            // Create small heart burst
            const rect = this.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('div');
                heart.textContent = '💕';
                heart.style.position = 'fixed';
                heart.style.left = centerX + 'px';
                heart.style.top = centerY + 'px';
                heart.style.fontSize = '20px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                
                document.body.appendChild(heart);
                
                const angle = (Math.PI * 2 * i) / 5;
                const velocity = 50;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let opacity = 1;
                let x = 0;
                let y = 0;
                const animation = setInterval(() => {
                    x += vx * 0.016;
                    y += vy * 0.016;
                    opacity -= 0.03;
                    
                    heart.style.transform = `translate(${x}px, ${y}px)`;
                    heart.style.opacity = opacity;
                    
                    if (opacity <= 0) {
                        clearInterval(animation);
                        heart.remove();
                    }
                }, 16);
            }
        });
    });
    
    // Add random floating decorations animation
    const floatingDecos = document.querySelectorAll('.floating-decoration');
    floatingDecos.forEach((deco, index) => {
        setInterval(() => {
            deco.style.transform = `scale(${1 + Math.random() * 0.2})`;
        }, 2000 + index * 500);
    });
});
