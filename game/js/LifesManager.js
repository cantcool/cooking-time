var GAME = GAME || {};

GAME.LifesManager = function(engine) {
    this.engine = engine;
    this.lifesCount = 3;
};

GAME.LifesManager.constructor = GAME.LifesManager;
GAME.LifesManager.prototype.update = function() {
    for (let i = 0; i < 3; i++) {
        this.engine.view.lifes[i].style.visibility = 'hidden';
    }
    
    for (let i = 0; i < this.lifesCount; i++) {
        this.engine.view.lifes[i].style.visibility = 'visible';
    }
};
