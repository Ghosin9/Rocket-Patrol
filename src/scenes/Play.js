class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images and sprites
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("spaceship", "assets/spaceship.png");
        this.load.image("starfield", "assets/starfield.png");
        this.load.spritesheet("explosion", "assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame:9});
    }

    create(){
        //placing tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, "starfield").setOrigin(0, 0);

        //white rectangle border
        this.add.rectangle(5, 5, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 443, 630, 32, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(5, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(603, 5, 32, 455, 0xFFFFFF).setOrigin(0, 0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, "rocket").setOrigin(0, 0).setScale(0.5, 0.5);

        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, "spaceship", 0, 10).setOrigin(0, 0);

        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //animation
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0 }),
            frameRate: 30,
        });

        //score
        this.p1Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        //game over
        this.gameOver = false;

        //60 second clock timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "(Space) to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update(){
        //reset game
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        //go back to menu
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scrolling background
        this.starfield.tilePositionX -= 4;

        if(!this.gameOver) {
            //player movement
            this.p1Rocket.update();

            //spaceship movement
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();
        };

        //check collisions
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }

        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
    }

    checkCollision(rocket, ship) {
        //simple checking
        if(rocket.x < ship.x + ship.width && //checking if to left of ship border
            rocket.x + rocket.width > ship.x && //checking to the right of ship border
            rocket.y < ship.y + ship.height && //checking bellow of ship border
            rocket.height + rocket.y > ship.y) { //checking above of ship border
                return true;
            } else { 
                return false;
            }
    }

    shipExplode(ship) {
        //change transparency to 0
        ship.alpha = 0;
        //add the the animation at the location where the ship was hit
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        //play sounds and animations
        boom.anims.play("explode");
        this.sound.play("sfx_explosion");
        //move the ship back to right side and make visible
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score increases
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
    }
}