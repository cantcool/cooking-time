var GAME = GAME || {};

GAME.Background = function() {
    PIXI.DisplayObjectContainer.call(this);
    
    this.scrollPosition = 0;
    this.land = [PIXI.Sprite.fromFrame('img/bg.jpg')];

    for (let i = 0; i < this.land.length; i++) {
        this.addChild(this.land[i]);
    }
};

GAME.Background.constructor = GAME.Background;

GAME.Background.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

GAME.Background.prototype.updateTransform = function() {
    
    for (let i = 0; i < this.land.length; i++) {
        let x = this.scrollPosition + 946 * i;
        
        this.land[i].position.x = Math.round(x);
    }
   
    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
};
