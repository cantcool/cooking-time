var GAME = GAME || {};

GAME.Pickup = function() {
    PIXI.Sprite.call(this, PIXI.Texture.fromFrameId("milk.png"));

    this.origin = {
        x: 0,
        y: 0
    };

    this.app = app;

    this.anchor.x = 0.5;
    this.anchor.y = 0.5;
    this.radius = 40;
    this.speed = {
        x: 0,
        y: Math2.random(2.75, 3.5)
    }; 
};

GAME.Pickup.constructor = GAME.Pickup;
GAME.Pickup.prototype = Object.create(PIXI.Sprite.prototype);

GAME.Pickup.BACON = 0;
GAME.Pickup.FLOUR = 1;
GAME.Pickup.EGGS = 2;
GAME.Pickup.MILK = 3;

GAME.Pickup.MINT = 10;
GAME.Pickup.TRUNK = 11;
GAME.Pickup.GUNTER = 12;

GAME.Pickup.prototype.reset = function() {};

GAME.Pickup.prototype.setTypeToMilk = function() {
    this.id = GAME.Pickup.MILK;
    this.sound = 'sounds/milk.mp3';
    this.ratio = 0;
    this.scale.y = 0.75;
    this.scale.x = this.scale.y;
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("milk.png"));
};

GAME.Pickup.prototype.setTypeToBacon = function() {
    this.id = GAME.Pickup.BACON;
    this.sound = 'sounds/yam.mp3';
    this.ratio = 0;
    this.scale.y = 0.5;
    this.scale.x = this.scale.y * Math2.randomPlusMinus();
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("bacon.png"));
};

GAME.Pickup.prototype.setTypeToFlour = function() {
    this.id = GAME.Pickup.FLOUR;
    this.sound = 'sounds/heii.mp3';
    this.ratio = 0;
    this.scale.y = 0.5;
    this.scale.x = this.scale.y;
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("flour.png"));
};

GAME.Pickup.prototype.setTypeToEggs = function() {
    this.id = GAME.Pickup.EGGS;
    this.sound = 'sounds/mmm.mp3';
    this.ratio = 0;
    this.scale.y = 0.5;
    this.scale.x = this.scale.y * Math2.randomPlusMinus();
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("eggs.png"));
};

GAME.Pickup.prototype.setTypeToMint = function() {
    this.id = GAME.Pickup.MINT;
    this.sound = 'sounds/mint_hey.mp3';
    this.ratio = 0;
    this.scale.y = 0.5;
    this.scale.x = this.scale.y * Math2.randomPlusMinus();
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("mint.png"));
};

GAME.Pickup.prototype.setTypeToGunter = function() {
    this.id = GAME.Pickup.GUNTER;
    this.sound = 'sounds/no.mp3';
    this.ratio = 0;
    this.scale.y = 0.5;
    this.scale.x = this.scale.y * Math2.randomPlusMinus();
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("gunter.png"));
};

GAME.Pickup.prototype.setTypeToTrunk = function() {
    this.id = GAME.Pickup.TRUNK;
    this.sound = 'sounds/grows.mp3';
    this.ratio = 0;
    this.scale.y = 0.6;
    this.scale.x = this.scale.y * Math2.randomPlusMinus();
    this.isPickedUp = false;
    this.setTexture(PIXI.Texture.fromFrameId("trunk.png"));
};


GAME.Pickup.prototype.handleGood = function(price = 1) {
    this.app.score += price;

    soundEvent = new Howl({
      src: (this.sound || 'sounds/heii.mp3'),
      autoplay: true,
      loop: false,
      volume: soundEventVolume
    });

};

GAME.Pickup.prototype.handleBad = function(price = 1) {
    this.app.lifesManager.lifesCount -= 1;
    
    if(this.app.lifesManager.lifesCount === 0) {
        this.app.gameover();
    }

    soundEvent = new Howl({
      src: (this.sound || 'sounds/no.mp3'),
      autoplay: true,
      loop: false,
      volume: soundEventVolume
    });
};
