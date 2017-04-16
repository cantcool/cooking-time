var GAME = GAME || {};

GAME.CollisionManager = function(a) {
    this.engine = a;
    this.count = 0;
};

GAME.CollisionManager.constructor = GAME.CollisionManager;
GAME.CollisionManager.prototype.update = function() {
    if(this.count === 0) {
        if(this.hitTestPlayerVsPickups()) {
            this.count += 1;
        }
    }
};

GAME.CollisionManager.prototype.hitTestPlayerVsPickups = function() {
    const player = this.engine.player;
    const pickups = this.engine.pickupManager.pickups;

    for (let i = 0; i < pickups.length; i++) {
        let item = pickups[i];
        let deltaX = player.position.x - item.position.x;
        let deltaY = player.position.y - item.position.y;
        let dist = player.radius + item.radius;

        if (Math.pow(deltaX, 2) + Math.pow(deltaY, 2) < Math.pow(dist, 2)) {
            this.engine.pickupManager.pickup(item);
            break;
        }
    }
};
