// barrel.js
class Barrel extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Barrel class)
        this.setScale(0.05);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        // Add a property to keep track of the barrel's direction
        this.direction = -1; // -1 for left, 1 for right
    }

    update() {
        if (this.body.blocked.down) {
            // If it is, make it move horizontally
            this.handleHorizontalMovement();
        } else {
            // If it's not, make it fall down (like going down a ladder)
            this.handleFalling();
        }
    }

    handleHorizontalMovement() {
        this.body.setVelocityX(100 * this.direction);
        // Check if the barrel is touching a wall
        if (this.body.blocked.right) {
            this.direction = -1; // Change direction to left
        } else if (this.body.blocked.left) {
            this.direction = 1; // Change direction to right
        }
    }

    handleFalling() {
        this.body.setVelocityX(0);
    }

    onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        otherEntity.destroy();
    }
}