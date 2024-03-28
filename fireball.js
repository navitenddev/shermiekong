// fireball.js
class Fireball extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'fireball');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Fireball class)
        this.setScale(0.02);
        this.setCollideWorldBounds(true);
        this.body.setAllowGravity(false); // Disable gravity for the fireball
        // Add a property to keep track of the fireball's direction
        this.direction = -1; // -1 for left, 1 for right
    }

    handleFireballMovement() {
        this.body.setVelocityX(200 * this.direction);
        // Check if the fireball is touching a wall
        if (this.body.blocked.right) {
            this.direction = -1; // Change direction to left
        } else if (this.body.blocked.left) {
            this.direction = 1; // Change direction to right
        }
    }

    onCollision(otherEntity) {
        if (otherEntity instanceof Player) {
            // Player hit by fireball, destroy player
            otherEntity.destroy();
        }
    }
}