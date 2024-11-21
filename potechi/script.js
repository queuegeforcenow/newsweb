document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const gameArea = document.getElementById("game-area");
  const currentWordDisplay = document.getElementById("current-word");
  const japaneseDisplay = document.getElementById("japanese-display");
  const scoreDisplay = document.getElementById("score-display");
  const levelDisplay = document.getElementById("level-display");
  const timerDisplay = document.getElementById("timer-display");
  const experienceProgress = document.getElementById("experience-progress");

  // 初期設定
  const words = [
    { japanese: "犬", romaji: "inu" },
    { japanese: "猫", romaji: "neko" },
    { japanese: "車", romaji: "kuruma" },
    { japanese: "ゲームが好きです。", romaji: "ge-mugasukidesu" },
    { japanese: "ポテトチップス", romaji: "potetochippusu" },
    { japanese: "テレビ", romaji: "terebi" },
    { japanese: "パソコン", romaji: "pasokon" },
    { japanese: "音楽", romaji: "ongaku" },
    { japanese: "映画", romaji: "eiga" },
    { japanese: "本を読む", romaji: "honwoyomu" },
    { japanese: "インターネット", romaji: "innta-netto" },
    { japanese: "ゲーム", romaji: "ge-mu" },
    { japanese: "こんにちは", romaji: "konnichiwa" },
    { japanese: "ありがとう", romaji: "arigatou" },
    { japanese: "さようなら", romaji: "sayounara" },
    { japanese: "日本語", romaji: "nihongo" },
    { japanese: "学校", romaji: "gakkou" },
    { japanese: "先生", romaji: "sensei" },
    { japanese: "友達", romaji: "tomodachi" },
    { japanese: "スポーツ", romaji: "supootsu" },
    { japanese: "野球", romaji: "yakyuu" },
    { japanese: "サッカー", romaji: "sakkaa" },
    { japanese: "映画館", romaji: "eigakan" },
    { japanese: "図書館", romaji: "toshokan" },
    { japanese: "郵便局", romaji: "yuubinkyoku" },
    { japanese: "レストラン", romaji: "resutoran" },
    { japanese: "カフェ", romaji: "kafe" },
    { japanese: "空港", romaji: "kuukou" },
    { japanese: "車", romaji: "kuruma" },
    { japanese: "自転車", romaji: "jitensha" },
    { japanese: "電車", romaji: "densha" },
    { japanese: "旅行", romaji: "ryokou" },
    { japanese: "料理", romaji: "ryouri" },
    { japanese: "お寿司", romaji: "osushi" },
    { japanese: "ラーメン", romaji: "raamen" },
    { japanese: "カレー", romaji: "karee" },
    { japanese: "ピザ", romaji: "piza" },
    { japanese: "チョコレート", romaji: "chokoreeto" },
    { japanese: "果物", romaji: "kudamono" },
    { japanese: "野菜", romaji: "yasai" },
    { japanese: "肉", romaji: "niku" },
    { japanese: "魚", romaji: "sakana" },
    { japanese: "水", romaji: "mizu" },
    { japanese: "お茶", romaji: "ocha" },
    { japanese: "ジュース", romaji: "juusu" },
    { japanese: "アイスクリーム", romaji: "aisukuriimu" },
    { japanese: "コーヒー", romaji: "koohii" },
    { japanese: "ビール", romaji: "biiru" },
    { japanese: "ワイン", romaji: "wain" },
    { japanese: "夜", romaji: "yoru" },
    { japanese: "昼", romaji: "hiru" },
    { japanese: "朝", romaji: "asa" },
    { japanese: "日曜日", romaji: "nichiyoubi" },
    { japanese: "月曜日", romaji: "getsuyoubi" },
    { japanese: "火曜日", romaji: "kayoubi" },
    { japanese: "水曜日", romaji: "suiyoubi" },
    { japanese: "木曜日", romaji: "mokuyoubi" },
    { japanese: "金曜日", romaji: "kinyoubi" },
    { japanese: "土曜日", romaji: "doyoubi" },
    { japanese: "春", romaji: "haru" },
    { japanese: "夏", romaji: "natsu" },
    { japanese: "秋", romaji: "aki" },
    { japanese: "冬", romaji: "fuyu" },
    { japanese: "海", romaji: "umi" },
    { japanese: "山", romaji: "yama" },
    { japanese: "川", romaji: "kawa" },
    { japanese: "空", romaji: "sora" },
    { japanese: "星", romaji: "hoshi" },
    { japanese: "花", romaji: "hana" },
    { japanese: "鳥", romaji: "tori" },
    { japanese: "犬", romaji: "inu" },
    { japanese: "猫", romaji: "neko" },
  ];

  let score = 0;
  let summonCount = 0;
  let currentLevel = 1;
  let timer = 60;
  let currentWord = "";
  let currentJapanese = "";
  let timerInterval = null;
  let progress = 0;

  // 特殊ローマ字変換
  const romajiMap = {
    nn: "ん",
    xu: "ぅ",
    ltu: "っ",
    si: "し",
    shi: "し",
    ti: "ち",
    chi: "ち",
    zyu: "じゅ",
    fu: "ふ",
    hu: "ふ",
    tu: "つ",
    tsu: "つ",
    ji: "じ",
    chu: "ちゅ",
    zi: "じ",
    // その他必要に応じて追加
  };

  // ゲーム開始
  function startGame() {
    resetGame();
    gameArea.style.display = "block";
    generateWord();
    startTimer();
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

  // 単語生成
  function generateWord() {
    const wordData = words[Math.floor(Math.random() * words.length)];
    currentWord = wordData.romaji;
    currentJapanese = wordData.japanese;
    updateDisplay();
  }

  // タイマー開始
  function startTimer() {
    timerInterval = setInterval(() => {
      timer--;
      if (timer <= 0) {
        endGame();
      }
      updateDisplay();
    }, 1000);
  }

  // 画面表示更新
  function updateDisplay() {
    currentWordDisplay.textContent = currentWord;
    japaneseDisplay.textContent = currentJapanese;
    scoreDisplay.textContent = `スコア: ${score}`;
    levelDisplay.textContent = `レベル: ${currentLevel}`;
    timerDisplay.textContent = `残り時間: ${timer}s`;
    experienceProgress.style.width = `${(progress / 1) * 100}%`; // ゲージの進捗を表示
  }

  // ローマ字入力処理
  function handleInput(e) {
    let inputChar = e.key.toLowerCase();

    // 特殊ローマ字の処理
    if (currentWord.startsWith('nn') && inputChar === 'n') {
      currentWord = currentWord.slice(2); // nn を削除
      inputChar = "ん"; // んに変換
    } else if (currentWord.startsWith('xu') && inputChar === 'x') {
      currentWord = currentWord.slice(2); // xu を削除
      inputChar = "ぅ"; // ぅに変換
    } else if (currentWord.startsWith('ltu') && inputChar === 'l') {
      currentWord = currentWord.slice(3); // ltu を削除
      inputChar = "っ"; // っに変換
    }

    // 一致した場合
    if (inputChar === currentWord.charAt(0)) {
      progress += 0.05;
      score++;
      currentWord = currentWord.slice(1);
      if (currentWord.length === 0) {
        summonCount++;
        if (summonCount % 10 === 0) {
          currentLevel++;
        }
        generateWord();
      }
    } else {
      progress = 0; // ミスでゲージリセット
    }
    updateDisplay();
  }

  // ゲーム終了処理
  function endGame() {
    clearInterval(timerInterval);
    alert(`ゲーム終了！\nスコア: ${score}\n召喚数: ${summonCount}`);
    resetGame();
  }

  // スタートボタン押下
  startButton.addEventListener("click", startGame);
  document.addEventListener("keydown", handleInput);
});
