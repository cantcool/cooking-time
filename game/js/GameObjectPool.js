var GAME = GAME || {};

GAME.GameObjectPool = function(type) {
    this.classType = type;
    this.pool = [];
};

GAME.GameObjectPool.constructor = GAME.GameObjectPool;
GAME.GameObjectPool.prototype.getObject = function() {
    let item = this.pool.pop();
    
    if(item === undefined) {
        item = new this.classType();
    }
    
    return item;
};

GAME.GameObjectPool.prototype.returnObject = function() {};
