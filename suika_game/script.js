// Matter.js のモジュールを取り込む
const { Engine, Render, World, Bodies, Body, Events } = Matter;

let total_score = 0

// オブジェクトの定義の配列
const objectDefinitions = [
    {
        texture: "/img/suzu_circle.png",
        size: 25,
        label: "suzu_circle",
        originalWidth: 32, // 画像の元の幅
        originalHeight: 32, // 画像の元の高さ
        score: 10
    },
    {
        texture: "/img/kanineko_circle.png",
        size: 30,
        label: "kanineko_circle",
        originalWidth: 182, // 画像の元の幅
        originalHeight: 182, // 画像の元の高さ
        score: 20
    },
    {
        texture: "/img/nikukyu_circle.png",
        size: 35,
        label: "nikukyu_circle",
        originalWidth: 58, // 画像の元の幅
        originalHeight: 52, // 画像の元の高さ
        score: 30
    },
    {
        texture: "/img/mouse_circle.png",
        size: 40,
        label: "mouse_circle",
        originalWidth: 333, // 画像の元の幅
        originalHeight: 333, // 画像の元の高さ
        score: 40
    },
    {
        texture: "/img/neko_circle.png",
        size: 50,
        label: "neko_circle",
        originalWidth: 429, // 画像の元の幅
        originalHeight: 429, // 画像の元の高さ
        score: 50
    },
    {
        texture: "/img/ebi_circle.png",
        size: 60,
        label: "ebi_circle",
        originalWidth: 792, // 画像の元の幅
        originalHeight: 792, // 画像の元の高さ
        score: 60
    },
    {
        texture: "/img/lion_circle.png",
        size: 80,
        label: "lion_circle",
        originalWidth: 574, // 画像の元の幅
        originalHeight: 586, // 画像の元の高さ
        score: 70
    },
];

// 次に落とすオブジェクトをランダムに選択して作成する関数
function createRandomFallingObject(x, y) {
    const randomIndex = Math.floor(Math.random() * objectDefinitions.length);
    const objectDef = objectDefinitions[randomIndex];

    // スケールを計算（オブジェクトのサイズに合わせる）
    const scale = objectDef.size * 2 / Math.max(objectDef.originalWidth, objectDef.originalHeight);

    const object = Bodies.circle(x, y, objectDef.size, {
        label: objectDef.label,
        isStatic: true,
        render: {
            sprite: {
                texture: objectDef.texture,
                xScale: scale,
                yScale: scale
            }
        }
    });
    return object;
}

// 次のオブジェクトを取得する関数
function getNextObjectDefinition(label) {
    for (let i = 0; i < objectDefinitions.length; i++) {
        if (objectDefinitions[i].label === label) {
            // 次のオブジェクトを配列から取得
            if (i === objectDefinitions.length-1) {
                return null;
            }
            return objectDefinitions[(i + 1) % objectDefinitions.length];
        }
    }
    return null;
}

// エンジンとレンダラーを作成
const engine = Engine.create();
const render = Render.create({
    element: document.body,
    engine: engine,
    options: { wireframes: false }
});

// 画面の幅と高さを取得
const width = render.options.width;
const height = render.options.height;

// 床と壁を作成
const ground = Bodies.rectangle(width / 2, height, width, 20, { isStatic: true });
const leftWall = Bodies.rectangle(0, height / 2, 20, height, { isStatic: true });
const rightWall = Bodies.rectangle(width, height / 2, 20, height, { isStatic: true });

// 床と壁をワールドに追加
World.add(engine.world, [ground, leftWall, rightWall]);

// 2つのオブジェクトが衝突した時に呼ばれる関数
function mergeBodies(pair) {
    const bodyA = pair.bodyA;
    const bodyB = pair.bodyB;

    // 同じラベルのオブジェクトが衝突した場合
    if (bodyA.label === bodyB.label) {
        const nextObjectDef = getNextObjectDefinition(bodyA.label);

        if (nextObjectDef) {
            total_score += nextObjectDef.score;
            $('#score').html(total_score.toString())
            const newX = (bodyA.position.x + bodyB.position.x) / 2;
            const newY = (bodyA.position.y + bodyB.position.y) / 2;

            // スケールを計算（オブジェクトのサイズに合わせる）
            const scale = nextObjectDef.size * 2 / Math.max(nextObjectDef.originalWidth, nextObjectDef.originalHeight);

            const newBody = Bodies.circle(newX, newY, nextObjectDef.size, {
                label: nextObjectDef.label,
                render: {
                    sprite: {
                        texture: nextObjectDef.texture,
                        xScale: scale,
                        yScale: scale
                    }
                }
            });

            World.remove(engine.world, [bodyA, bodyB]);
            World.add(engine.world, newBody);
        }
    }
}

// オブジェクトが衝突した時にイベントリスナーを設定
Events.on(engine, 'collisionStart', event => {
    const pairs = event.pairs;
    pairs.forEach(pair => {
        if (pair.bodyA.label === pair.bodyB.label) {
            mergeBodies(pair);
        }
    });
});

// 初期の落下オブジェクトを作成
let nextObject = createRandomFallingObject(width / 2, 30);
// オブジェクトが落下中かどうか
let isFalling = false;
World.add(engine.world, nextObject);

// キーボード入力に応じてオブジェクトを操作
window.addEventListener('keydown', event => {
    if (event.code === 'Space') {
        // スペースキーでオブジェクトを落下
        isFalling = true;
        Body.setStatic(nextObject, false);
        window.setTimeout(() => {
            nextObject = createRandomFallingObject(width / 2, 30);
            isFalling = false;
            World.add(engine.world, nextObject);
        }, 2000)
    } else if (event.code === 'ArrowLeft' && !isFalling) {
        // 左矢印キーでオブジェクトを左に移動
        Body.translate(nextObject, { x: -20, y: 0 });
    } else if (event.code === 'ArrowRight' && !isFalling) {
        // 右矢印キーでオブジェクトを右に移動
        Body.translate(nextObject, { x: 20, y: 0 });
    }
});

// レンダラーとエンジンを実行
Render.run(render);
Engine.run(engine);

