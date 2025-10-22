document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const pageLoader = document.getElementById('pageLoader');
    const introAnimation = document.getElementById('introAnimation');
    const acceptDelivery = document.getElementById('acceptDelivery');
    const nameModal = document.getElementById('nameModal');
    const nameInput = document.getElementById('nameInput');
    const submitName = document.getElementById('submitName');
    const mainContainer = document.getElementById('mainContainer');
    const giftBox = document.getElementById('giftBox');
    const messageContainer = document.getElementById('messageContainer');
    const flowerContainer = document.getElementById('flowerContainer');
    const loveMessage = document.getElementById('loveMessage');
    const backgroundHearts = document.getElementById('backgroundHearts');
    
    // Hide loader after everything is loaded, show intro animation
    window.addEventListener('load', function() {
        setTimeout(() => {
            pageLoader.style.opacity = '0';
            setTimeout(() => {
                pageLoader.style.display = 'none';
            }, 500);
        }, 800);
    });
    
    // Create flower bouquet
    function createFlowers() {
        // Create main bouquet container
        const bouquet = document.createElement('div');
        bouquet.className = 'bouquet animate__animated animate__bounceIn';
        
        // Create bouquet wrapper
        const bouquetWrapper = document.createElement('div');
        bouquetWrapper.className = 'bouquet-wrapper';
        bouquet.appendChild(bouquetWrapper);
        
        // Create bouquet paper wrapping
        const bouquetPaper = document.createElement('div');
        bouquetPaper.className = 'bouquet-paper';
        bouquetWrapper.appendChild(bouquetPaper);
        
        // Create bouquet ribbon
        const bouquetRibbon = document.createElement('div');
        bouquetRibbon.className = 'bouquet-ribbon';
        bouquetWrapper.appendChild(bouquetRibbon);
        
        // Create bouquet bow
        const bouquetBow = document.createElement('div');
        bouquetBow.className = 'bouquet-bow';
        bouquetWrapper.appendChild(bouquetBow);
        
        // Create flower cluster container
        const flowerCluster = document.createElement('div');
        flowerCluster.className = 'flower-cluster';
        bouquetWrapper.appendChild(flowerCluster);
        
        // Create white flowers
        const flowerPositions = [
            { top: '10px', left: '50%', transform: 'translateX(-50%) scale(1.2)' },
            { top: '40px', left: '30%', transform: 'translateX(-50%) scale(1.1) rotate(-5deg)' },
            { top: '35px', left: '70%', transform: 'translateX(-50%) scale(1.1) rotate(5deg)' },
            { top: '60px', left: '20%', transform: 'translateX(-50%) scale(1)' },
            { top: '65px', left: '80%', transform: 'translateX(-50%) scale(1)' },
            { top: '80px', left: '40%', transform: 'translateX(-50%) scale(0.95) rotate(-8deg)' },
            { top: '85px', left: '60%', transform: 'translateX(-50%) scale(0.95) rotate(8deg)' },
            { top: '110px', left: '50%', transform: 'translateX(-50%) scale(0.9)' },
            { top: '120px', left: '30%', transform: 'translateX(-50%) scale(0.85) rotate(5deg)' },
            { top: '125px', left: '70%', transform: 'translateX(-50%) scale(0.85) rotate(-5deg)' },
        ];
        
        // Create white flowers for the bouquet
        for (let i = 0; i < flowerPositions.length; i++) {
            const whiteFlower = document.createElement('div');
            whiteFlower.className = 'white-flower';
            whiteFlower.style.top = flowerPositions[i].top;
            whiteFlower.style.left = flowerPositions[i].left;
            whiteFlower.style.transform = flowerPositions[i].transform;
            whiteFlower.style.zIndex = 10 - i;
            
            const petals = document.createElement('div');
            petals.className = 'petals';
            
            // Create petals in a circle
            const petalCount = i % 2 === 0 ? 8 : 6;
            const angleStep = 360 / petalCount;
            
            for (let j = 0; j < petalCount; j++) {
                const petal = document.createElement('div');
                petal.className = 'petal';
                // Set animation delay and rotation
                petal.style.setProperty('--rotate', `${j * angleStep}deg`);
                petal.style.transform = `rotate(${j * angleStep}deg)`;
                petal.style.animationDelay = `${Math.random() * 2}s`;
                petals.appendChild(petal);
            }
            
            whiteFlower.appendChild(petals);
            
            // Add center
            const center = document.createElement('div');
            center.className = 'center';
            center.style.animationDelay = `${Math.random() * 2}s`;
            whiteFlower.appendChild(center);
            
            flowerCluster.appendChild(whiteFlower);
        }
        
        // Add baby's breath flowers (small white dots)
        for (let i = 0; i < 40; i++) {
            const babyBreath = document.createElement('div');
            babyBreath.className = 'baby-breath';
            babyBreath.style.top = `${20 + Math.random() * 150}px`;
            babyBreath.style.left = `${20 + Math.random() * 240}px`;
            babyBreath.style.transform = `scale(${0.5 + Math.random() * 0.8})`;
            flowerCluster.appendChild(babyBreath);
        }
        
        // Add greenery
        for (let i = 0; i < 20; i++) {
            const greenery = document.createElement('div');
            greenery.className = 'greenery';
            greenery.style.width = `${15 + Math.random() * 20}px`;
            greenery.style.height = `${10 + Math.random() * 15}px`;
            greenery.style.top = `${40 + Math.random() * 160}px`;
            greenery.style.left = `${10 + Math.random() * 260}px`;
            greenery.style.transform = `rotate(${Math.random() * 360}deg)`;
            flowerCluster.appendChild(greenery);
        }
        
        flowerContainer.appendChild(bouquet);
    }
    
    // Create floating hearts
    function createFloatingHearts() {
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.className = 'heart';
                heart.style.left = `${Math.random() * 100}%`;
                heart.style.animationDuration = `${5 + Math.random() * 10}s`;
                heart.style.animationDelay = `${Math.random() * 5}s`;
                backgroundHearts.appendChild(heart);
                
                // Remove heart after animation ends
                setTimeout(() => {
                    heart.remove();
                }, 15000);
            }, i * 300);
        }
    }
    
    // Delivery animation acceptance
    acceptDelivery.addEventListener('click', function() {
        // Hide intro animation
        introAnimation.classList.add('hidden');
        
        // Show name modal after animation completes
        setTimeout(() => {
            nameModal.classList.add('show');
            nameInput.focus();
        }, 800);
    });
    
    // Name verification and gift reveal
    submitName.addEventListener('click', function() {
        verifyNameAndShowGift();
    });
    
    // Also verify on Enter key press
    nameInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            verifyNameAndShowGift();
        }
    });
    
    function verifyNameAndShowGift() {
        const enteredName = nameInput.value.trim();
        
        if (enteredName.toLowerCase() === 'kavithi') {
            // Name matches, show the gift
            nameModal.classList.remove('show');
            
            // Show main container after animation completes
            setTimeout(() => {
                mainContainer.classList.add('show');
                
                // Add cute delivery animation with GIF
                const deliveryBox = document.createElement('div');
                deliveryBox.className = 'delivery-box animate__animated animate__bounceInDown';
                deliveryBox.style.position = 'absolute';
                deliveryBox.style.top = '-200px';
                deliveryBox.style.left = '50%';
                deliveryBox.style.transform = 'translateX(-50%)';
                deliveryBox.style.zIndex = '1000';
                
                const boxImage = document.createElement('img');
                boxImage.src = 'images/gif3.gif';
                boxImage.alt = 'Delivery box';
                boxImage.style.width = '150px';
                boxImage.style.height = 'auto';
                
                deliveryBox.appendChild(boxImage);
                mainContainer.appendChild(deliveryBox);
                
                // Make the delivery box drop and then disappear
                setTimeout(() => {
                    deliveryBox.classList.remove('animate__bounceInDown');
                    deliveryBox.classList.add('animate__zoomOut');
                    
                    setTimeout(() => {
                        deliveryBox.remove();
                    }, 1000);
                }, 2000);
            }, 500);
        } else {
            // Add shake animation to the input if name doesn't match
            nameInput.classList.add('animate__animated', 'animate__shakeX');
            
            // Remove animation classes after animation completes
            setTimeout(() => {
                nameInput.classList.remove('animate__animated', 'animate__shakeX');
            }, 1000);
            
            // Show message that name doesn't match
            const errorMsg = document.createElement('p');
            errorMsg.textContent = "Sorry, this gift is for Kavithi only! 💖";
            errorMsg.style.color = "#ff5c8a";
            errorMsg.style.marginTop = "10px";
            errorMsg.style.fontFamily = "Poppins, sans-serif";
            errorMsg.style.fontWeight = "600";
            errorMsg.classList.add('animate__animated', 'animate__fadeIn');
            
            // Remove any existing error messages
            const existingError = document.querySelector('.name-error');
            if (existingError) {
                existingError.remove();
            }
            
            errorMsg.classList.add('name-error');
            nameModal.querySelector('.name-modal-content').appendChild(errorMsg);
        }
    }
    
    // Gift box click event
    giftBox.addEventListener('click', function() {
        // Open the gift box
        this.classList.add('opened');
        
        // Show the message and flowers after box animation
        setTimeout(() => {
            messageContainer.classList.add('visible');
            
            // Create and animate flowers
            createFlowers();
            
            // Animate love message with typewriter effect
            const loveMessageHeading = loveMessage.querySelector('h1');
            const loveMessageText = loveMessage.querySelector('p');
            
            // First show the heading with a bounce effect
            loveMessageHeading.classList.add('animate__animated', 'animate__bounceIn');
            
            // Then show the text with a typewriter effect
            setTimeout(() => {
                const text = loveMessageText.textContent;
                loveMessageText.textContent = '';
                loveMessageText.style.opacity = '1';
                
                let charIndex = 0;
                const typeInterval = setInterval(() => {
                    if (charIndex < text.length) {
                        loveMessageText.textContent += text.charAt(charIndex);
                        charIndex++;
                    } else {
                        clearInterval(typeInterval);
                        // Add heart emoji at the end
                        setTimeout(() => {
                            loveMessageText.innerHTML += ' <span class="animate__animated animate__heartBeat animate__infinite">❤️</span>';
                            
                            // Add cute decoration images around the message
                            addCuteDecoration(messageContainer);
                        }, 500);
                    }
                }, 50);
            }, 1000);
            
            // Create floating hearts
            createFloatingHearts();
        }, 1000);
    });
    

    
    // Create periodic floating hearts in the background
    setInterval(() => {
        if (messageContainer.classList.contains('visible')) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.style.left = `${Math.random() * 100}%`;
            heart.style.animationDuration = `${5 + Math.random() * 10}s`;
            backgroundHearts.appendChild(heart);
            
            // Remove heart after animation ends
            setTimeout(() => {
                heart.remove();
            }, 15000);
        }
    }, 2000);
    
    // Add initial subtle hover effect to the gift box
    const subtleAnimation = () => {
        if (!giftBox.classList.contains('opened')) {
            giftBox.style.transform = `rotateX(${5 + Math.sin(Date.now() / 1000) * 2}deg) rotateY(${Math.cos(Date.now() / 1000) * 2}deg)`;
            requestAnimationFrame(subtleAnimation);
        }
    };
    
    requestAnimationFrame(subtleAnimation);
    
    // Function to add cute decorations around elements
    function addCuteDecoration(parentElement) {
        const cuteImages = [
            'images/image copy.png',
            'images/image copy 2.png',
            'images/image copy 3.png',
            'images/image copy 4.png',
            'images/image copy 5.png',
            'images/image copy 6.png',
            'images/image.png'
        ];
        
        // Add random decorations around the element
        for (let i = 0; i < 5; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'cute-decoration animate__animated';
            
            // Use random image from the provided images
            const randomImage = cuteImages[Math.floor(Math.random() * cuteImages.length)];
            decoration.style.backgroundImage = `url('${randomImage}')`;
            
            // Random size and position
            const size = 30 + Math.random() * 40;
            decoration.style.width = `${size}px`;
            decoration.style.height = `${size}px`;
            
            // Position randomly around the parent but not in the center
            decoration.style.position = 'absolute';
            
            // Calculate a position that's away from the center
            let topPos, leftPos;
            const centerAvoid = Math.floor(Math.random() * 4); // 0-3 for four quadrants
            
            if (centerAvoid === 0) { // top-left
                topPos = Math.random() * 30;
                leftPos = Math.random() * 30;
            } else if (centerAvoid === 1) { // top-right
                topPos = Math.random() * 30;
                leftPos = 70 + Math.random() * 30;
            } else if (centerAvoid === 2) { // bottom-left
                topPos = 70 + Math.random() * 30;
                leftPos = Math.random() * 30;
            } else { // bottom-right
                topPos = 70 + Math.random() * 30;
                leftPos = 70 + Math.random() * 30;
            }
            
            decoration.style.top = `${topPos}%`;
            decoration.style.left = `${leftPos}%`;
            decoration.style.transform = `translate(-50%, -50%) rotate(${Math.random() * 360}deg)`;
            decoration.style.backgroundSize = 'contain';
            decoration.style.backgroundRepeat = 'no-repeat';
            decoration.style.zIndex = '5';
            
            // Add animation
            const animations = ['bounce', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'];
            const randomAnimation = animations[Math.floor(Math.random() * animations.length)];
            decoration.classList.add(`animate__${randomAnimation}`);
            decoration.style.animationDuration = '2s';
            decoration.style.animationDelay = `${i * 0.2}s`;
            decoration.style.animationIterationCount = 'infinite';
            
            parentElement.appendChild(decoration);
        }
    }
});