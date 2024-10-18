// グリッドの初期化
let grid = [];
for (let i = 0; i < 4; i++) {
  grid[i] = [0, 0, 0, 0];
}

// 新しいタイルを生成
function generateNewTile() {
  // ...
}

// タイルを移動
function moveTiles(direction) {
  // ...
}

// キーボード入力の処理
document.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp': moveTiles('up'); break;
    case 'ArrowDown': moveTiles('down'); break;
    case 'ArrowLeft': moveTiles('left'); break;
    case 'ArrowRight': moveTiles('right'); break;
  }
});

// ゲームの初期化
generateNewTile();
generateNewTile();
