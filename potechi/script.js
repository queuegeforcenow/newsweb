const words = ["apple", "banana", "cherry", "date", "elderberry", "fig", "grape"];
let currentWord = "";
let score = 0;
let level = 1;
let experience = 0;
let experienceToLevelUp = 100;
let isBonusMode = false;
let timer = 30;
let timerInterval;
let highScore = 0;

// DOM Elements
const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const experienceBar = document.getElementById("experience-bar");
const potatoContainer = document.getElementById("potato-container");
const resetButton = document.getElementById("reset-button");
const timerDisplay = document.getElementById("timer");
const timeDisplay = document.getElementById("time");

// Load high score from cookies
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    return parts.length === 2 ? parts.pop().split(";").shift() : 0;
};

highScore = parseInt(getCookie("highScore")) || 0;
document.getElementById("high-score").textContent = highScore;

// Generate a random word
const generateWord = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordContainer.textContent = currentWord;
};

// Update experience bar
const updateExperienceBar = () => {
    experienceBar.style.width = `${(experience / experienceToLevelUp) * 100}%`;
};

// Level up
const levelUp = () => {
    if (experience >= experienceToLevelUp) {
        level++;
        experience = 0;
        experienceToLevelUp *= 1.5;
        levelDisplay.textContent = level;
    }
};

// Create potato chips with animation
const summonPotatoChips = (count) => {
    for (let i = 0; i < count; i++) {
        const potatoChip = document.createElement("div");
        potatoChip.classList.add("potato-chip");
        potatoChip.textContent = "🥔";

        // ランダムな位置にポテトチップスを配置
        const randomX = Math.random() * 80 + 10; // 画面幅の10%〜90%の間
        const randomY = Math.random() * 50 + 10; // 画面高さの10%〜60%の間
        potatoChip.style.left = `${randomX}%`;
        potatoChip.style.top = `${randomY}%`;

        // ポテトチップスをゲームコンテナ内に追加
        potatoContainer.appendChild(potatoChip);

        // アニメーション終了後に削除
        potatoChip.addEventListener("animationend", () => {
            potatoChip.remove();
        });
    }
};

// Start timer
const startTimer = () => {
    timerInterval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
};

// End game
const endGame = () => {
    inputBox.disabled = true;
    wordContainer.textContent = "終了!";
    if (score > highScore) {
        highScore = score;
        document.cookie = `highScore=${highScore}; path=/; max-age=31536000`; // 1年保持
    }
    alert(`ゲーム終了! あなたのスコア: ${score}`);
};

// Check input
inputBox.addEventListener("input", () => {
    if (inputBox.value === currentWord) {
        score++;
        experience += 10 * (isBonusMode ? 2 : 1); // ボーナスモードで経験値倍増
        scoreDisplay.textContent = score;
        updateExperienceBar();

        if (experience >= experienceToLevelUp) {
            levelUp();
        }

        summonPotatoChips(level); // レベルに応じてポテトチップスを召喚

        // Check for bonus mode
        if (!isBonusMode && experience >= 50) {
            isBonusMode = true;
        }

        inputBox.value = "";
        generateWord();
    } else {
        isBonusMode = false;
    }
});

// Reset game
resetButton.addEventListener("click", () => {
    score = 0;
    level = 1;
    experience = 0;
    experienceToLevelUp = 100;
    isBonusMode = false;
    timer = 30;
    scoreDisplay.textContent = score;
    levelDisplay.textContent = level;
    inputBox.value = "";
    inputBox.disabled = false;
    potatoContainer.innerHTML = "";
    generateWord();
    updateExperienceBar();
    startTimer();
});

// Initialize game
generateWord();
updateExperienceBar();
startTimer();
