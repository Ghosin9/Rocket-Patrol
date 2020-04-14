// Ly Phung
// 4/13/20
// lynphung@ucsc.edu
// CMPM 120

//default window settings
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
};

//game object
let game = new Phaser.Game(config);

// default game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000,
}

//keyboard variables
let keyF, keyLEFT, keyRIGHT;