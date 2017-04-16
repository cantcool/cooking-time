$(document).ready(onReady);

window.scrollTo(0, 1);

const addPickupDelayStepDefault = 50;
const gameWidth = 800;
const gameHeight = 600;

let app;

let loaderView = document.getElementById('loader');
let loaderText = document.getElementById('loaderText');
let holder = document.getElementById('holder');

let isAdding = false;
let loader;

let mouseX = 0;
let mouseY = 0;
let ratio;
let offsetX = 0;
let offsetY = 0;

let loadInterval;
let hasLoaded = false;

let soundMusic;
let soundEvent;
let soundStart;
let soundGameOver;

// let soundEventVolume = 0.0;
// let soundMusicVolume = 0.0;

let soundEventVolume = 0.6;
let soundMusicVolume = 0.8;

let renderer = PIXI.autoDetectRenderer(gameWidth, gameHeight);
let stage = new PIXI.Stage();



function onReady() {
    loaderView = document.getElementById('loader');
    loaderText = document.getElementById('loaderText');
    holder = document.getElementById('holder');
    holder.appendChild(renderer.view);

    renderer.render(stage);

    document.body.scroll = 'no'; 
    loader = new PIXI.AssetLoader([ 'img/jake.json', 'img/bg.json', 'img/picks.json', 'img/life.png']);

    loader.addEventListener('loaded', function(e) {
        hasLoaded = true;
        $(loaderView).fadeOut('slow', function() {
            clearInterval(loadInterval);
            init();
        });

    });

    this.firstRun = true;

    requestAnimFrame(loaderUpdate);
    loader.load();
    $(loaderView).fadeIn();

    resize();
    window.onresize = function(e) {
        resize();
    };

    soundMusic = new Howl({
        src: 'sounds/song.mp3',
        // autoplay: true,
        loop: true,
        volume: 0
    });

    
}

function loaderUpdate() {
    if(!hasLoaded) {
        requestAnimFrame(loaderUpdate);
    }
}


function init() {
    app = new GAME.Engine();

    let view = app.view.renderer.view;
    view.style.position = 'absolute';

    holder.style.visibility = 'visible';

    soundStart = new Howl({
        src: 'sounds/presentation.mp3',
        autoplay: false,
        loop: false,
        volume: soundEventVolume
    });
    setTimeout(function() { soundStart.play(); }, 250);

    requestAnimFrame(update);

    let scope =  this;
    $(holder).mousedown(function(e) {
        e.preventDefault();
        isAdding = true;

        if(!app.gamePlaying) {
            $('.introScreen').fadeOut(300);
            soundMusic.stop();
            soundMusic.play();
            soundMusic.fade(0, soundMusicVolume, 2500);
        
            app.restart();
        }
    });

    $(holder).mouseup(function(e) {
        e.preventDefault();
        isAdding = false;
    });

    view.addEventListener('touchstart', onTouchStart, true);
    view.addEventListener('touchend', onTouchEnd, true);
    view.addEventListener('touchmove', onTouchMove, true);

    $(holder).mousemove(function(e){
        mouseX = e.clientX - offsetX;
        mouseY = e.clientY - offsetY;
    });

    firstRun = true;
    $('.introScreen').delay(100).fadeIn(300);
}

function onTouchStart(event) {
    event.preventDefault();
    isAdding = true;
    mouseX = (event.touches[0].clientX - offsetX) / ratio;
    mouseY = (event.touches[0].clientY - offsetY - 30) / ratio;

    if(!app.gamePlaying) {
        if(firstRun) {
            $('.introScreen').fadeOut(300);
        }
        app.restart();
    }
}

function onTouchEnd(event) {
    event.preventDefault();
    isAdding = false;
}

function onTouchMove(event) {
    event.preventDefault();
    mouseX = (event.touches[0].clientX - offsetX) / ratio;
    mouseY = (event.touches[0].clientY - offsetY - 30) / ratio;
}

function resize() {
    let width = $(window).width(); 
    let height = $(window).height(); 

    let ratioX = width / gameWidth;
    let ratioY = height / gameHeight;
    
    ratio = Math.min(ratioX, ratioY);
    ratio = 1;

    // let gameWidthCurrent = gameWidth * ratio;
    // let gameHeightCurrent = gameHeight * ratio;

    offsetX = $(holder).offset().left;
    offsetY = $(holder).offset().top;

}

function update() {
    GAME.time.update();

    app.mouse.x = mouseX;
    app.mouse.y = mouseY;
    app.update();

    requestAnimFrame(update);
}

