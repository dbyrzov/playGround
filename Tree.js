function Tree(texture, scale) {
    PIXI.Sprite.call(this, texture);
    this.scale.set(scale);
    this.position.set(1020, 400);
  }
  
  Tree.prototype = Object.create(PIXI.Sprite.prototype);