var GAME = GAME || {};
var playerFrames;

GAME.PlayerCreature = function(a) {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId('jake01.png'));

    playerFrames = [];
    for (let b = 1; b < 9; b++) {
        playerFrames.push(PIXI.Texture.fromFrameId('jake0' + b + '.png'));
    }

    this.engine = a;
    this.targetPosition = {
        x: gameWidth / 2,
        y: gameHeight / 2
    };

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;

    this.position.x = gameWidth / 2;
    this.position.y = gameHeight + 100;
    this.targetX = this.previousX = 0;
    this.radius = 12.5;

    this.positionMin = {};
    this.positionMax = {};
    this.positionMin.x = 50;
    this.positionMax.x = gameWidth - 50;
    this.positionMin.y = 260;
    this.positionMax.y = gameHeight - 65;

    this.frameNum = 0;
    this.totalFrames = playerFrames.length;
};

GAME.PlayerCreature.constructor = GAME.PlayerCreature;
GAME.PlayerCreature.prototype = Object.create(PIXI.Sprite.prototype);

GAME.PlayerCreature.prototype.updateTransform = function() {
    // ANIMATION
    this.setTexture(playerFrames[Math.floor(this.frameNum)]);
    this.frameNum += 0.3;
    if(this.frameNum > this.totalFrames - 1) {
        this.frameNum = 0;
    }

    // CHECK BOUNDS
    if(this.targetPosition.x < this.positionMin.x) {
        this.targetPosition.x = this.positionMin.x;
    }
    if(this.targetPosition.x > this.positionMax.x) {
        this.targetPosition.x = this.positionMax.x;
    }
    if(this.targetPosition.y < this.positionMin.y) {
        this.targetPosition.y = this.positionMin.y;
    }
    if(this.targetPosition.y > this.positionMax.y) {
        this.targetPosition.y = this.positionMax.y;
    }
    
    // EASE & POSITIONING
    this.position.x += 0.32 * (this.targetPosition.x - this.position.x);
    this.position.y += 0.32 * (this.targetPosition.y - 40 - this.position.y);

    this.scaleValue = 0.4 + (this.position.y / gameHeight) * 0.6;

    this.scale.y = this.scaleValue;
    if(this.position.x < this.previousX) {
        this.scale.x = this.scaleValue;
    } else {
        this.scale.x = -this.scaleValue;
    }

    PIXI.DisplayObjectContainer.prototype.updateTransform.call(this);
    this.previousX = this.targetPosition.x;
};
