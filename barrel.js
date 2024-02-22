class Barrel extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'wolf');

        this.sprite.setScale(0.05);
        this.sprite.setCollideWorldBounds(true);

        this.scene.physics.world.enable(this.sprite);
        this.sprite.body.setGravityY(300);

        // Add a property to keep track of the barrel's direction
        this.direction = -1; // -1 for left, 1 for right
    }

    update() {
        super.update();

        // Check if the barrel is touching a platform
        if (this.sprite.body.blocked.down) {
            // If it is, make it move horizontally
            this.sprite.body.setVelocityX(100 * this.direction);
        } else {
            // If it's not, make it fall down (like going down a ladder)
            this.sprite.body.setVelocityX(0);
        }

        // Check if the barrel is touching a wall
        if (this.sprite.body.blocked.right) {
            this.direction = -1; // Change direction to left
        } else if (this.sprite.body.blocked.left) {
            this.direction = 1; // Change direction to right
        }
    }   

    onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        otherEntity.destroy();
    }
}