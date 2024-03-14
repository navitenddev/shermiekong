// barrel.js
class Barrel extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'barrel');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Barrel class)
        this.setScale(0.05);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        // Add a property to keep track of the barrel's direction
        this.direction = -1; // -1 for left, 1 for right

        //animations
        this.barrel = this;
        this.anims.create({
            key: 'rollLeft',
            frames: this.anims.generateFrameNumbers('barrel', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'rollRight',
            frames: this.anims.generateFrameNumbers('barrel', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
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
        if(this.direction == -1){
            this.barrel.anims.play('rollLeft', true);
        }
        else{
            this.barrel.anims.play('rollRight', true);
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