// player.js
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, initialHearts) {
        super(scene, x, y, 'player');
        this.scene = scene;  // Store the scene reference
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.25);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.isClimbing = false;
        this.hasJettpack = false;
        this.hasShield = false;
        this.hasDestroyBarrelPowerup = false;
        this.VelocityX = 200;
        this.VelocityY = 350;

        this.gameOver = false; // Added game-over flag
        this.hearts = initialHearts || 3; // Default to 3 hearts if no value provided
        this.createHearts(scene);
    }

    createHearts(scene) {
        // Display hearts on the top left of the screen
        this.heartsArray = [];
        const heartSpacing = 40;
        for (let i = 0; i < this.hearts; i++) {
            let heart = scene.add.image(20 + i * heartSpacing, 20, 'heart').setOrigin(0, 0);
            heart.setScrollFactor(0);  // Make sure hearts stay in place when the camera moves
            heart.setScale(0.8);
            heart.setDisplaySize(50, 50); 
            this.heartsArray.push(heart);
        }
    }

    updateHearts() {
        // Update the displayed hearts based on the player's health
        for (let i = 0; i < this.heartsArray.length; i++) {
            this.heartsArray[i].visible = i < this.hearts;
        }
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
        //console.log('Player hit by a barrel!');
        if (otherEntity instanceof Barrel) {
            if(!this.hasDestroyBarrelPowerup)
            {
                console.log('Player does not have destroy power-up');
                if(!this.hasShield){
                    this.hearts--; // Decrease player's health when colliding with a barrel
                    this.updateHearts();
            
                    if (this.hearts <= 0) {
                        // Player is out of hearts, handle game over logic
                        this.handleGameOver();
                    } else {
                        // Player still has hearts, reset to starting position
                        this.resetPlayerPosition();
                    }
                }
            }
            else{
                console.log('Player has destroy power-up');
                otherEntity.destroy();
                this.hasDestroyBarrelPowerup = false;
                //this.scene.game.gameState.scoringSystem.awardPointsForDestroyingBarrel();
            }
        }
    }
    
    handleGameOver() {
        // Stop the current scene (this stops updates and rendering)
        this.scene.scene.stop();
    
        // Display a game-over message or screen
        console.log('Game Over');
        this.showGameOverMessage();
    }
    
    showGameOverMessage() {
        const gameOverText = this.scene.add.text(200, 200, 'Game Over', { fontSize: '32px', fill: '#fff' });
        // Add any additional game-over message or screen logic here

        // Doesnt work as of now!
        this.scene.input.keyboard.once('keydown', (event) => {
            this.scene.scene.restart(); // Restart the scene when a key is pressed
        });
    }
    
    
    resetPlayerPosition() {
        // Customize this method to reset the player to the starting position
        // For example, set the player's position to the initial coordinates
        this.x = 100;
        this.y = 700;
        
        // Additional reset logic, if needed
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