var GAME = GAME || {};

GAME.View = function(engine) {
    let canvas = document.getElementById('holder');
    
    this.engine = engine;
    this.renderer = renderer;

    GAME.HIGH_MODE = this.renderer instanceof PIXI.WebGLRenderer;
    
    this.stage = stage;
    this.background = new GAME.Background();
    this.stage.addChild(this.background);

    this.screenFrame = document.createElement('div');
    this.screenFrame.className = 'screenFrame';
    canvas.appendChild(this.screenFrame);

    this.scoreView = document.createElement('div');
    this.scoreView.className = 'scoreNumbers';
    canvas.appendChild(this.scoreView);

    this.lifesContainer = document.createElement('div');
    this.lifesContainer.className = 'lifeItems';
    this.lifes = [];
    canvas.appendChild(this.lifesContainer);

    for (let b = 0; b < 3; b++) {
        this.lifes[b] = document.createElement('div');
        this.lifes[b].className = 'lifeItem';
        this.lifes[b].style.left = 192 - 90 * b + 'px';
        this.lifesContainer.appendChild(this.lifes[b]);
    }
    
    this.actionContainer = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.actionContainer);
    
    this.gameoverScreen = document.createElement('div');
    this.gameoverScreen.className = 'gameoverView';
    this.gameoverScreen.style.display = 'none';
    canvas.appendChild(this.gameoverScreen);

    this.introScreen = document.createElement('div');
    this.introScreen.className = 'introScreen';
    canvas.appendChild(this.introScreen);
};

GAME.View.constructor = GAME.View;

GAME.View.prototype.update = function() {
    this.renderer.render(this.stage);

    this.scoreView.innerHTML = this.engine.score;
};

GAME.View.prototype.showGameover = function() {
    $(this.gameoverScreen).fadeIn();
    soundMusic.fade(soundMusicVolume, 0, 1000);
};

GAME.View.prototype.hideGameover = function() {
    $(this.gameoverScreen).fadeOut();
    soundMusic.fade(0, soundMusicVolume, 1500);
};
