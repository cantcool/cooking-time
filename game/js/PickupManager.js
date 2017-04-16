var GAME = GAME || {};

GAME.PickupManager = function(engine) {
    this.engine = engine;
    this.pickups = [];
    this.pickupPool = new GAME.GameObjectPool(GAME.Pickup);

    this.addPickupDelayCount = 0;
    this.addPickupDelayStep = addPickupDelayStepDefault;
    this.addPickupDelayProgression = 0.8;
    this.addPickupDelayFastest = 12;
};

GAME.PickupManager.constructor = GAME.PickupManager;

GAME.PickupManager.prototype.update = function() {
    this.addPickupDelayCount += GAME.time.DELTA_TIME;
    
    if(this.addPickupDelayCount > this.addPickupDelayStep) {
        this.addPickup();
        this.addPickupDelayCount = 0;
        if(this.addPickupDelayStep > this.addPickupDelayFastest) {
            this.addPickupDelayStep -= this.addPickupDelayProgression;
        }
    }

    let pickupsArray = this.pickups;

    for (let i = 0; i < pickupsArray.length; i++) {
        const item = pickupsArray[i];

        if(item.isPickedUp) {
            // SHRINKING ANIMATION

            item.ratio += (0.2) * (1 - item.ratio);
            item.scale.x = 1 - item.ratio;
            item.scale.y = 1 - item.ratio;
            item.position.x = item.pickupPosition.x + (this.engine.player.position.x - item.pickupPosition.x) * item.ratio;
            item.position.y = item.pickupPosition.y + (this.engine.player.position.y - item.pickupPosition.y) * item.ratio;
        }   

        if(item.ratio > 0.99) {
            this.destroyPickup(item);
        } else {
            item.position.y += item.speed.y * GAME.time.DELTA_TIME;
        }

        if(item.position.y > gameHeight) {
            this.destroyPickup(item);
            i--;
        }
    }
};

GAME.PickupManager.prototype.addPickup = function() {
    if(this.engine.canSpawn) {
        const item = this.pickupPool.getObject();
        const dropType = Math2.randomInt(0, 11);

        this.engine.view.actionContainer.addChild(item);
        
        switch (dropType) {
            case 0:
            case 1:
                item.setTypeToFlour();
                break;

            case 2:
            case 3:
                item.setTypeToEggs();
                break;

            case 4:
            case 5:
                item.setTypeToMilk();
                break;

            case 6:
                item.setTypeToMint();
                break;

            case 7:
                item.setTypeToBacon();
                break;

            case 8:
            case 9:
                item.setTypeToTrunk();
                break;

            case 10:
                item.setTypeToGunter();
                break;

            case 11:
                if(this.engine.lifesManager.lifesCount < 2) {
                    item.setTypeToLife();
                } else {
                    item.setTypeToGunter();
                }
                break;
        }

        this.pickups.push(item);

        item.position.x = Math2.random(100, gameWidth - 100);
        item.position.y = -100;
    }
};

GAME.PickupManager.prototype.pickup = function(item) {
    if (!item.isPickedUp) {
        item.isPickedUp = true;
        item.pickupPosition = {
            x: item.position.x,
            y: item.position.y
        };

        item.ratio = 0;

        switch (item.id) {
            case GAME.Pickup.FLOUR:
                item.handleGood(5);
                break;

            case GAME.Pickup.EGGS:
                item.handleGood(5);
                break;

            case GAME.Pickup.MILK:
                item.handleGood(2);
                break;

            case GAME.Pickup.BACON:
                item.handleGood(8);
                break;

            case GAME.Pickup.MINT:
                item.handleBad(1);
                break;

            case GAME.Pickup.GUNTER:
                item.handleBad(2);
                break;

            case GAME.Pickup.TRUNK:
                item.handleBad(3);
                break;

            case GAME.Pickup.LIFE:
                item.handleLife();
                break;
        }
    }
};

GAME.PickupManager.prototype.removeAll = function() {
    for (let i = 0; i < this.pickups.length; i++) {
        let currentPickup = this.pickups[i];

        this.pickupPool.returnObject(currentPickup);
        this.engine.view.actionContainer.removeChild(currentPickup);
    }

    this.pickups.length = 0;
};

GAME.PickupManager.prototype.destroyPickup = function(item) {
    for (let i = 0; i < this.pickups.length; i++) {
        if (this.pickups[i] === item) {
            this.pickups.splice(i, 1);
            this.pickupPool.returnObject(item);
            this.engine.view.actionContainer.removeChild(item);
            break;
        }
    }
};
