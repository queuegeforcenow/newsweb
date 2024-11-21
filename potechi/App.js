import React, { useState, useEffect } from "react";
import "./App.css";

// 語録
const words = [
  "sakura", "fuji", "tokyo", "nihon", "konnichiwa", "sayonara", "arigatou", 
  "sumimasen", "itadakimasu", "gambatte", "osaka", "fujisan", "hiroshima", "seoul"
];

// Cookieの読み書き用ヘルパー関数
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return null;
};

const setCookie = (name, value, days) => {
  const date = new Date();
  date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const App = () => {
  const [currentWord, setCurrentWord] = useState("");
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [experience, setExperience] = useState(0);
  const [experienceToLevelUp, setExperienceToLevelUp] = useState(100);
  const [timer, setTimer] = useState(60);
  const [inputValue, setInputValue] = useState("");
  const [totalSummon, setTotalSummon] = useState(0);
  const [currentTotalSummon, setCurrentTotalSummon] = useState(0);
  const [potatoChips, setPotatoChips] = useState([]);
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [title, setTitle] = useState(""); // 新しい称号状態
  const [ranking, setRanking] = useState([]); // ランキングデータ

  useEffect(() => {
    // Cookieからランキングを取得
    const storedRanking = getCookie("ranking");
    if (storedRanking) {
      setRanking(JSON.parse(storedRanking));
    }

    // ゲーム状態をCookieに保存
    const storedScore = getCookie("score");
    const storedTotalSummon = getCookie("totalSummon");
    const storedLevel = getCookie("level");
    const storedExperience = getCookie("experience");
    const storedExperienceToLevelUp = getCookie("experienceToLevelUp");

    if (storedScore) setScore(parseInt(storedScore));
    if (storedTotalSummon) setTotalSummon(parseInt(storedTotalSummon));
    if (storedLevel) setLevel(parseInt(storedLevel));
    if (storedExperience) setExperience(parseInt(storedExperience));
    if (storedExperienceToLevelUp) setExperienceToLevelUp(parseInt(storedExperienceToLevelUp));

    if (experience >= experienceToLevelUp) {
      levelUp();
    }
  }, []);

  useEffect(() => {
    // ポテトチップスの召喚数に応じて称号を変更
    if (totalSummon >= 3000) {
      setTitle("ポテトの王様");
    } else if (totalSummon >= 2000) {
      setTitle("チップス界の帝王");
    } else if (totalSummon >= 1500) {
      setTitle("チップスの神");
    } else if (totalSummon >= 1000) {
      setTitle("ポップコーンマスター");
    } else if (totalSummon >= 750) {
      setTitle("フライドポテトマスター");
    } else if (totalSummon >= 500) {
      setTitle("ポテト名人");
    } else if (totalSummon >= 400) {
      setTitle("ポテト大好き人間");
    } else if (totalSummon >= 300) {
      setTitle("ポテトの達人");
    } else if (totalSummon >= 200) {
      setTitle("チップス職人");
    } else if (totalSummon >= 100) {
      setTitle("フライドポテト王");
    } else if (totalSummon >= 50) {
      setTitle("ポテトマニア");
    } else if (totalSummon >= 10) {
      setTitle("ポテトの歩兵");
    } else {
      setTitle(""); // まだ称号を持っていない
    }
  }, [totalSummon]);

  // ランダムな単語を生成
  const generateWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    setCurrentWord(words[randomIndex]);
  };

  // 経験値バーの更新
  const updateExperienceBar = () => {
    return (experience / experienceToLevelUp) * 100;
  };

  // レベルアップ処理
  const levelUp = () => {
    setLevel(prevLevel => prevLevel + 1);
    setExperience(0);
    setExperienceToLevelUp(prevExperienceToLevelUp => prevExperienceToLevelUp * 1.5);
  };

  // ポテトチップスの召喚
  const summonPotatoChips = (count) => {
    let newPotatoChips = [];
    for (let i = 0; i < count; i++) {
      newPotatoChips.push({ id: Math.random(), left: Math.random() * 80, top: Math.random() * 50 });
    }
    setPotatoChips(prevPotatoChips => [...prevPotatoChips, ...newPotatoChips]);
    setCurrentTotalSummon(prev => prev + count);
    setTotalSummon(prev => prev + count);

    // Cookieにデータを保存
    setCookie("score", score, 7);
    setCookie("totalSummon", totalSummon, 7);
    setCookie("level", level, 7);
    setCookie("experience", experience, 7);
    setCookie("experienceToLevelUp", experienceToLevelUp, 7);
  };

  // タイマーの開始
  useEffect(() => {
    if (isGameStarted) {
      const timerInterval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer === 1) {
            clearInterval(timerInterval);
            endGame();
          }
          return prevTimer - 1;
        });
      }, 1000);
      return () => clearInterval(timerInterval);
    }
  }, [isGameStarted]);

  // ゲーム終了処理
  const endGame = () => {
    alert(`ゲーム終了! あなたのスコア: ${score}`);

    // ゲーム終了時、ランキングを更新
    const newRanking = [
      ...ranking,
      { score, totalSummon }
    ];
    newRanking.sort((a, b) => b.score - a.score); // スコアで降順ソート
    setRanking(newRanking.slice(0, 10)); // 上位10位のみ表示

    // ランキングをCookieに保存
    setCookie("ranking", JSON.stringify(newRanking), 7);

    setIsGameStarted(false);
  };

  // 入力処理
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    if (value.toLowerCase() === currentWord) {
      setScore(prevScore => prevScore + 1);
      setExperience(prevExperience => prevExperience + 1 * level);
      summonPotatoChips(level);
      setInputValue(""); // 入力フィールドをリセット
      generateWord(); // 新しい単語を表示
    }
  };

  // スペースキーでゲーム開始
  const handleSpaceKey = (event) => {
    if (event.code === "Space" && !isGameStarted) {
      setIsGameStarted(true);
      generateWord();
    }
  };

  // 初期化
  useEffect(() => {
    document.addEventListener("keydown", handleSpaceKey);
    return () => {
      document.removeEventListener("keydown", handleSpaceKey);
    };
  }, [isGameStarted]);

  return (
    <div className="game-container">
      <h1>ポテトチップス召喚タイピングゲーム</h1>
      <div className="game-info">
        <div>残り時間: {timer}秒</div>
        <div>スコア: {score}</div>
        <div>レベル: {level}</div>
        <div>称号: {title}</div>
        <div>経験値: {experience} / {experienceToLevelUp}</div>
      </div>

      <div className="ranking">
        <h2>ランキング</h2>
        <ul>
          {ranking.map((entry, index) => (
            <li key={index}>
              {index + 1}. スコア: {entry.score}, 召喚数: {entry.totalSummon}
            </li>
          ))}
        </ul>
      </div>

      <div className="game-area">
        <p>{currentWord}</p>
        <input 
          type="text" 
          value={inputValue} 
          onChange={handleInputChange} 
          placeholder="ここにタイピング" 
        />
      </div>

      <div className="potato-chips">
        {potatoChips.map(chip => (
          <div key={chip.id} className="chip" style={{ left: `${chip.left}%`, top: `${chip.top}%` }} />
        ))}
      </div>
    </div>
  );
};

export default App;
