// player.js
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Player class)
        this.setScale(0.25);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        // Setup input handling for player movement
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.isClimbing = false;
    }

    playerClimbing() {
        if (this.isClimbing) {
            this.handleClimbing();
        } 
        else {
            this.handlePlayerMovement();
        }
    }

    handlePlayerMovement() {
        if (this.cursors.left.isDown) {
            this.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(200);
        }
        else {
            this.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(-350);
        }
    }

    onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        this.sprite.destroy();
    }
  
    handleClimbing() {
        // Stop any horizontal movement
        //this.sprite.setVelocityX(0);

        this.scene.physics.world.colliders._active[0].active = false;

        if (this.cursors.up.isDown) {
            this.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown) {
            this.setVelocityY(200);
        }
        else {
            this.setVelocityY(0);
        }

        if (!this.cursors.up.isDown && !this.cursors.down.isDown){
            this.isClimbing = false;
            this.scene.physics.world.colliders._active[0].active = true;
        }
    }
}
