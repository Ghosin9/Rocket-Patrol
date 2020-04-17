class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload(){
        //load images and sprites
        this.load.image("rocket", "assets/rocket.png");
        this.load.image("rocket2", "assets/rocket2.png");
        this.load.image("spaceship", "assets/nathan1.png");
        this.load.image("starfield", "assets/clouds.png");
        this.load.image("spaceship2", "assets/elizabeth1.png");
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
        this.p1Rocket = new Rocket(this, game.config.width/4, 431, "rocket").setOrigin(0, 0).setScale(0.5, 0.5);
        this.p2Rocket = new Rocket(this, game.config.width*3/4, 431, "rocket2").setOrigin(0, 0).setScale(0.5, 0.5);

        //add spaceships x3
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, "spaceship", 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, "spaceship", 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, "spaceship", 0, 10).setOrigin(0, 0);
        this.specialShip = new Spaceship(this, game.config.width, 320, "spaceship2", 0, 50).setOrigin(0 ,0);

        //define keyboard keys
        //p1
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.p1Rocket.fire = keyF;
        this.p1Rocket.left = keyLEFT;
        this.p1Rocket.right = keyRIGHT;

        //p2
        keyF2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ZERO);
        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        this.p2Rocket.fire = keyF2;
        this.p2Rocket.left = keyLEFT2;
        this.p2Rocket.right = keyRIGHT2;

        //animation
        this.anims.create({
            key: "explode",
            frames: this.anims.generateFrameNumbers("explosion", {start: 0, end: 9, first: 0 }),
            frameRate: 30,
        });

        //score
        this.p1Score = 0;
        this.p2Score = 0;

        //score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#0000FF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);
        scoreConfig.color = "#FF0000";
        this.scoreRight = this.add.text(471, 54, this.p2Score, scoreConfig);

        //game over
        this.gameOver = false;

        //60 second clock timer
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, "GAME OVER", scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, "Fire to Restart or ← for Menu", scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);

        //timer
        scoreConfig.color = "#843605";
        this.timer = this.add.text(game.config.width/2, 72, this.clock.getElapsedSeconds(), scoreConfig).setOrigin(0.5);

        //array of ships
        this.ships = [this.ship01, this.ship02, this.ship03, this.specialShip];
    }

    update(){
        //reset game
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyF) || Phaser.Input.Keyboard.JustDown(keyF2))) {
            this.scene.restart(this.p1Score);
        }
        //go back to menu
        if (this.gameOver && (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyLEFT2))) {
            this.scene.start("menuScene");
        }

        //scrolling background
        this.starfield.tilePositionX -= 2;

        if(!this.gameOver) {
            //player movement
            this.p1Rocket.update();
            this.p2Rocket.update();

            //spaceship movement
            for(let ship of this.ships) {
                ship.update();
            }
        };

        //check collisions
        for(let ship of this.ships) {
            //p1
            if(this.checkCollision(this.p1Rocket, ship)){
                this.p1Rocket.reset();
                this.shipExplode(ship, "p1");
            }
            //p2
            if(this.checkCollision(this.p2Rocket, ship)){
                this.p2Rocket.reset();
                this.shipExplode(ship, "p2");
            }
        }
        
        //update timer
        this.timer.text = (game.settings.gameTimer / 1000) - Math.floor(this.clock.getElapsedSeconds());

        //check collisions
        // if(this.checkCollision(this.p1Rocket, this.ship01)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship01);
        // }

        // if(this.checkCollision(this.p1Rocket, this.ship02)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship02);
        // }

        // if(this.checkCollision(this.p1Rocket, this.ship03)) {
        //     this.p1Rocket.reset();
        //     this.shipExplode(this.ship03);
        // }
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

    shipExplode(ship, p) {
        //change transparency to 0
        ship.alpha = 0;
        //add the the animation at the location where the ship was hit
        let boom = this.add.sprite(ship.x, ship.y, "explosion").setOrigin(0, 0);
        //play animation
        boom.anims.play("explode");

        //if hit elizabeth
        if(ship.points == 50)
            this.sound.play("sfx_oh");
        else {
            //play random sound if hitting a nathan
            let explosion = Math.floor(Math.random() * 5);
            if(explosion == 0)
                this.sound.play('sfx_e1');
            else if (explosion == 1)
                this.sound.play('sfx_e2');
            else if (explosion == 2)
                this.sound.play('sfx_e3');
            else if (explosion == 3)
                this.sound.play('sfx_e4');
            else if (explosion == 4)
                this.sound.play("sfx_e5");
        }
        //move the ship back to right side and make visible
        boom.on("animationcomplete", () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });

        //score increases
        if(p == "p1") {
            this.p1Score += ship.points;
            this.scoreLeft.text = this.p1Score;
        }
        else { //p == "p2"
            this.p2Score += ship.points;
            this.scoreRight.text = this.p2Score;
        }
    }
}