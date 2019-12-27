wHeight = 512;
wWidth = 1024;
step = 7;
ballPool = [];
treePool = [];
ballObj = {free:  1, ball: {}, active: 0};
treeObj = {free:  1, tree: {}, active: 0};
distance = 0;
maxLevelDistance = 500000;

function getRandomInt(min, max) {
    var num = Math.floor(Math.random() * Math.floor(max - min)) + min;
    return num;
}

function loadSprites() {
    forestTexture = PIXI.Texture.from("images/forest.png");
    santa = PIXI.Texture.from("images/santa.png");
    snowflake = PIXI.Texture.from("images/snowflake.png");
    treeTexture = PIXI.Texture.from("images/tree.png");
}

function setGameDifficulty() {
    var level = prompt("Enter level between 1 and 10: ");
    if (level == 'undefined' || level < 1) level = 1;
    else if (level > 10) level = 10;

    ballPool = [];
    for(i = 0; i < level*3; i++) {
        var w = getRandomInt(0, wWidth);
        var h = 0;
        if (w > wWidth - 20) { h = getRandomInt(0, 200);}
        ballObj.ball = new SnowFlake(snowflake, w, h);
        ballPool.push({...ballObj});
    }

    treePool = [];
    for(i = 0; i < level; i++) {
        treeObj.tree = new Tree(treeTexture, 0.2);
        treePool.push({...treeObj});
    }
}

function addTextures() {
    // Add bottom tiling sprite - the forest
    forest = new Forest(forestTexture, app.renderer.width, app.renderer.height);
    app.stage.addChild(forest);

    // Add our hero sprite
    hero = new Hero(santa, 0.1);
    app.stage.addChild(hero);

    setGameDifficulty();
}

function cleanTextures() {
    ballPool.forEach(b => {
        b.free = 1;
        b.active = 0;
        b.ball.destroy();
    });
    hero.destroy();
    forest.destroy();

    treePool.forEach(t => {
        t.free = 1;
        t.active = 0;
        t.tree.destroy();
    });
}

function boxesIntersect(a, b)
{
  var ab = a.getBounds();
  var bb = b.getBounds();
  return ab.x + ab.width > bb.x && ab.x < bb.x + bb.width && ab.y + ab.height > bb.y && ab.y < bb.y + bb.height;
}