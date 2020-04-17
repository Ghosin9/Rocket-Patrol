class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio
        this.load.audio("sfx_select", "assets/blip_select12.wav");
        this.load.audio("sfx_e1", "assets/ass.mp3");
        this.load.audio("sfx_e2", "assets/fucked_up.mp3");
        this.load.audio("sfx_e3", "assets/javaShrek.mp3");
        this.load.audio("sfx_e4", "assets/senpai.mp3");
        this.load.audio("sfx_e5", "assets/shit.mp3");
        this.load.audio("sfx_oh", "assets/ohmagosh.mp3");
        this.load.audio("sfx_rocket", "assets/yea.mp3");
    }

    create(){
        //menu display
        let menuConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0,
        }
        
        //show menu text
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //Use ←→ arrows to move & (Space) to Fire
        //adding menu text
        this.add.text(centerX, centerY - textSpacer*3, "120 PATROL", menuConfig).setOrigin(0.5);
        menuConfig.color = "#0000FF";
        this.add.text(centerX, centerY - textSpacer*2, "Player 1: Use AD to move", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY - textSpacer, '& (Space) to Fire', menuConfig).setOrigin(0.5);

        menuConfig.color = "#FF0000";
        this.add.text(centerX, centerY, "Player 2: Use ←→ arrows to move", menuConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + textSpacer, '& (NUMPAD 0) to Fire', menuConfig).setOrigin(0.5);

        menuConfig.backgroundColor = '#00FF00';
        menuConfig.color = '#000';
        this.add.text(centerX, centerY + textSpacer*2, 'Press ← for Easy or → for Hard', menuConfig).setOrigin(0.5);

        //defining keyboard inputs for menu selection
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        keyLEFT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update() {
        //if left, easy mode
        if (Phaser.Input.Keyboard.JustDown(keyLEFT) || Phaser.Input.Keyboard.JustDown(keyLEFT2)) {
            // easy mode
            game.settings = {
                spaceshipSpeed: 3,
                gameTimer: 60000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");
        }
        //if right, hard mode
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT) || Phaser.Input.Keyboard.JustDown(keyRIGHT2)) {
            // hard mode
            game.settings = {
                spaceshipSpeed: 4,
                gameTimer: 45000    
            }
            this.sound.play('sfx_select');
            this.scene.start("playScene");    
        }
    }
}