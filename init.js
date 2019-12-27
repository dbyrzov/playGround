function init() {
    app = new PIXI.Application({ 
        width: wWidth,         // default: 800
        height: wHeight,        // default: 600
        antialias: true,    // default: false
        transparent: false, // default: false
        resolution: 1,       // default: 1
        forceCanvas: true
    });

    app.renderer.backgroundColor = 0x227590;
    document.getElementById('game').appendChild(app.view);

    loadSprites();
    addTextures();
    requestAnimationFrame(update);
}

function update() {
    ballPool.forEach(b => {
        if (b.free == 1) {
            if (getRandomInt(0, 200) == 10) {
                b.free = 0;
                if (!b.active) {
                    b.active = 1;
                    app.stage.addChild(b.ball);
                } else {
                    var w = getRandomInt(50, wWidth);
                    var h = 0;
                    if (w > wWidth - 10) { h = getRandomInt(0, 100);}
                    b.ball.position.x = w;
                    b.ball.position.y = h;
                    b.ball.visible = true;
                }
            }
        } else {
            if(boxesIntersect(hero, b.ball)) {
                cleanTextures();
                addTextures();
            } else {
                if (b.ball.y > wHeight) {
                    b.ball.visible = false;
                    b.free = 1;
                } else {
                    b.ball.position.x -= getRandomInt(0, 2);
                    b.ball.position.y += Math.random();
                }
            }
        }
    });

    treePool.forEach(t => {
        if (t.free == 1) {
            if (getRandomInt(0, 400) == 10) {
                t.free = 0;
                if (!t.active) {
                    t.active = 1;
                    app.stage.addChild(t.tree);
                } else {
                    t.tree.position.x = wWidth;
                    t.tree.position.y = 400;
                    t.tree.visible = true;
                }
            }
        } else {
            if(boxesIntersect(hero, t.tree)) {
                cleanTextures();
                addTextures();
            } else {
                if (t.tree.x < 0) {
                    t.tree.visible = false;
                    t.free = 1;
                } else {
                    t.tree.position.x -= 1;
                }
            }
        }
    });

    forest.tilePosition.x -= 1;
    distance++;
    if (distance > maxLevelDistance) {
        alert("Congratulations! Level passed!");
        cleanTextures();
        addTextures();
    }
    requestAnimationFrame(update);
}

document.addEventListener('keydown', (e) => {
    if (e.keyCode == '37') {  // left
        if (hero.x > step + 1) {
            hero.x -= step;
        }
    } else if (e.keyCode == '38') { // up
        if (hero.y > step + 1) {
            hero.y -= step;
        }
    } else if (e.keyCode == '39') { // right
        if (hero.x < wWidth - step - hero.width) {
            hero.x += step;
        }
    } else if (e.keyCode == '40') { // down
        if (hero.y < wHeight - step - hero.height) {
            hero.y += step;
        }
    }
});
