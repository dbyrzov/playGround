function Hero(texture, scale) {
    PIXI.Sprite.call(this, texture);
    this.position.set((1024 / 2) - 30, (512 / 2) - 30);
    this.scale.set(0.5);
}

Hero.prototype = Object.create(PIXI.Sprite.prototype);