document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const questionModal = document.getElementById("questionModal");
  const yesBtn = document.getElementById("yesBtn");
  const noBtn = document.getElementById("noBtn");
  const mainContainer = document.getElementById("mainContainer");
  const carePackageSection = document.getElementById("carePackageSection");
  const packageContents = document.getElementById("packageContents");
  const flowerBouquet = document.getElementById("flowerBouquet");
  const floatingHearts = document.getElementById("floatingHearts");
  const timeModal = document.getElementById("timeModal");
  const timeList = document.getElementById("timeList");
  const confirmTimeBtn = document.getElementById("confirmTimeBtn");
  let selectedTime = null;
  const placeListEl = document.getElementById("placeList");
  const placeOther = document.getElementById("placeOther");
  const splashOverlay = document.getElementById("splashOverlay");
  let selectedPlace = null;

  // Show splash overlay first (2.3s), then reveal the question modal
  if (splashOverlay) {
    // ensure question hidden while splash displays
    if (questionModal) questionModal.classList.remove("show");
    setTimeout(() => {
      splashOverlay.classList.add("hide");
      if (questionModal) questionModal.classList.add("show");
    }, 2300);
  } else {
    // fallback: show question quickly
    if (questionModal)
      setTimeout(() => questionModal.classList.add("show"), 200);
  }

  // Yes / No behavior
  function moveButtonAway(btn) {
    const container = document.querySelector(".question-container");
    if (!container) return;
    const cRect = container.getBoundingClientRect();

    const maxLeft = Math.max(10, cRect.width - btn.offsetWidth - 10);
    const maxTop = Math.max(10, cRect.height - btn.offsetHeight - 10);

    const left = Math.random() * maxLeft;
    const top = Math.random() * maxTop;

    btn.style.position = "absolute";
    btn.style.left = left + "px";
    btn.style.top = top + "px";
    btn.style.transition = "left 0.2s ease, top 0.2s ease";
  }

  // Continuous movement while hovered (desktop) or touched (mobile)
  let noMoveInterval = null;
  function startNoMoving() {
    if (noMoveInterval) return;
    moveButtonAway(noBtn);
    noMoveInterval = setInterval(() => moveButtonAway(noBtn), 300);
  }
  function stopNoMoving() {
    if (!noMoveInterval) return;
    clearInterval(noMoveInterval);
    noMoveInterval = null;
  }

  if (noBtn) {
    noBtn.addEventListener("mouseenter", () => startNoMoving());
    noBtn.addEventListener("mouseleave", () => stopNoMoving());

    // touch support: start on touchstart, stop on touchend
    noBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        startNoMoving();
      },
      { passive: false },
    );
    noBtn.addEventListener("touchend", () => stopNoMoving());
    // also support click on mobile: prevent it from being clicked
    noBtn.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        startNoMoving();
      }
    });
  }

  if (yesBtn) {
    yesBtn.addEventListener("click", () => {
      if (questionModal) questionModal.classList.remove("show");
      stopNoMoving();
      setTimeout(() => {
        mainContainer.classList.add("show");
        packageContents.classList.add("show");
        createFlowers(true);
        startFloatingHearts();
        // show love message first, then open time picker
        const titleEl = document.querySelector(".message-card h1");
        if (titleEl) {
          titleEl.textContent = "yayy iloveusomuch";
          const msg = document.querySelector(".get-well-message");
          if (msg) msg.classList.add("animate__fadeInUp");
        }
        if (timeModal) {
          // delay to let the message be seen
          setTimeout(() => {
            populateTimes();
            timeModal.classList.add("show");
            // always allow typing a place/time — show the textarea so she can type regardless of button
            if (placeOther) {
              placeOther.style.display = "block";
              placeOther.placeholder =
                "What's on your mind? Tell me a time and a place.";
            }
          }, 3000);
        }
      }, 300);
    });
  }

  // Create cute gift
  function createFlowers(showLoveMessage = false) {
    // clear any existing flowers
    if (flowerBouquet) flowerBouquet.innerHTML = "";

    // If triggered by Yes click, show only one image gif2.gif
    const giftContainer = document.createElement("div");
    giftContainer.className = "cute-gift";

    const giftImage = document.createElement("img");
    giftImage.src = showLoveMessage ? "images/gif2.gif" : "images/gif2.gif";
    giftImage.alt = "A bouquet for you";

    giftContainer.appendChild(giftImage);
    flowerBouquet.appendChild(giftContainer);

    // reveal message area (text set by caller)
    const msg = document.querySelector(".get-well-message");
    if (msg) {
      setTimeout(() => msg.classList.add("animate__fadeInUp"), 700);
    }
  }

  // Populate primary time options: only 12:30 PM and 'then u pick'
  function populateTimes() {
    if (!timeList) return;
    timeList.innerHTML = "";

    // Option 1: 12:30 PM
    const btn1 = document.createElement("button");
    btn1.className = "time-btn";
    btn1.textContent = "12:30 PM";
    btn1.dataset.time = "12:30 PM";
    btn1.addEventListener("click", () => {
      // select this time
      Array.from(timeList.children).forEach((c) =>
        c.classList.remove("selected"),
      );
      btn1.classList.add("selected");
      selectedTime = "12:30 PM";
      // hide custom textbox if visible
      if (placeOther) placeOther.style.display = "none";
    });
    timeList.appendChild(btn1);

    // Option 2: then u pick (opens the textarea for time+place)
    const btn2 = document.createElement("button");
    btn2.className = "time-btn";
    btn2.textContent = "then u pick";
    btn2.dataset.time = "then u pick";
    btn2.addEventListener("click", () => {
      // mark selected visually
      Array.from(timeList.children).forEach((c) =>
        c.classList.remove("selected"),
      );
      btn2.classList.add("selected");
      // clear selectedTime to indicate custom input will be used
      selectedTime = null;
      // show the shared textarea (used for 'Somewhere else') and prompt for time+place
      if (placeOther) {
        placeOther.style.display = "block";
        placeOther.placeholder =
          "What's on your mind? Tell me a time and a place.";
        placeOther.value = "";
        placeOther.focus();
      }
    });
    timeList.appendChild(btn2);

    // reset place selection when showing times
    selectedPlace = null;
    if (placeListEl) {
      Array.from(placeListEl.querySelectorAll(".place-btn")).forEach((b) =>
        b.classList.remove("selected"),
      );
    }
  }

  function formatTimeLabel(h, m) {
    const period = h >= 12 ? "PM" : "AM";
    let hour12 = h % 12;
    if (hour12 === 0) hour12 = 12;
    const mm = m < 10 ? "0" + m : "" + m;
    return `${hour12}:${mm} ${period}`;
  }

  if (confirmTimeBtn) {
    confirmTimeBtn.addEventListener("click", () => {
      // If user selected a standard time
      if (selectedTime) {
        // determine place text
        // prefer typed place if available, otherwise use selectedPlace
        let placeText =
          (placeOther && placeOther.value.trim()) || selectedPlace || "";
        if (!placeText) placeText = "a place of your choice";

        // hide modal and show confirmation in message
        if (timeModal) timeModal.classList.remove("show");
        const title = document.querySelector(".message-card h1");
        if (title)
          title.textContent = `See you at ${selectedTime} at ${placeText} ❤️ (oky hehe can't wait.)`;
        return;
      }

      // If user chose 'then u pick' and typed their own time+place in textarea
      if (placeOther && placeOther.value.trim()) {
        const custom = placeOther.value.trim();
        if (timeModal) timeModal.classList.remove("show");
        const title = document.querySelector(".message-card h1");
        if (title) title.textContent = `${custom} ❤️ (oky hehe can't wait)`;
        return;
      }

      // otherwise, nothing chosen yet
      return;
    });
  }

  // place buttons handling
  if (placeListEl) {
    Array.from(placeListEl.querySelectorAll(".place-btn")).forEach((btn) => {
      btn.addEventListener("click", () => {
        Array.from(placeListEl.querySelectorAll(".place-btn")).forEach((b) =>
          b.classList.remove("selected"),
        );
        btn.classList.add("selected");
        selectedPlace = btn.dataset.place;
        if (selectedPlace === "pls pick") {
          if (placeOther) {
            placeOther.style.display = "block";
            placeOther.focus();
          }
        } else {
          if (placeOther) placeOther.style.display = "none";
        }
      });
    });
  }

  // Floating hearts
  function startFloatingHearts() {
    setInterval(() => {
      createFloatingHeart();
    }, 2000);
  }

  function createFloatingHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";

    const hearts = ["💕", "💖", "💗", "🌸", "✨", "🌟", "💊"];
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

    heart.style.left = Math.random() * 100 + "%";
    heart.style.animationDuration = 8 + Math.random() * 4 + "s";
    heart.style.animationDelay = Math.random() * 2 + "s";

    floatingHearts.appendChild(heart);

    setTimeout(() => {
      heart.remove();
    }, 12000);
  }

  // Add sparkles to title
  const messageTitle = document.querySelector(".message-card h1");
  if (messageTitle) {
    setInterval(() => {
      createSparkle(messageTitle);
    }, 600);
  }

  function createSparkle(element) {
    const sparkle = document.createElement("span");
    sparkle.textContent = "✨";
    sparkle.style.position = "absolute";
    sparkle.style.fontSize = "20px";
    sparkle.style.pointerEvents = "none";

    const rect = element.getBoundingClientRect();
    sparkle.style.left = rect.left + Math.random() * rect.width + "px";
    sparkle.style.top = rect.top + Math.random() * rect.height + "px";

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
