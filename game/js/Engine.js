var GAME = GAME || {};

GAME.HIGH_MODE = true;

GAME.Engine = function() {
    this.view = new GAME.View(this);
    this.mouse = {
        x: 0,
        y: 0
    };
    this.player = new GAME.PlayerCreature(this);
    this.pickupManager = new GAME.PickupManager(this);
    this.lifesManager = new GAME.LifesManager(this);
    this.collisionManger = new GAME.CollisionManager(this);

    this.view.actionContainer.addChild(this.player);

    this.canSpawn = true;

    this.gameCount = 0;
    this.score = 0;
    this.canSpawn = false;
    this.gamePlaying = false;

    this.player.visible = false;
};

GAME.Engine.constructor = GAME.Engine;
GAME.Engine.prototype.update = function() {
    if(this.gamePlaying) {
        this.gameCount += GAME.time.DELTA_TIME;
        this.canSpawn = this.gameCount > 10;
    }

    this.player.targetPosition.x = this.mouse.x;
    this.player.targetPosition.y = this.mouse.y;

    this.pickupManager.update();
    this.lifesManager.update();
    this.collisionManger.update();
    this.view.update();
};

GAME.Engine.prototype.gameover = function() {
    this.view.showGameover();
    this.canSpawn = this.gamePlaying = false;
    this.player.visible = false;

    this.pickupManager.removeAll();

    soundResult = new Howl({
        src: 'sounds/gameover.mp3',
        autoplay: false,
        loop: false,
        volume: soundEventVolume
    });
    setTimeout(function() {soundResult.play();}, 800);
};

GAME.Engine.prototype.levelComplete = function() {
    this.view.showLevelComplete();
    this.canSpawn = this.gamePlaying = false;
    this.player.visible = false;

    this.pickupManager.removeAll();

    soundResult = new Howl({
        src: 'sounds/gosh.mp3',
        autoplay: false,
        loop: false,
        volume: soundEventVolume
    });
    setTimeout(function() {soundResult.play();}, 800);
};

GAME.Engine.prototype.restart = function() {
    this.gamePlaying = true;
    this.lifesManager.lifesCount = 3;
    this.pickupManager.addPickupDelayStep = addPickupDelayStepDefault;
    this.score = 0;
    this.player.visible = true;
    this.view.hideGameover();
    this.view.hideLevelComplete();
};
