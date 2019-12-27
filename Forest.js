function Forest(texture, width, height) {
    PIXI.TilingSprite.call(this, texture, width, height);
    this.position.set(0, 512-89);
  }
  
  Forest.prototype = Object.create(PIXI.TilingSprite.prototype);