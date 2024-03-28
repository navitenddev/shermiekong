// level1.js
class Level1 extends Phaser.Scene {
    constructor() {
        super("level1");
    }

    preload() {
        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');
        // Level Entities
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder', 'assets/girder.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('fireball', 'assets/fireball.png');
        this.load.spritesheet('fireball', 'assets/fireball.png',
        { frameWidth: 32, frameHeight: 24 });
        this.load.image('jettpack', 'assets/jettpack.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('destroy_barrel', 'assets/destroy_barrel.png');
    }

    create() {
        this.scoringSystem = new ScoringSystem(this);
        this.createBackground();
        this.createEntities();
        
        // Set up collision between player and the barrel
        this.physics.add.collider(this.player, this.barrel, this.handleCollision, null, this);

        // Set up collision between player and the fireball
        this.physics.add.collider(this.player, this.fireball, this.handleCollision, null, this);

        
        this.song = this.sound.add("chiptune1");
        this.song.loop = true;
        this.song.volume = 0.8;
        this.song.play();

        // Access the scoring system from the Game class
        this.game.gameState.scoringSystem = this.scoringSystem;

        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()});
    }

    update() {
        this.player.handlePlayerMovement();
        this.barrel.update();
        this.fireball.update();
        if (this.player.isClimbing) {
            this.game.gameState.scoringSystem.awardPointsForClimbingLadder();
        }
        this.checkForJump();
    }

    checkForJump() {
        const verticalThreshold = 90;
        const horizontalThreshold = 50;
        // console.log("x: " + this.player.x);
        // console.log("y: " + this.player.y);
        // console.log("x2: " + this.barrel.x);
        // console.log("y2: " + this.barrel.y);
        if (this.player.cursors.up.isDown) {
            if (
                Math.abs(this.player.y - this.barrel.y) <= verticalThreshold &&
                Math.abs(this.player.x - this.barrel.x) <= horizontalThreshold
            ) {
                // Increase points for jumping over the barrel
                this.game.gameState.scoringSystem.awardPointsForJumpingBarrel();
            }
        }
    }

    createBackground() {
        this.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this, 100, 700, 3, 200, 350);
        this.barrel = new Barrel(this, 750, 400);
        this.fireball = new Fireball(this, 750, 300);

        var floor = this.physics.add.staticGroup();
        // 1st floor
        var x = 24;
        for (let i = 0; i < 7; i++){
            floor.create(x, 756, 'girder');
            x = x + 48
        }
        x = 360;
        var y = 753;
        for (let i = 0; i < 7; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 2nd floor
        x = 600;
        y = 669;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 3rd floor
        x = 72;
        y = 567;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 4th floor
        x = 600;
        y = 465;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 5th floor
        x = 72;
        y = 363;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 6th floor
        floor.create(600, 261, 'girder');
        floor.create(552, 258, 'girder');
        floor.create(504, 255, 'girder');
        floor.create(456, 252, 'girder');
        x = 408;
        for (let i = 0; i < 9; i++){
            floor.create(x, 249, 'girder');
            x = x - 48;
        }

        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.barrel, floor);

        var ladders = this.physics.add.staticGroup();
        ladders.create(425, 700, 'ladder');
        ladders.create(225, 485, 'ladder');
        this.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);

        // Create Shield power-up
        this.shieldPowerup = this.physics.add.sprite(250, 300, 'shield');
        this.shieldPowerup.setScale(0.15); // Adjust scale as needed
        this.physics.add.collider(this.shieldPowerup, floor);

        // Add an overlap event to detect when the player collects the Shield power-up
        this.physics.add.overlap(this.player, this.shieldPowerup, this.collectShield, null, this);

        // Create Destroy Barrel power-up
        this.destroyBarrelPowerup = this.physics.add.sprite(500, 600, 'destroy_barrel');
        this.physics.add.collider(this.destroyBarrelPowerup, floor);

        // Add an overlap event to detect when the player collects the Destroy Barrel power-up
        this.physics.add.overlap(this.player, this.destroyBarrelPowerup, this.collectDestroyBarrelPowerup, null, this);

        // Ending flag level transition
        this.flag = this.physics.add.staticSprite(50, 205, 'flag');
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
    }

    collectShield(player, shield) {
        // Disable the power-up temporarily
        shield.disableBody(true, true);
        
        // Activate shield effect for player
        player.hasShield = true;
    
        // Timer for shield duration
        this.time.delayedCall(30000, this.deactivateShield, [player], this);
        console.log('Shield collected!');
    }

    deactivateShield(player) {
        player.hasShield = false;
        console.log('Shield deactivated!');
    }

    collectDestroyBarrelPowerup(player, destroyBarrelPowerup) {
        // Disable the power-up temporarily
        destroyBarrelPowerup.disableBody(true, true);
        
        // Activate effect for destroying barrels
        player.hasDestroyBarrelPowerup = true;
        console.log('Destroy Barrel Power-up collected!');
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }
    
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        barrel.onCollision(player);
        player.onCollision(barrel);

        
        // Award points for jumping on top of the barrel
        this.game.gameState.scoringSystem.awardPointsForJumpingBarrel();
        
        //this.fireball.onCollision(player);

        //this.fireball.onCollision(player);
        if (barrel.isDestroyed()) {
            this.fireball.onCollision(player);
        }

    }

    nextLevel(player, flag){
        this.song.stop();
        console.log("next: " + this.player.hearts);
        this.scene.start("interlude1", { previousHearts: this.player.hearts });
        //this.scene.start("level2", { previousHearts: this.player.hearts }); kept for reference
    }

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }
}