// 語録の設定（200個以上）
const words = [
    "sakura", "fuji", "tokyo", "nihon", "konnichiwa", "sayonara", "arigatou", "osushi", "ramen", "matcha",
    "takoyaki", "kawaii", "samurai", "geisha", "origami", "ikura", "wasabi", "mochi", "shinkansen",
    "yuki", "hana", "matsuri", "teriyaki", "senbei", "sumo", "bento", "soba", "udon", "tsukimi",
    "kaminari", "kirakira", "hanabi", "kumo", "kaze", "yama", "mizu", "ame", "natsu", "fuyu",
    "aki", "haru", "onigiri", "nori", "tanuki", "kitsune", "neko", "inu", "torii", "hikari",
    "hime", "tengu", "shamisen", "kimono", "sakura", "wafuku", "kabuki", "noh", "taiko", "karaoke",
    "kanji", "hiragana", "katakana", "kakigori", "tempura", "yakitori", "gyoza", "karaage", "natto",
    "katsu", "miso", "tofu", "sake", "daifuku", "anko", "manju", "taiyaki", "dorayaki", "zen",
    "shinto", "buddha", "jizo", "kannon", "ryu", "oni", "yokai", "fushigi", "kaidan", "yurei",
    "tanabata", "bonodori", "shochu", "umami", "mirin", "dashi", "wasanbon", "edamame", "kamaboko",
    "konjac", "yatsuhashi", "wagashi", "sencha", "genmaicha", "gyokuro", "houjicha"
];

// グローバル変数
let currentWord = "";
let score = 0;
let level = 1;
let experience = 0;
let experienceToLevelUp = 100;
let timer = 60;
let isGameStarted = false;
let totalSummon = parseInt(localStorage.getItem("totalSummon") || 0);
let currentTotalSummon = 0;

// DOM Elements
const wordContainer = document.getElementById("word-container");
const inputBox = document.getElementById("input-box");
const scoreDisplay = document.getElementById("score");
const levelDisplay = document.getElementById("level");
const experienceBar = document.getElementById("experience-bar");
const potatoContainer = document.getElementById("potato-container");
const totalSummonDisplay = document.getElementById("total-summon");
const currentTotalSummonDisplay = document.getElementById("current-total-summon");
const timeDisplay = document.getElementById("time");
const resetButton = document.getElementById("reset-button");

// 初期表示
scoreDisplay.textContent = score;
totalSummonDisplay.textContent = totalSummon;
currentTotalSummonDisplay.textContent = currentTotalSummon;

// ランダムな単語を生成
const generateWord = () => {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordContainer.textContent = currentWord;
};

// 経験値バーを更新
const updateExperienceBar = () => {
    experienceBar.style.width = `${(experience / experienceToLevelUp) * 100}%`;
};

// レベルアップ
const levelUp = () => {
    if (experience >= experienceToLevelUp) {
        level++;
        experience = 0;
        experienceToLevelUp *= 1.5;
        levelDisplay.textContent = level;
    }
};

// ポテトチップスを召喚
const summonPotatoChips = (count) => {
    for (let i = 0; i < count; i++) {
        const potatoChip = document.createElement("div");
        potatoChip.classList.add("potato-chip");
        potatoChip.textContent = "🥔";

        const randomX = Math.random() * 80 + 10;
        const randomY = Math.random() * 50 + 10;
        potatoChip.style.left = `${randomX}%`;
        potatoChip.style.top = `${randomY}%`;

        potatoContainer.appendChild(potatoChip);

        potatoChip.addEventListener("animationend", () => {
            potatoChip.remove();
        });
    }
    currentTotalSummon += count;
    totalSummon += count;
    currentTotalSummonDisplay.textContent = currentTotalSummon;
    totalSummonDisplay.textContent = totalSummon;
};

// タイマー開始
const startTimer = () => {
    const timerInterval = setInterval(() => {
        timer--;
        timeDisplay.textContent = timer;
        if (timer <= 0) {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
};

// ゲーム終了
const endGame = () => {
    inputBox.disabled = true;
    wordContainer.textContent = "終了!";
    localStorage.setItem("totalSummon", totalSummon);
    alert(`ゲーム終了! スコア: ${score}`);
};

// 入力チェック
inputBox.addEventListener("input", () => {
    const inputValue = inputBox.value.toLowerCase();
    if (inputValue === currentWord) {
        score++;
        experience += 1 * level;
        scoreDisplay.textContent = score;
        updateExperienceBar();
        if (experience >= experienceToLevelUp) levelUp();
        summonPotatoChips(level);
        inputBox.value = "";
        generateWord();
    }
});

// スペースキーでスタート
document.addEventListener("keydown", (e) => {
    if (e.code === "Space" && !isGameStarted) {
        isGameStarted = true;
        wordContainer.textContent = "開始!";
        inputBox.disabled = false;
        inputBox.focus();
        generateWord();
        startTimer();
    }
});

// 初期化
updateExperienceBar();
