// ゲーム要素の取得
const startBtn = document.getElementById('start-btn');
const expBar = document.getElementById('exp-bar');
const potatoContainer = document.getElementById('potato-container');
const resultDiv = document.getElementById('result');
const infoModal = document.getElementById('info-modal');
const settingsModal = document.getElementById('settings-modal');
const closeInfoBtn = document.getElementById('close-info-btn');
const closeSettingsBtn = document.getElementById('close-settings-btn');

// ゲーム変数
let gameInterval;
let gameDuration = 60; // ゲームの持続時間（秒）
let exp = 0; // 経験値
let levelMultiplier = 1; // レベルに応じたポテトチップス召喚数
let chips = 0; // 召喚したポテトチップスの数
let highestLevel = 1; // 最高レベル
let highestChips = 0; // 最高ポテトチップス召喚数
let totalChips = 0; // 累積ポテトチップス

// ゲーム開始処理
function startGame() {
  exp = 0;
  levelMultiplier = 1;
  chips = 0;
  gameDuration = 60;
  totalChips = 0;
  highestChips = 0;

  // ゲーム状態の初期化
  startBtn.disabled = true;  // ゲーム開始ボタンを無効化

  // ゲームタイマーの開始
  gameInterval = setInterval(gameTick, 1000);
}

// ゲームの1秒ごとの処理
function gameTick() {
  gameDuration--;
  if (gameDuration <= 0) {
    clearInterval(gameInterval);  // ゲーム終了
    endGame();
  }
}

// 経験値の追加
function addExp() {
  exp += levelMultiplier * 10; // レベルに応じて増える
  expBar.value = exp;
  if (exp >= 100) {
    exp = 0;
    levelUp();
  }
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

    chips++;
    totalChips++;
    highestChips = Math.max(highestChips, chips);
  }
}

// レベルアップ処理
function levelUp() {
  highestLevel = Math.max(highestLevel, exp / 100 + 1);
  levelMultiplier = Math.floor(highestLevel); // レベルに応じてポテトチップス増加量を設定
}

// ゲーム終了
function endGame() {
  resultDiv.textContent = `ゲーム終了! ポテトチップスの数: ${chips}（最高レベル: ${highestLevel}）`;
  saveGameProgress(); // ゲームの進行状況を保存
  startBtn.disabled = false;  // ゲーム開始ボタンを有効化
}

// ゲーム進行状況の保存（Cookie）
function saveGameProgress() {
  document.cookie = `totalChips=${totalChips}; path=/; max-age=31536000`;
  document.cookie = `highestLevel=${highestLevel}; path=/; max-age=31536000`;
  document.cookie = `highestChips=${highestChips}; path=/; max-age=31536000`;
}

// ゲーム進行状況の読み込み（Cookie）
function loadGameProgress() {
  const cookies = document.cookie.split('; ');
  cookies.forEach(cookie => {
    const [key, value] = cookie.split('=');
    if (key === 'totalChips') totalChips = parseInt(value);
    if (key === 'highestLevel') highestLevel = parseInt(value);
    if (key === 'highestChips') highestChips = parseInt(value);
  });
}

// キー入力の処理
document.addEventListener('keydown', (event) => {
  const input = event.key.toLowerCase();
  
  // キーが正しく一致する場合
  if (input === currentWord.toLowerCase()) {
    addExp(); // 経験値追加
    spawnPotato(); // ポテトチップス召喚
  } else {
    resetExp(); // 誤った入力で経験値リセット
  }
});

// 経験値をリセット
function resetExp() {
  exp = 0;
  expBar.value = 0;
}

// 情報モーダルを開く
document.getElementById('info-btn').addEventListener('click', () => {
  infoModal.style.display = 'flex';
});

// 設定モーダルを開く
document.getElementById('settings-btn').addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

// モーダルの閉じるボタン
closeInfoBtn.addEventListener('click', () => {
  infoModal.style.display = 'none';
});
closeSettingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// ゲーム開始ボタンがクリックされたときにstartGame()を呼び出す
startBtn.addEventListener('click', startGame);

// ゲーム開始時に進行状況を読み込み
window.onload = loadGameProgress;
