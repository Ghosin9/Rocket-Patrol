//spaceship
class Spaceship extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);

        //add object to scene
        scene.add.existing(this);

        //point value
        this.points = pointValue;
    }

    update() {
        //move left
        this.x -= game.settings.spaceshipSpeed;

        //wrap around 
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    reset() {
        this.x = game.config.width;
    }
}