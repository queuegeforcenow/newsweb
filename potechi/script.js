document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const settingsButton = document.getElementById("settings-button");
  const saveSettingsButton = document.getElementById("save-settings");
  const gameArea = document.getElementById("game-area");
  const currentWordDisplay = document.getElementById("current-word");
  const japaneseDisplay = document.getElementById("japanese-display");
  const scoreDisplay = document.getElementById("score-display");
  const levelDisplay = document.getElementById("level-display");
  const timerDisplay = document.getElementById("timer-display");
  const experienceProgress = document.getElementById("experience-progress");
  const potatoContainer = document.getElementById("potato-container");
  const successSound = document.getElementById("success-sound");

  const potatoSizeSelect = document.getElementById("potato-size");
  const volumeSlider = document.getElementById("volume-slider");

  let score = 0;
  let summonCount = 0;
  let currentLevel = 1;
  let timer = 60;
  let progress = 0;
  let currentWord = "";
  let currentJapanese = "";
  let timerInterval = null;

  const words = [
    { japanese: "犬", romaji: "inu" },
    { japanese: "ゲーム", romaji: "ge-mu" },
    { japanese: "ありがとう", romaji: "arigatou" },
    { japanese: "こんにちは", romaji: "konnichiwa" },
    { japanese: "本を読む", romaji: "honwoyomu" },
    { japanese: "おはようございます", romaji: "ohayougozaimasu" },
    { japanese: "こちらを見ないでください", romaji: "kotirawominaidekudasai" },
    { japanese: "お静かに", romaji: "osizukani" },
    { japanese: "こんにちは、チー牛さん", romaji: "konnnitiha,chi-gyu-san" },
    { japanese: "チー牛", romaji: "chi-gyuu" },
    { japanese: "はい？", romaji: "hai?" },
    { japanese: "そんなことして楽しい？", romaji: "sonnnakotositetanosii?" },
    { japanese: "なんだよこれ", romaji: "nanndayokore" },
    { japanese: "お前だろ", romaji: "omaedaro" },
    { japanese: "なんだよー", romaji: "nanndayo-" },
    { japanese: "(台パン)", romaji: "(daipan)" },
    { japanese: "あとなんだろう", romaji: "atonanndarou" },
    { japanese: "なんだろう...", romaji: "nanndarou..." },
    { japanese: "例えば", romaji: "tatoeba" },
    { japanese: "ふふふ", romaji: "fufufu" },
    { japanese: "炙りましょう", romaji: "aburimasyou" },
  ];

  // 特殊ローマ字対応マッピング
  const romajiAlternatives = {
    nn: ["n"],
    xtu: ["ltu", "ttu"],
    xa: ["la"],
    xu: ["lu"],
    xi: ["li"],
    xe: ["le"],
    xo: ["lo"],
  };

  // 入力判定
  function isCorrectInput(input, target) {
    if (input === target) return true;
    const alternatives = romajiAlternatives[target];
    return alternatives ? alternatives.includes(input) : false;
  }

  // 新しい単語生成
  function generateWord() {
    const wordData = words[Math.floor(Math.random() * words.length)];
    currentWord = wordData.romaji;
    currentJapanese = wordData.japanese;
    updateDisplay();
  }

  // ゲームの進行状況を更新
  function updateDisplay() {
    currentWordDisplay.textContent = currentWord;
    japaneseDisplay.textContent = currentJapanese;
    scoreDisplay.textContent = score;
    levelDisplay.textContent = currentLevel;
    timerDisplay.textContent = timer;
    experienceProgress.style.width = `${progress * 100}%`;
  }

  // 入力ハンドリング
  function handleInput(e) {
    const input = e.key.toLowerCase();
    const targetChar = currentWord[0];

    if (isCorrectInput(input, targetChar)) {
      currentWord = currentWord.slice(1);
      score++;
      progress += 0.1;
      successSound.play();

      if (progress >= 1) {
        progress = 0;
        currentLevel++;
      }

      if (currentWord.length === 0) {
        generateWord();
        summonPotato();
      }
    } else {
      progress = 0;
    }
    updateDisplay();
  }

  // ポテトチップスの召喚
  function summonPotato() {
    const potato = document.createElement("div");
    const size = potatoSizeSelect.value;
    potato.classList.add("potato", size);
    potato.style.left = `${Math.random() * 80}%`;
    potatoContainer.appendChild(potato);
    setTimeout(() => potato.remove(), 2000);
    summonCount++;
  }

  // ゲーム開始
  function startGame() {
    resetGame();
    generateWord();
    gameArea.classList.remove("hidden");
    timerInterval = setInterval(() => {
      timer--;
      if (timer <= 0) endGame();
      updateDisplay();
    }, 1000);
  }

  // ゲームリセット
  function resetGame() {
    score = 0;
    summonCount = 0;
    currentLevel = 1;
    timer = 60;
    progress = 0;
    updateDisplay();
  }

  // ゲーム終了
  function endGame() {
    clearInterval(timerInterval);
    alert(`ゲーム終了！スコア: ${score}`);
  }

  // 設定保存
  function saveSettings() {
    successSound.volume = parseFloat(volumeSlider.value);
  }

  // イベントリスナー
  startButton.addEventListener("click", startGame);
  settingsButton.addEventListener("click", () => {
    document.getElementById("settings-menu").classList.toggle("hidden");
  });
  saveSettingsButton.addEventListener("click", saveSettings);
  document.addEventListener("keydown", handleInput);
});
