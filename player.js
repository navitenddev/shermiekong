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
        this.hasJettpack = false;
        this.addedVelocity = 0;
        this.VelocityX = 200;
        this.VelocityY = 350;
    }

    playerClimbing() {
        if (this.isClimbing) {
            this.handleClimbing();
        } 
    }

    handlePlayerMovement() {
        if(this.hasJettpack) {
            this.VelocityX = 400;
            this.VelocityY = 400;
        }
        else {
            this.VelocityX = 120;
            this.VelocityY = 230;
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

            // If player is on moving platform, add platform's velocity
            if(this.onMovingPlatform) {
                this.setVelocityX(this.VelocityX + this.addedVelocity);
            }
            // If else, set player velocity to 0
            else{
                this.VelocityX = 0;
                this.setVelocityX(this.VelocityX);
            }
        }

        if (this.cursors.up.isDown && this.body.blocked.down) {
            this.setVelocityY(this.VelocityY * -1);

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
    /*onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
        this.sprite.destroy();
    }*/
}