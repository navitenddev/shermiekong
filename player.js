// player.js
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, initialHearts = 3, speedX = 120, speedY = 230) {
        super(scene, x, y, 'player');
        this.scene = scene;  // Store the scene reference
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Player class)
        this.setScale(0.35);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.isClimbing = false;
        this.hasJettpack = false;
        this.addedVelocity = 0;
        this.conveyorVelocity = 0;
        this.hasShield = false;
        this.hasScoreMultiplier = false;
        this.hasDestroyBarrelPowerup = false;
        this.defaultSpeedX = speedX;
        this.defaultSpeedY = speedY;
        this.VelocityX = speedX;
        this.VelocityY = speedY;
        this.player = this;
        this.facing = true;
        //animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'faceLeft',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'faceRight',
            frames: [ { key: 'player', frame: 3 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });

        this.gameOver = false; // Added game-over flag
        this.hearts = initialHearts; // Default to 3 hearts if no value provided
        this.createHearts(scene);

        //hitbox alteration (box of size x, y)
        this.setSize(120, 60).setOffset(0, 20);
    }

    createHearts(scene) {
        // Display hearts on the top left of the screen
        this.heartsArray = [];
        const heartSpacing = 40;
        for (let i = 0; i < this.hearts; i++) {
            let heart;
            if(i < 3){
                heart = scene.add.image(20 + i * heartSpacing, 20, 'heart').setOrigin(0, 0);
            }
            else{
                heart = scene.add.image(20 + (i-3) * heartSpacing, 55, 'heart').setOrigin(0, 0);
            }
            
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

    loseHearts() {
        this.hearts--;
        this.updateHearts();
    }
    
    playerClimbing() {
        if (this.isClimbing) {
            this.handleClimbing();
        } 
    }

    handlePlayerMovement() {
        // Check if the player is not touching the ladder
        if (!this.body.touching.up && this.isClimbing) {
            this.isClimbing = false;
            this.scene.physics.world.colliders._active[0].active = true;
        }

        // Check if the player is above the ladder and wants to climb down
        if (this.body.touching.down && !this.isClimbing && this.cursors.down.isDown) {
            this.isClimbing = true;
            this.scene.physics.world.colliders._active[0].active = false;
        }
        
        if(this.hasJettpack) {
            this.VelocityX = 400;
            this.VelocityY = 400;
        }
        else {
            this.VelocityX = this.defaultSpeedX; //120
            this.VelocityY = this.defaultSpeedY; //230
        }

        if (this.cursors.left.isDown) {
            this.facing = true; //take true = was last walking left and false = was last walking right
            this.setVelocityX(this.VelocityX * -1 + this.conveyorVelocity);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.facing = false;
            this.setVelocityX(this.VelocityX + this.conveyorVelocity);
            this.player.anims.play('right', true);
        }
        else {
            this.VelocityX = 0;
            this.setVelocityX(this.VelocityX);

            // If player is on moving platform, add platform's velocity
            if(this.onMovingPlatform) {
                this.setVelocityX(this.VelocityX + this.addedVelocity);
            }
            // If else, set player velocity to 0 or conveyor belt velocity
            else{
                this.VelocityX = 0;
                this.setVelocityX(this.VelocityX + this.conveyorVelocity);
            }
            if(this.facing){
                this.player.anims.play('faceLeft');
            }
            else{
                this.player.anims.play('faceRight');
            }
        }

        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.body.blocked.down) {
            this.setVelocityY(this.VelocityY * -1);

        }
    }

    onCollision(otherEntity) {
        if (otherEntity instanceof Barrel) {
            if(!this.hasDestroyBarrelPowerup)
            {
                console.log('Player does not have destroy power-up');
                if(!this.hasShield){
                    this.player.loseHearts(); // Decrease player's health when colliding with a barrel
                    this.updateHearts();
            
                    if (this.hearts <= 0) {
                        // Player is out of hearts, handle game over logic
                        this.handleGameOver();
                    } else {
                        otherEntity.destroy();
                        // Player still has hearts, reset to starting position
                        this.resetPlayerPosition(this.currentLevel);
                    }
                }
            }
            else{
                console.log('Player has destroy power-up');
                otherEntity.destroy();
                this.hasDestroyBarrelPowerup = false;
                this.scene.game.gameState.scoringSystem.awardPointsForDestroyingBarrel();
            }
        }
        else if (otherEntity.type == "spikes") {
            if (this.body.touching.down) {
                // Player is above the spike, handle collision
                this.loseHearts();
                this.resetPlayerPosition(this.currentLevel);
                if (this.hearts == 0) {
                    this.handleGameOver();
                }
            }
        }
        else if (otherEntity.type == "spikes_flipped") {
            if (this.body.touching.up) {
                // Player is above the spike, handle collision
                this.loseHearts();
                this.resetPlayerPosition(this.currentLevel);
                if (this.hearts == 0) {
                    this.handleGameOver();
                }
            }
        }
        else if (otherEntity.type == "fireball") {
            this.resetPlayerPosition(this.currentLevel);
            this.loseHearts();
            if (this.hearts == 0) {
                this.handleGameOver();
            }
        }
    }
    
    handleGameOver() {
        console.log('Game Over');
        this.scene.song.stop();
        this.scene.scene.start('GameOver');
    }
    
    resetPlayerPosition(level) {
        // Customize this method to reset the player to the starting position
        // Set the player's position to different coordinates based on the level
        console.log(level);
        switch(level) {
            case 1:
            //this spawns Shermie on a safe platform
                this.player.x = 10;
                this.player.y = 645;
            //this spawn point was used when there was a visible wall to break barrels
            //on the bottom floor
                // this.player.x = 100;
                // this.player.y = 700;
                break;
            case 2:
                this.player.x = 80;
                this.player.y = 620;
                break;
            case 3:
                this.player.x = 30;
                this.player.y = 670;
                break;
            case 4:
                this.player.x = 30;
                this.player.y = 724;
                break;
            // Add more cases as needed
            default:
                this.player.x = 30;
                this.player.y = 670;
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
            this.setVelocityY(-13);
        }

        if (!this.cursors.up.isDown && !this.cursors.down.isDown){
            this.isClimbing = false;
            this.scene.physics.world.colliders._active[0].active = true;
        }
    }
}