// fireball.js
class Fireball extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fireball');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Fireball class)
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false); // Disable gravity for the fireball
        // Add a property to keep track of the fireball's direction
        this.direction = -1; // -1 for left, 1 for right

        //animations
        this.fireball = this;
        this.anims.create({
            key: 'f_right',
            frames: this.anims.generateFrameNumbers('fireball', { start: 0, end: 1 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'f_left',
            frames: this.anims.generateFrameNumbers('fireball', { start: 2, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        //making the hitbox feel a bit more fair
        this.setSize(20, 24);
    }

    handleFireballMovement() {
        this.body.setVelocityX(200 * this.direction);
        this.body.setVelocityY(0);
        // Check if the fireball is touching a wall
        if (this.body.blocked.right) {
            this.direction = -1; // Change direction to left
        } else if (this.body.blocked.left) {
            this.direction = 1; // Change direction to right
        }
        if(this.direction == -1){
            this.fireball.anims.play('f_left', true);
        }
        else{
            this.fireball.anims.play('f_right', true);
        }
    }
}