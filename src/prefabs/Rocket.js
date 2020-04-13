//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);

        //rocket firing status
        this.isFiring = false;
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(keyLEFT.isDown && this.x >= 47) {
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 578) {
                this.x += 2;
            }
        }

        //firing
        if(Phaser.Input.Keyboard.JustDown(keyF)) {
            this.isFiring = true;
        }

        //if fired move up
        if(this.isFiring && this.y >= 108) {
            this.y -= 2;
        }

        //reset once hit top of screen
        if(this.y <= 108) {
            this.isFiring = false;
            this.y = 431;
        }
    }
}