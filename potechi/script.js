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
let wordList = []; // ローマ字の単語リスト

// JSONファイルから単語リストを読み込む
fetch('tango.json')
  .then(response => response.json())
  .then(data => {
    wordList = data;
    console.log("単語リストが読み込まれました", wordList);
  })
  .catch(error => console.error('単語リストの読み込みに失敗しました:', error));

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
    potato.style.left = `${Math.random() * 90}%`;

    // アニメーションのためにトリガーをリセット
    potato.offsetHeight; // Reflow trigger

    // 画面外に消える
    setTimeout(() => {
      potato.remove();
    }, 1000);
  }
}

// レベルアップ処理
function levelUp() {
  highestLevel++;
  levelMultiplier = highestLevel; // レベルに応じたポテトチップスの数増加
  expBar.value = 0;
  document.getElementById('level').textContent = `レベル: ${highestLevel}`;
  spawnPotato();
}

// ゲーム終了
function endGame() {
  saveGameProgress();
  resultDiv.textContent = `ゲーム終了！ 最終ポテトチップス数: ${chips}`;
  startBtn.disabled = false; // ゲーム開始ボタンを再度有効化
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
