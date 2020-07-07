var ball;

var database, position;

var playercount = 0, gamestate = 0, form, player, game;
var allPlayers;

var car1, car2, car3, car4, cars;
var car1Anim, car2Anim, car3Anim, car4Anim, track;
var backgroundImg = "white";
var bg;

function preload() {
    car1Anim = loadImage("sprites/car1.png");
    car2Anim = loadImage("sprites/car2.png");
    car3Anim = loadImage("sprites/car3.png");
    car4Anim = loadImage("sprites/car4.png");
    track = loadImage("sprites/track.jpg")
    
}


function setup(){
    createCanvas(displayWidth - 50,displayHeight - 150);

    database = firebase.database();

    game = new Game();
    game.getState();
    game.start();
}

function draw(){
    background("white");

    if (playercount === 4) {
        game.update(1);
    }

    if (gamestate === 1) {
        clear();
        game.play();
    }

    if (gamestate === 2) {
        game.endState();
    }
    drawSprites();
}
