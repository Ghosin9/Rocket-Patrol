//rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);

        //rocket firing status
        this.isFiring = false;

        //sound effect
        this.sfxRocket = scene.sound.add("sfx_rocket");

        //key commands
        this.fire;
        this.left;
        this.right;
    }

    update() {
        //left/right movement
        if(!this.isFiring) {
            if(this.left.isDown && this.x >= 47) {
                this.x -= 2;
            } else if (this.right.isDown && this.x <= 578) {
                this.x += 2;
            }
        }

        //firing
        if(Phaser.Input.Keyboard.JustDown(this.fire) && !this.isFiring) {
            this.isFiring = true;
            this.sfxRocket.play();
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

    //reset rocket back to be shot
    reset() {
        this.isFiring = false;
        this.y = 431;
    }
}