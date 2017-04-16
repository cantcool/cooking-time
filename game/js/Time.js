var Time = function() {
    this.deltaTime = 1; 
    this.lastTime = 0;
};

Time.constructor = Time;

Time.prototype.update = function() {
    let time = Date.now();
    let currentTime = time;
    let passedTime = currentTime - this.lastTime;

    if(passedTime > 100) {
        passedTime = 100;
    }

    this.DELTA_TIME = (passedTime * 0.06);

    this.lastTime = currentTime;
};

GAME.time = new Time();
