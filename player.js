// player.js
class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        // Set up any additional configurations (specific to the Player class)
        this.setScale(0.35);
        this.setCollideWorldBounds(true);
        this.body.setGravityY(300);
        // Setup input handling for player movement
        this.cursors = scene.input.keyboard.createCursorKeys();
        this.isClimbing = false;
        this.hasJettpack = false;
        this.VelocityX = 200;
        this.VelocityY = 350;
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
            this.facing = true; //take true = was last walking left and false = was last walking right
            this.setVelocityX(this.VelocityX * -1);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.facing = false;
            this.setVelocityX(this.VelocityX);
            this.player.anims.play('right', true);
        }
        else {
            this.VelocityX = 0;
            this.setVelocityX(this.VelocityX);
            if(this.facing){
                this.player.anims.play('faceLeft');
            }
            else{
                this.player.anims.play('faceRight');
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