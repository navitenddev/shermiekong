// player.js
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, healthManager) {
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
        this.hasJettpack = false;
        this.VelocityX = 200;
        this.VelocityY = 350;

        this.healthManager = healthManager;

        this.startingX = x;
        this.startingY = y;
    }

    playerClimbing() {
        if (this.isClimbing) {
            this.handleClimbing();
        } 
    }

    respawn() {
        this.x = this.startingX;
        this.y = this.startingY;
        this.healthManager.resetHealth();
    }

    handlePlayerMovement() {
        if(this.hasJettpack) {
            this.VelocityX = 400;
            this.VelocityY = 400;
        }
        else {
            this.VelocityX = 200;
            this.VelocityY = 350;
        }

        if (this.cursors.left.isDown) {
            this.setVelocityX(this.VelocityX * -1);
        }
        else if (this.cursors.right.isDown) {
            this.setVelocityX(this.VelocityX);
        }
        else {
            this.VelocityX = 0;
            this.setVelocityX(this.VelocityX);
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(this.VelocityY * -1);

        }
    }

    onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        //this.sprite.destroy();
        if (this.healthManager) {
            this.healthManager.loseHealth();
        }
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
    /*onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        this.sprite.destroy();
    }*/

    update() {
        if (this.healthManager && this.healthManager.health <= 0) {
            // Player has no more lives, perform game over logic or reset the level
            this.respawn();
        }
    }    
}