let words = []; // 単語データを格納
let currentWordIndex = 0;
let currentWord = '';
let exp = 0;
let chips = 0;
let highestLevel = 1;
let highestChips = 0;
let totalChips = 0; // 全体のポテトチップス数
let levelUpThreshold = 100; // レベルアップの閾値
let levelMultiplier = 1; // レベルに応じたポテトチップスの増加量

let gameInterval;
let gameDuration = 60; // ゲームの時間（秒）

const expBar = document.getElementById('exp-bar');
const chipsCount = document.getElementById('chips-count');
const resultDiv = document.getElementById('result');
const potatoContainer = document.getElementById('potato-container');

// 情報ボタンとモーダル
const infoBtn = document.getElementById('info-btn');
const infoModal = document.getElementById('info-modal');
const closeInfoBtn = document.getElementById('close-info-btn');
const totalChipsDisplay = document.getElementById('total-chips');
const highestLevelDisplay = document.getElementById('highest-level');
const highestChipsDisplay = document.getElementById('highest-chips');

// 設定ボタンとモーダル
const settingsBtn = document.getElementById('settings-btn');
const settingsModal = document.getElementById('settings-modal');
const closeSettingsBtn = document.getElementById('close-settings-btn');
const chipsSizeSelect = document.getElementById('chips-size');
const volumeInput = document.getElementById('volume');

// JSONファイルから単語データを読み込む
fetch('tango.json')
  .then(response => response.json())
  .then(data => {
    words = data;
  })
  .catch(error => {
    console.error('Error loading JSON data:', error);
  });

// ゲーム開始
document.getElementById('start-btn').addEventListener('click', startGame);

// ゲーム開始の処理
function startGame() {
  currentWordIndex = Math.floor(Math.random() * words.length);
  const word = words[currentWordIndex];
  currentWord = word.romaji[0]; // 最初のローマ字を選択
  updateWordDisplay(word.jp, word.romaji);

  exp = 0; // 経験値リセット
  expBar.value = 0;
  chips = 0; // チップス数リセット
  chipsCount.textContent = chips;
  
  // ゲームタイマーの開始
  gameInterval = setInterval(gameTick, 1000);
}

// ゲームの1秒ごとの処理
function gameTick() {
  gameDuration--;
  if (gameDuration <= 0) {
    clearInterval(gameInterval);
    endGame();
  }
}

// 経験値追加
function addExp() {
  exp += levelMultiplier * 10; // レベルに応じて増える
  expBar.value = exp;
  if (exp >= 100) {
    exp = 0;
    levelUp();
  }
}

// 経験値リセット
function resetExp() {
  exp = 0;
  expBar.value = exp;
}

// ポテトチップス召喚
function spawnPotato() {
  for (let i = 0; i < levelMultiplier; i++) {
    const potato = document.createElement('div');
    potato.classList.add('potato');
    potatoContainer.appendChild(potato);
    potatoContainer.style.display = 'block';

    potato.addEventListener('animationend', () => {
      potatoContainer.removeChild(potato);
    });
  }
}

// レベルアップ
function levelUp() {
  highestLevel = Math.max(highestLevel, exp / 100 + 1);
  levelMultiplier = Math.floor(highestLevel); // レベルに応じてポテトチップス増加量を設定
  if (chips > highestChips) {
    highestChips = chips;
  }
  totalChips += chips;

  document.cookie = `highestLevel=${highestLevel}`;
  document.cookie = `highestChips=${highestChips}`;
  document.cookie = `totalChips=${totalChips}`;
  highestLevelDisplay.textContent = highestLevel;
  highestChipsDisplay.textContent = highestChips;
  totalChipsDisplay.textContent = totalChips;
}

// ゲーム終了
function endGame() {
  resultDiv.textContent = `ゲーム終了! ポテトチップスの数: ${chips}`;
  document.getElementById('start-btn').disabled = false;
}

// 情報モーダルを開く
infoBtn.addEventListener('click', () => {
  infoModal.style.display = 'flex';
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (key === 'highestLevel') highestLevelDisplay.textContent = value;
    if (key === 'highestChips') highestChipsDisplay.textContent = value;
    if (key === 'totalChips') totalChipsDisplay.textContent = value;
  });
});

// 情報モーダルを閉じる
closeInfoBtn.addEventListener('click', () => {
  infoModal.style.display = 'none';
});

// 設定モーダルを開く
settingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

// 設定モーダルを閉じる
closeSettingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// キー入力の処理
document.addEventListener('keydown', (event) => {
  const input = event.key.toLowerCase();

  // ローマ字が一致するか確認
  if (input === currentWord.toLowerCase()) {
    addExp();
    spawnPotato();
  } else {
    resetExp();
  }
});
