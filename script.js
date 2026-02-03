document.addEventListener("DOMContentLoaded", () => {
  const GIFS = {
    home: "https://media1.tenor.com/m/IqnejKjGyswAAAAC/%E3%83%89%E3%82%AD%E3%83%89%E3%82%AD-%E6%81%8B%E3%81%99%E3%82%8B.gif",
    yes: "https://media1.tenor.com/m/hhSOho4bj6oAAAAC/cub-animated.gif",

    sadLevels: [
      ["https://media.tenor.com/KkDb5-sgVZkAAAAi/sad-anxious.gif"],
      ["https://media.tenor.com/9aX15qAKeQUAAAAi/cute.gif"],
      ["https://media.tenor.com/FkhHW_OewrcAAAAm/bubu-thinking-new-bubu-sad.webp"],
      ["https://media.tenor.com/J1RlH1ppxRgAAAAm/sad-sappy.webp"],
      ["https://media.tenor.com/xUWuCwMMhMMAAAAm/madebychie-mocha-and-milk.webp"],
      ["https://media.tenor.com/TYSqB4d-uvoAAAAm/cute-crying.webp"],
      ["https://media.tenor.com/pBkoepSjv44AAAAm/bubu-bubu-dudu.webp"],
      ["https://media.tenor.com/925LDfyVUGEAAAAm/cute-sad.webp"],
      ["https://media.tenor.com/Qu6GUg0Yx90AAAAm/mocha-cry.webp"],
      ["https://media.tenor.com/u__2XgR6L3gAAAAm/sad-bunny.webp"]
    ]
  };

  const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really mad...",
    "I will be very very mad...",
    "I will be very very very mad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
  ];

  let messageIndex = 0;
  let noClickCount = 0;

  // Save home state
  const homeState = {
    text: "DO YOU LOVE ME?",
    gif: "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
  };

  function handleNoClick() {
    const noButton = document.querySelector(".no-button");
    const yesButton = document.querySelector(".yes-button");
    const gif = document.getElementById("main-gif");

    // Change No button text
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;

    // Grow Yes button
    const currentSize = parseFloat(getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.3}px`;

    // Flatten GIF list
    const allSadGifs = GIFS.sadLevels.flat();

    // Pick GIF sequentially
    const index = Math.min(noClickCount, allSadGifs.length - 1);
    const nextGif = allSadGifs[index];

    // Change GIF
    gif.src = nextGif + "?t=" + Date.now();

    noClickCount++;
  }

  function handleYesClick() {
    const container = document.getElementById("main-content");
    const question = document.getElementById("question");
    const gif = document.getElementById("main-gif");
    const buttons = document.getElementById("buttons");
    const backBtn = document.getElementById("back-btn");

    container.classList.add("fade-out");

    setTimeout(() => {
      question.textContent = "Knew you would say yes! ❤️";
      gif.src = GIFS.yes;

      buttons.classList.add("hidden");
      backBtn.classList.remove("hidden");

      container.classList.remove("fade-out");
      container.classList.add("fade-in");
    }, 500);
  }

  function goBackHome() {
    const container = document.getElementById("main-content");
    const question = document.getElementById("question");
    const gif = document.getElementById("main-gif");
    const buttons = document.getElementById("buttons");
    const backBtn = document.getElementById("back-btn");

    container.classList.add("fade-out");

    setTimeout(() => {
      question.textContent = homeState.text;
      gif.src = GIFS.home;

      buttons.classList.remove("hidden");
      backBtn.classList.add("hidden");

      container.classList.remove("fade-out");
      container.classList.add("fade-in");
    }, 500);
  }

  // Floating hearts
  const loveBg = document.getElementById("love-background");

  function createHeart() {
    const heart = document.createElement("div");
    heart.className = "floating-heart";

    const size = 18 + Math.random() * 20;
    const duration = 20 + Math.random() * 25;
    const scale = 0.6 + Math.random();

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.animationDuration = duration + "s";
    heart.style.setProperty("--scale", scale);

    const filled = Math.random() > 0.5;

    heart.innerHTML = `
      <svg viewBox="0 0 24 24" width="${size}" height="${size}">
        <path
          d="M12 21s-6.7-4.4-9.5-7.2C-0.5 10.8 1 6 4.8 5.2
             7 4.7 9 6.2 12 9
             15 6.2 17 4.7 19.2 5.2
             23 6 24.5 10.8 21.5 13.8
             18.7 16.6 12 21 12 21z"
          fill="${filled ? 'rgba(255,90,130,0.45)' : 'none'}"
          stroke="rgba(255,90,130,0.8)"
          stroke-width="1.5"
        />
      </svg>
    `;

    loveBg.appendChild(heart);

    setTimeout(() => heart.remove(), 50000);
  }

  setInterval(createHeart, 600);

  // Expose functions to global scope
  window.handleNoClick = handleNoClick;
  window.handleYesClick = handleYesClick;
  window.goBackHome = goBackHome;
});
