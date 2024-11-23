let words = []; // 単語データを格納
let currentWordIndex = 0;
let currentWord = '';
let exp = 0;
let chips = 0;
let highestLevel = 1;
let highestChips = 0;
let totalChips = 0; // 全体のポテトチップス数

let gameInterval;
let gameDuration = 60; // ゲームの時間（秒）

const inputField = document.getElementById('input-field');
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

  resultDiv.textContent = ''; // 結果をリセット
  inputField.value = ''; // 入力フィールドをリセット
  inputField.focus(); // 入力フィールドにフォーカスを当てる

  // ゲームのタイマー開始
  let timeRemaining = gameDuration;
  const timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining <= 0) {
      clearInterval(timer);
      endGame();
    }
  }, 1000);
}

// 単語の表示を更新
function updateWordDisplay(japanese, romaji) {
  document.querySelector('.current-word-jp').textContent = `日本語: ${japanese}`;
  document.querySelector('.current-word-romaji').textContent = `ローマ字: ${romaji}`;
}

// 入力のチェック
inputField.addEventListener('input', function() {
  const userInput = inputField.value.toLowerCase().trim();

  if (words[currentWordIndex].romaji.includes(userInput)) {
    exp += 10;
    if (exp >= 100) {
      levelUp(); // レベルアップ
    }
    expBar.value = exp;
    chips++; // チップスの数を増加
    chipsCount.textContent = chips;

    // ポテトチップスのアニメーション
    showPotatoAnimation();

    // 新しい単語を生成
    currentWordIndex = Math.floor(Math.random() * words.length);
    const word = words[currentWordIndex];
    currentWord = word.romaji[0];
    updateWordDisplay(word.jp, word.romaji);
    inputField.value = ''; // 入力フィールドをリセット
  }
});

// ポテトチップスのアニメーション
function showPotatoAnimation() {
  const potato = document.createElement('div');
  potato.classList.add('potato');
  potatoContainer.appendChild(potato);

  // アニメーション完了後にポテトを削除
  potato.addEventListener('animationend', () => {
    potatoContainer.removeChild(potato);
  });
}

// レベルアップ処理
function levelUp() {
  highestLevel = Math.max(highestLevel, exp / 100 + 1);
  if (chips > highestChips) {
    highestChips = chips;
  }
  totalChips += chips;

  // Cookieにデータを保存
  document.cookie = `highestLevel=${highestLevel}`;
  document.cookie = `highestChips=${highestChips}`;
  document.cookie = `totalChips=${totalChips}`;

  // 高いレベルの表示
  highestLevelDisplay.textContent = highestLevel;
  highestChipsDisplay.textContent = highestChips;
  totalChipsDisplay.textContent = totalChips;
}

// ゲーム終了
function endGame() {
  resultDiv.textContent = `ゲーム終了! ポテトチップスの数: ${chips}`;
  inputField.disabled = true;
  document.getElementById('start-btn').disabled = false; // ゲーム開始ボタンを再び有効化
}

// 情報ボタンのクリック処理
infoBtn.addEventListener('click', () => {
  infoModal.style.display = 'flex';
  // Cookieから情報を読み込む
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [key, value] = cookie.trim().split('=');
    if (key === 'highestLevel') highestLevelDisplay.textContent = value;
    if (key === 'highestChips') highestChipsDisplay.textContent = value;
    if (key === 'totalChips') totalChipsDisplay.textContent = value;
  });
});

// モーダルの閉じるボタン
closeInfoBtn.addEventListener('click', () => {
  infoModal.style.display = 'none';
});
