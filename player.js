// player.js
class Player extends Entity {
    constructor(scene, x, y) {
        // Call the parent constructor (aka inherit from Entity)
        super(scene, x, y, 'player');

        // Set up any additional configurations (specific to the Player class)
        this.sprite.setScale(0.3);
        this.sprite.setCollideWorldBounds(true);

        // Setup input handling for player movement
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.isClimbing = false;
    }

    update() {
        super.update();

        if (this.isClimbing) {
            this.handleClimbing();
        } 
        else {
            this.handlePlayerMovement();
        }
    }

    handlePlayerMovement() {
        if (this.cursors.left.isDown) {
            this.sprite.setVelocityX(-200);
        }
        else if (this.cursors.right.isDown) {
            this.sprite.setVelocityX(200);
        }
        else {
            this.sprite.setVelocityX(0);
        }

        if (this.cursors.up.isDown && this.sprite.body.checkWorldBounds()) {
            this.sprite.setVelocityY(-250);
        }
    }

    handleClimbing() {
        // Stop any horizontal movement
        //this.sprite.setVelocityX(0);

        this.scene.physics.world.colliders._active[0].active = false;

        if (this.cursors.up.isDown) {
            this.sprite.setVelocityY(-200);
        }
        else if (this.cursors.down.isDown) {
            this.sprite.setVelocityY(200);
        }
        else {
            this.sprite.setVelocityY(0);
        }

        if (!this.cursors.up.isDown && !this.cursors.down.isDown){
            this.isClimbing = false;
            this.scene.physics.world.colliders._active[0].active = true;
        }
        
    }
}
