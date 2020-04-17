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
        if(this.points == 50)
            this.x -= 7;
        else
            this.x -= game.settings.spaceshipSpeed;

        //wrap around 
        if(this.x <= 0 - this.width) {
            this.x = game.config.width;
        }
    }

    //resets the spaceship when shot
    reset() {
        this.x = game.config.width;
    }
}