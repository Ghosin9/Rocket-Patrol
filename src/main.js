// Ly Phung
// 4/13/20
// lynphung@ucsc.edu
// CMPM 120
// Mods added:
// Implement a simultaneous two-player mode (50)
// Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (25)
// Display the time remaining (in seconds) on the screen (15)
// Create 4 new explosion SFX and randomize which one plays on impact (15)
// Create a new scrolling tile sprite for the background (10)
// TO BE ADDED --------------------------------------------------------------------------------------------------------
// Add your own (copyright-free) background music to the Play scene (10)
// Track a high score that persists across scenes and display it in the UI (10)
// Create your own mod and justify its score (🤷🏻‍♂️) (text display on hit with +score)

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
//p1
let keyF, keyLEFT, keyRIGHT;
//p2
let keyF2, keyLEFT2, keyRIGHT2;