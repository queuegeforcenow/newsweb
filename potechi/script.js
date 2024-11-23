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
  resultDiv.textContent = ''; // 結果をリセット
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
  startBtn.disabled = false;  // 再度ゲーム開始ボタンを有効化
}

// ゲーム進行状況を保存
function saveGameProgress() {
  localStorage.setItem('chips', totalChips);
  localStorage.setItem('highestLevel', highestLevel);
  localStorage.setItem('highestChips', highestChips);
}

// ゲーム進行状況をロード
function loadGameProgress() {
  const chips = localStorage.getItem('chips');
  const highestLevel = localStorage.getItem('highestLevel');
  const highestChips = localStorage.getItem('highestChips');
  
  document.getElementById('info-chips').textContent = chips || 0;
  document.getElementById('info-level').textContent = highestLevel || 1;
  document.getElementById('info-highest-chips').textContent = highestChips || 0;
}

// モーダル開閉
document.getElementById('info-btn').addEventListener('click', () => {
  infoModal.style.display = 'flex';
});

document.getElementById('settings-btn').addEventListener('click', () => {
  settingsModal.style.display = 'flex';
});

closeInfoBtn.addEventListener('click', () => {
  infoModal.style.display = 'none';
});

closeSettingsBtn.addEventListener('click', () => {
  settingsModal.style.display = 'none';
});

// ゲーム開始ボタンがクリックされたときにstartGame()を呼び出す
startBtn.addEventListener('click', startGame);
