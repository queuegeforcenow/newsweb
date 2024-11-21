document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-button");
  const gameArea = document.getElementById("game-area");
  const inputField = document.getElementById("input-field");
  const currentWordDisplay = document.getElementById("current-word");
  const japaneseDisplay = document.getElementById("japanese-display");
  const progressDisplay = document.getElementById("progress-display");
  const scoreDisplay = document.getElementById("score-display");
  const levelDisplay = document.getElementById("level-display");
  const timerDisplay = document.getElementById("timer-display");
  const costumeDisplay = document.getElementById("costume-display");

  const words = [
  { japanese: "犬", romaji: "inu" },
  { japanese: "猫", romaji: "neko" },
  { japanese: "車", romaji: "kuruma" },
  { japanese: "学校", romaji: "gakkou" },
  { japanese: "先生", romaji: "sensei" },
  { japanese: "友達", romaji: "tomodachi" },
  { japanese: "家族", romaji: "kazoku" },
  { japanese: "電話", romaji: "denwa" },
  { japanese: "時計", romaji: "tokei" },
  { japanese: "財布", romaji: "saifu" },
  { japanese: "電車", romaji: "densha" },
  { japanese: "飛行機", romaji: "hikouki" },
  { japanese: "船", romaji: "fune" },
  { japanese: "橋", romaji: "hashi" },
  { japanese: "道", romaji: "michi" },
  { japanese: "海", romaji: "umi" },
  { japanese: "山", romaji: "yama" },
  { japanese: "川", romaji: "kawa" },
  { japanese: "風", romaji: "kaze" },
  { japanese: "雪", romaji: "yuki" },
  { japanese: "雨", romaji: "ame" },
  { japanese: "天気", romaji: "tenki" },
  { japanese: "春", romaji: "haru" },
  { japanese: "夏", romaji: "natsu" },
  { japanese: "秋", romaji: "aki" },
  { japanese: "冬", romaji: "fuyu" },
  { japanese: "朝", romaji: "asa" },
  { japanese: "昼", romaji: "hiru" },
  { japanese: "夕方", romaji: "yuugata" },
  { japanese: "夜", romaji: "yoru" },
  { japanese: "週末", romaji: "shuumatsu" },
  { japanese: "仕事", romaji: "shigoto" },
  { japanese: "休み", romaji: "yasumi" },
  { japanese: "旅行", romaji: "ryokou" },
  { japanese: "趣味", romaji: "shumi" },
  { japanese: "映画", romaji: "eiga" },
  { japanese: "音楽", romaji: "ongaku" },
  { japanese: "読書", romaji: "dokusho" },
  { japanese: "スポーツ", romaji: "supo-tsu" },
  { japanese: "ゲーム", romaji: "ge-mu" },
  { japanese: "テレビ", romaji: "terebi" },
  { japanese: "インターネット", romaji: "innta-netto" },
  { japanese: "携帯電話", romaji: "keitaidenwa" },
  { japanese: "パソコン", romaji: "pasokon" },
  { japanese: "日本語", romaji: "nihongo" },
  { japanese: "英語", romaji: "eigo" },
  { japanese: "漢字", romaji: "kanji" },
  { japanese: "平仮名", romaji: "hiragana" },
  { japanese: "片仮名", romaji: "katakana" },
  { japanese: "今日はとてもいい天気です。", romaji: "kyouwatotemoiitenkidesu." },
  { japanese: "私は日本語を勉強しています。", romaji: "watashiwanihongowobenkyoushiteimasu." },
  { japanese: "週末に友達と映画を見に行きます。", romaji: "shuumatsunitomodachitoeigawominiikimasu." },
  { japanese: "夏休みに旅行に行きたいです。", romaji: "natsuyasuminiryokouniikitaidesu." },
  { japanese: "新しいゲームを買いました。", romaji: "atarashiige-muokaimashita." },
  { japanese: "音楽を聞くのが好きです。", romaji: "ongakuokikunogasukidesu." },
  { japanese: "お茶を飲みながら本を読むのが楽しいです。", romaji: "ochaonominagarahonoyomunogatanoshiidesu." },
  { japanese: "駅まで歩いて行きます。", romaji: "ekimadearuiteikimasu." },
  { japanese: "家族でレストランに行きました。", romaji: "kazokuderesutoranniikimashita." },
  { japanese: "彼はスポーツが得意です。", romaji: "karewasupo-tsugatokuidesu." },
  { japanese: "毎日学校で勉強します。", romaji: "mainichigakkoudebenkyoushimasu." },
  { japanese: "今日は友達と公園に行きました。", romaji: "kyouwatomodachitokouenniikimashita." },
  { japanese: "この本はとても面白いです。", romaji: "konohonwatotemoomoshiroidesu." },
  { japanese: "日本の文化をもっと知りたいです。", romaji: "nihonnobunkawomottoshiritaidesu." },
  { japanese: "旅行が大好きです。", romaji: "ryokougadaisukidesu." },
  { japanese: "彼女はとても親切です。", romaji: "kanojowatotemoshinsetsudesu." },
  { japanese: "新しい携帯電話を買いました。", romaji: "atarashiikeitaidenwaokaimashita." },
  { japanese: "夏は海で泳ぎます。", romaji: "natsuwaumideoyogimasu." },
  { japanese: "冬にスキーをします。", romaji: "fuyunisuki-woshimasu." },
  { japanese: "天気がいいので散歩します。", romaji: "tenkigaiinodesanposhimasu." },
  { japanese: "今日は本当に疲れました。", romaji: "kyouwahontounitsukaremashita." },
  { japanese: "美味しいご飯を食べました。", romaji: "oishiigohanotabemashita." },
  { japanese: "猫が大好きです。", romaji: "nekogadaisukidesu." },
  { japanese: "犬と一緒に遊びます。", romaji: "inutoisshoniasobimasu." },
  { japanese: "朝早く起きます。", romaji: "asahayakuokimasu." },
  { japanese: "夜遅くまで勉強します。", romaji: "yoruosokumadebenkyoushimasu." },
  { japanese: "私の家は駅の近くです。", romaji: "watashinoiewaekinochikakudesu." },
  { japanese: "明日は雨が降るかもしれません。", romaji: "ashitawaamegafurukamoshiremasen." },
  { japanese: "宿題を早く終わらせたいです。", romaji: "shukudaiwohayakuowarasetaidesu." },
  { japanese: "この店のケーキは美味しいです。", romaji: "konomisenoke-kioishiidesu." },
  { japanese: "駅まで走ります。", romaji: "ekimadehashirimasu." },
  { japanese: "部屋を掃除しなければなりません。", romaji: "heyawosoujishinakerebanarimasen." },
  { japanese: "彼はとても速く走ります。", romaji: "karetotemohayakuhashirimasu." },
  { japanese: "今日は疲れたので早く寝ます。", romaji: "kyouwatsukaretanodehayakunemasu." },
  { japanese: "友達と一緒に遊園地に行きました。", romaji: "tomodachitoisshonyuuenchiniikimashita." },
  { japanese: "新しいパソコンを買いました。", romaji: "atarashiipasokonokaimashita." },
  { japanese: "彼女は絵を描くのが上手です。", romaji: "kanojowaeokakunogajouzu." },
  { japanese: "私はコーヒーが好きです。", romaji: "watashiwa-ko-higasukidesu." },
  { japanese: "秋には紅葉が綺麗です。", romaji: "akinihakouyougakireidesu." },
  { japanese: "電車が遅れています。", romaji: "denshagaokureteimasu." }

];

  const costumes = [
    { name: "のりしお", className: "costume-norishio", unlockAt: 10000 },
    { name: "コンソメ", className: "costume-konsome", unlockAt: 20000 },
    { name: "バターしょうゆ", className: "costume-bata-shoyu", unlockAt: 30000 },
    { name: "わさび", className: "costume-wasabi", unlockAt: 40000 },
    { name: "チーズ", className: "costume-cheese", unlockAt: 50000 },
    { name: "ガーリック", className: "costume-garlic", unlockAt: 60000 },
    { name: "辛口", className: "costume-karakuchi", unlockAt: 70000 },
  ];

  let score = 0;
  let summonCount = 0;
  let currentLevel = 1;
  let timer = 60;
  let currentWord = "";
  let currentJapanese = "";
  let timerInterval = null;

  function startGame() {
    resetGame();
    gameArea.style.display = "block";
    inputField.focus();
    generateWord();
    startTimer();
  }

  function resetGame() {
    score = getCookie("score") || 0;
    summonCount = getCookie("summonCount") || 0;
    currentLevel = 1;
    timer = 60;
    updateDisplay();
  }

  function generateWord() {
    const wordData = words[Math.floor(Math.random() * words.length)];
    currentWord = wordData.romaji;
    currentJapanese = wordData.japanese;
    updateDisplay();
  }

  function startTimer() {
    timerInterval = setInterval(() => {
      timer--;
      if (timer <= 0) {
        endGame();
      }
      updateDisplay();
    }, 1000);
  }

  function updateDisplay() {
    currentWordDisplay.textContent = currentWord;
    japaneseDisplay.textContent = currentJapanese;
    scoreDisplay.textContent = `スコア: ${score}`;
    levelDisplay.textContent = `レベル: ${currentLevel}`;
    timerDisplay.textContent = `残り時間: ${timer}s`;
    costumeDisplay.textContent = `使用中のコスチューム: ${getCostume()}`;
    applyCostumeStyle();
  }

  function getCostume() {
    const costume = costumes
      .slice()
      .reverse()
      .find(c => summonCount >= c.unlockAt);
    return costume ? costume.name : "未解放";
  }

  function applyCostumeStyle() {
    document.body.className = "";
    const costume = costumes.find(c => summonCount >= c.unlockAt);
    if (costume) {
      document.body.classList.add(costume.className);
    }
  }

  function handleInput(e) {
    if (e.key === currentWord.charAt(0)) {
      currentWord = currentWord.slice(1);
      score += currentLevel;
      summonCount += currentLevel;
      if (currentWord.length === 0) {
        generateWord();
        currentLevel++;
      }
    } else {
      score -= currentLevel;
    }
    updateDisplay();
  }

  function endGame() {
    clearInterval(timerInterval);
    setCookie("score", score, 7);
    setCookie("summonCount", summonCount, 7);
    alert(`ゲーム終了! 合計スコア: ${score}, 合計召喚数: ${summonCount}`);
    resetGame();
  }

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find(c => c.startsWith(name + "="));
    return cookie ? cookie.split("=")[1] : null;
  }

  startButton.addEventListener("click", startGame);
  inputField.addEventListener("keydown", handleInput);
});
