document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loader = document.getElementById('loader');
    const deliverySection = document.getElementById('deliverySection');
    const acceptDeliveryBtn = document.getElementById('acceptDeliveryBtn');
    const nameModal = document.getElementById('nameModal');
    const nameInput = document.getElementById('nameInput');
    const submitNameBtn = document.getElementById('submitNameBtn');
    const mainContainer = document.getElementById('mainContainer');
    const carePackageSection = document.getElementById('carePackageSection');
    const carePackageBox = document.querySelector('.care-package-box');
    const packageContents = document.getElementById('packageContents');
    const flowerBouquet = document.getElementById('flowerBouquet');
    const floatingHearts = document.getElementById('floatingHearts');

    // Hide loader and show delivery section
    window.addEventListener('load', function() {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1500);
    });

    // Accept delivery button
    acceptDeliveryBtn.addEventListener('click', function() {
        deliverySection.classList.add('hidden');
        setTimeout(() => {
            nameModal.classList.add('show');
            nameInput.focus();
        }, 800);
    });

    // Submit name
    submitNameBtn.addEventListener('click', function() {
        verifyName();
    });

    nameInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            verifyName();
        }
    });

    function verifyName() {
        const name = nameInput.value.trim();
        
        if (name.toLowerCase() === 'kavithi') {
            // Correct name
            nameModal.classList.remove('show');
            setTimeout(() => {
                mainContainer.classList.add('show');
            }, 500);
        } else if (name === '') {
            // Empty name
            nameInput.classList.add('animate__animated', 'animate__shakeX');
            setTimeout(() => {
                nameInput.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
        } else {
            // Wrong name
            nameInput.classList.add('animate__animated', 'animate__shakeX');
            
            // Show error message
            const existingError = document.querySelector('.error-message');
            if (existingError) {
                existingError.remove();
            }
            
            const errorMsg = document.createElement('p');
            errorMsg.className = 'error-message animate__animated animate__fadeIn';
            errorMsg.textContent = 'This care package is for Kavithi only! 💕';
            errorMsg.style.color = '#ab47bc';
            errorMsg.style.marginTop = '15px';
            errorMsg.style.fontWeight = '600';
            
            document.querySelector('.modal-content').appendChild(errorMsg);
            
            setTimeout(() => {
                nameInput.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
        }
    }

    // Open care package
    carePackageBox.addEventListener('click', function() {
        this.classList.add('opened');
        
        setTimeout(() => {
            carePackageSection.style.display = 'none';
            packageContents.classList.add('show');
            
            // Create flowers and show message after all flowers are loaded
            createFlowers();
            
            // Start floating hearts
            startFloatingHearts();
        }, 1000);
    });

    // Create cute gift
    function createFlowers() {
        const giftContainer = document.createElement('div');
        giftContainer.className = 'cute-gift';
        
        const giftImage = document.createElement('img');
        giftImage.src = 'images/cat-flower.gif';
        giftImage.alt = 'Hope this makes you feel better';
        
        giftContainer.appendChild(giftImage);
        flowerBouquet.appendChild(giftContainer);
        
        // Show message after gift animation completes
        setTimeout(() => {
            document.querySelector('.get-well-message').classList.add('animate__fadeInUp');
        }, 1500);
    }

    // Floating hearts
    function startFloatingHearts() {
        setInterval(() => {
            createFloatingHeart();
        }, 2000);
    }

    function createFloatingHeart() {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        
        const hearts = ['💕', '💖', '💗', '🌸', '✨', '🌟', '💊'];
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (8 + Math.random() * 4) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 12000);
    }

    // Add sparkles to title
    const messageTitle = document.querySelector('.message-card h1');
    if (messageTitle) {
        setInterval(() => {
            createSparkle(messageTitle);
        }, 600);
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
});
