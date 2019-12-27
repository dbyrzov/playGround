function SnowFlake(texture, x, y) {
  PIXI.Sprite.call(this, texture);
  this.position.set(x, y);
}

SnowFlake.prototype = Object.create(PIXI.Sprite.prototype);