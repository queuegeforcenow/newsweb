document.addEventListener("DOMContentLoaded", () => {
  const titleScreen = document.getElementById("title-screen");
  const gameScreen = document.getElementById("game-screen");
  const resultScreen = document.getElementById("result-screen");
  const expProgress = document.getElementById("exp-progress");
  const chipsArea = document.getElementById("chips-area");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score-display");
  const currentJapaneseDisplay = document.getElementById("current-japanese");
  const currentRomajiDisplay = document.getElementById("current-romaji");

  const phrases = [
    { japanese: "こんにちは", romaji: "konnichiwa" },
    { japanese: "おはよう", romaji: "ohayou" },
    { japanese: "ありがとう", romaji: "arigatou" },
    { japanese: "さようなら", romaji: "sayounara" },
    { japanese: "ポテトチップス", romaji: "potetochippusu" },
    { japanese: "ゲームをスタート", romaji: "geemu o sutaato" },
    { japanese: "タイピング", romaji: "taipingu" },
    { japanese: "レベルアップ", romaji: "reberu appu" },
    { japanese: "がんばって", romaji: "ganbatte" },
    { japanese: "すばらしい", romaji: "subarashii" },
    { japanese: "もういちど", romaji: "mou ichido" },
    { japanese: "はじめましょう", romaji: "hajimemashou" },
    { japanese: "ありがとうごうざいます", romaji: "arigatou gozaimasu" },
    { japanese: "お疲れ様です", romaji: "otsukaresama desu" },
    { japanese: "お元気ですか", romaji: "ogenki desu ka" },
    { japanese: "楽しいですね", romaji: "tanoshii desu ne" },
    { japanese: "すごいですね", romaji: "sugoi desu ne" },
    { japanese: "こちらこそ", romaji: "kochira koso" },
    { japanese: "それでは", romaji: "sore dewa" },
    { japanese: "よろしくお願いします", romaji: "yoroshiku onegaishimasu" },
    { japanese: "すみません", romaji: "sumimasen" },
    { japanese: "いいえ", romaji: "iie" },
    { japanese: "本当に?", romaji: "hontou ni?" },
    { japanese: "何時ですか?", romaji: "nan-ji desu ka?" },
    { japanese: "わかりました", romaji: "wakarimashita" },
    { japanese: "わかりません", romaji: "wakarimasen" },
    { japanese: "こんにちは、元気ですか？", romaji: "Konnichiwa, genki desu ka?" },
    { japanese: "今日はいい天気ですね", romaji: "Kyou wa ii tenki desu ne" },
    { japanese: "毎日勉強します", romaji: "Mainichi benkyou shimasu" },
    { japanese: "昨日は雨でした", romaji: "Kinou wa ame deshita" },
    { japanese: "今日は何をしますか?", romaji: "Kyou wa nani o shimasu ka?" },
    { japanese: "どこに行きたいですか?", romaji: "Doko ni ikitai desu ka?" },
    { japanese: "東京はとても大きいです", romaji: "Tokyo wa totemo ookii desu" },
    { japanese: "明日は休みです", romaji: "Ashita wa yasumi desu" },
    { japanese: "これは私の本です", romaji: "Kore wa watashi no hon desu" },
    { japanese: "あそこに行こう", romaji: "Asoko ni ikou" },
    { japanese: "これは私の犬です", romaji: "Kore wa watashi no inu desu" },
    { japanese: "映画を見ましたか?", romaji: "Eiga o mimashita ka?" },
    { japanese: "私は音楽が好きです", romaji: "Watashi wa ongaku ga suki desu" },
    { japanese: "何か質問がありますか?", romaji: "Nanika shitsumon ga arimasu ka?" },
    { japanese: "いっしょに遊びましょう", romaji: "Issho ni asobimashou" },
    { japanese: "料理を作るのが好きです", romaji: "Ryouri o tsukuru no ga suki desu" },
    { japanese: "どこでご飯を食べますか?", romaji: "Doko de gohan o tabemasu ka?" },
    { japanese: "天気が良いですね", romaji: "Tenki ga ii desu ne" },
    { japanese: "ここの景色は素晴らしいです", romaji: "Koko no keshiki wa subarashii desu" },
    { japanese: "毎週映画を見ます", romaji: "Maishuu eiga o mimasu" },
    { japanese: "たくさんの人がいます", romaji: "Takusan no hito ga imasu" },
    { japanese: "日本は素晴らしい国です", romaji: "Nihon wa subarashii kuni desu" },
    { japanese: "また会いましょう", romaji: "Mata aimashou" },
    { japanese: "サッカーをしています", romaji: "Sakkaa o shiteimasu" },
    { japanese: "今日は何をしましたか?", romaji: "Kyou wa nani o shimashita ka?" },
    { japanese: "よい一日を", romaji: "Yoi ichinichi o" },
    { japanese: "本当にありがとうございました", romaji: "Hontou ni arigatou gozaimashita" },
    { japanese: "すごく楽しいですね", romaji: "Sugoku tanoshii desu ne" },
    { japanese: "それでは、またね", romaji: "Sore dewa, mata ne" },
    { japanese: "おやすみなさい", romaji: "Oyasumi nasai" },
    { japanese: "お疲れ様です", romaji: "Otsukaresama desu" },
    { japanese: "よろしくお願いします", romaji: "Yoroshiku onegaishimasu" },
    { japanese: "どこかに行こう", romaji: "Dokoka ni ikou" },
    { japanese: "今日はとても楽しかったです", romaji: "Kyou wa totemo tanoshikatta desu" }
  ];

  let exp = 0;
  let level = 1;
  let chipCount = 0;
  let currentPhrase = getRandomPhrase();
  let isBonusMode = false;
  let timer = 60;
  let gameInterval;
  let timerInterval;

  // **イベントリスナーの設定**
  document.addEventListener("keydown", (e) => {
    if (e.key === " " && titleScreen.style.display !== "none") {
      e.preventDefault(); // スクロール防止
      startGame();
    } else if (e.key === " " && resultScreen.style.display !== "none") {
      e.preventDefault(); // スクロール防止
      retryGame();
    } else if (gameScreen.style.display !== "none") {
      handleTyping(e.key);
    }
  });

  // **ゲーム開始**
  function startGame() {
    titleScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    resetGame();
    displayPhrase(currentPhrase);
    startTimer();
    gameInterval = setInterval(updateGame, 100);
  }

  // **ゲームリトライ**
  function retryGame() {
    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    resetGame();
    startGame();
  }

  // **ゲームのリセット**
  function resetGame() {
    exp = 0;
    level = 1;
    chipCount = 0;
    isBonusMode = false;
    timer = 60;
    updateExpBar();
    clearInterval(gameInterval);
    clearInterval(timerInterval);
  }

  // **タイマーのスタート**
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timer <= 0) {
        endGame();
      } else {
        timer--;
        timerDisplay.textContent = `${timer}秒`;
      }
    }, 1000);
  }

  // **ゲームの更新**
  function updateGame() {
    if (exp >= 100) {
      levelUp();
    }
    displayChips();
  }

  // **レベルアップ**
  function levelUp() {
    level++;
    exp = 0;
    updateExpBar();
    if (isBonusMode) {
      chipCount += 5; // ボーナスで多くのチップスを召喚
    }
  }

  // **ポテトチップスを表示**
  function displayChips() {
    chipsArea.innerHTML = '';
    for (let i = 0; i < chipCount; i++) {
      const chip = document.createElement("div");
      chip.classList.add("chip");
      chipsArea.appendChild(chip);
    }
  }

  // **現在のフレーズを表示**
  function displayPhrase(phrase) {
    currentJapaneseDisplay.textContent = phrase.japanese;
    currentRomajiDisplay.textContent = phrase.romaji;
  }

  // **ランダムなフレーズを取得**
  function getRandomPhrase() {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    return phrases[randomIndex];
  }

  // **タイピング処理**
  function handleTyping(typedChar) {
    if (typedChar.toLowerCase() === currentPhrase.romaji.charAt(0)) {
      currentPhrase.romaji = currentPhrase.romaji.slice(1);
      increaseExp(5);
      if (currentPhrase.romaji.length === 0) {
        chipCount += level; // 現在のレベルに応じて召喚数アップ
        currentPhrase = getRandomPhrase();
        displayPhrase(currentPhrase);
      }
    } else {
      resetExp();
    }
  }

  // **経験値を増加**
  function increaseExp(amount) {
    exp += amount;
    if (isBonusMode) {
      exp += 5; // ボーナス時は追加で増加
    }
    updateExpBar();
  }

  // **経験値をリセット**
  function resetExp() {
    exp = 0;
    updateExpBar();
  }

  // **経験値バーを更新**
  function updateExpBar() {
    expProgress.style.width = `${(exp / 100) * 100}%`;
  }

  // **ゲーム終了**
  function endGame() {
    clearInterval(gameInterval);
    clearInterval(timerInterval);
    scoreDisplay.textContent = `スコア: ${chipCount}`;
    resultScreen.classList.remove("hidden");
    gameScreen.classList.add("hidden");
  }
});
