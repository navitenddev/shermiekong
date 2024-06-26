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
        this.load.image('ladder_tall', 'assets/ladder_tall.png');
        this.load.image('jettpack', 'assets/jettpack.png');
        this.load.image('shield', 'assets/shield.png');
        this.load.image('wall', 'assets/wall.jpeg');
        this.load.image('destroy_barrel', 'assets/destroy_barrel.png');
        this.load.image('add_points', 'assets/add_points.png');
        this.load.image('barrier', 'assets/barrier.png');
    }

    create() {
        this.scoringSystem = new ScoringSystem(this);
        this.createBackground();
        this.createEntities();

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
        this.barrels.forEach(barrel => {
            barrel.update();
        });
        this.checkForJump();
    }

    checkForJump() {
        const verticalThreshold = 90;
        const horizontalThreshold = 50;
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
        this.player = new Player(this, 10, 645, 3, 200, 350);
        this.player.currentLevel = 1;
        
        this.player.body.updateFromGameObject();
        this.barrel = new Barrel(this, 750, 300);

        var floor = this.physics.add.staticGroup();
        var ladderFloor = this.physics.add.staticGroup();
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
            if(i == 3 || i == 4 || i == 5){
                ladderFloor.create(x, y, 'girder');
                x = x - 48;
                y = y - 3;
                continue;
            }
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 3rd floor
        x = 72;
        y = 567;
        for (let i = 0; i < 13; i++){
            if (i == 0 || i == 1 || i == 2){
                ladderFloor.create(x, y, 'girder');
                x = x + 48;
                y = y - 3;
                continue;
            }
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 4th floor
        x = 600;
        y = 465;
        for (let i = 0; i < 13; i++){
            if (i == 2 || i == 3 || i == 4 || i == 6 || i == 7 || i == 8){
                ladderFloor.create(x, y, 'girder');
                x = x - 48;
                y = y - 3;
                continue;
            }
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 5th floor
        x = 72;
        y = 363;
        for (let i = 0; i < 13; i++){
            if (i == 0 || i == 1 || i == 2){
                ladderFloor.create(x, y, 'girder');
                x = x + 48;
                y = y - 3;
                continue;
            }
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 6th floor
        floor.create(600, 261, 'girder');
        floor.create(552, 258, 'girder');
        ladderFloor.create(504, 255, 'girder');
        ladderFloor.create(456, 252, 'girder');
        ladderFloor.create(408, 249, 'girder');
        x = 360;
        for (let i = 0; i < 8; i++){
            floor.create(x, 249, 'girder');
            x = x - 48;
        }

        this.physics.add.collider(this.player, ladderFloor);
        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.barrel, floor);
        this.physics.add.collider(this.barrel, ladderFloor);

        this.physics.add.collider(this.player, this.barrel, this.handleCollision, null, this);

        //to prevent players being spawn killed, Shermie spawns on an elevated girder
        //and to keep the levels aesthetic, the wall is pure black so it's "invisible" and close
        //to the world bounds.
        floor.create(24, 700, 'girder');
        this.barrier = this.physics.add.sprite(0, 730,'barrier').setDepth(-1);
        this.physics.add.overlap(this.barrel, this.barrier, this.destroyBarrel, null, this);
        this.barrier.setCollideWorldBounds(true);
        //I've kept the old code here in case someone disagrees with my method
        // this.wall = this.physics.add.sprite(30, 700, 'wall').setScale(0.25);
        // this.physics.add.collider(this.player, this.wall);
        // this.physics.add.collider(this.barrel, this.wall, this.destroyBarrel, null, this);
        // this.physics.add.collider(this.wall, floor);
        // this.wall.setCollideWorldBounds(true);

        this.barrels = [];
        this.barrels.push(this.barrel);
    
        this.time.addEvent({
            delay: 5000,
            callback: () => {
                let newBarrel = new Barrel(this, 150, 150);
                this.barrels.push(newBarrel);
                this.physics.add.collider(this.player, newBarrel, this.handleCollision, null, this);
                this.physics.add.collider(newBarrel, this.barrier, this.destroyBarrel, null, this);
                //this.physics.add.collider(newBarrel, this.wall, this.destroyBarrel, null, this);
                this.physics.add.collider(newBarrel, floor);
                this.physics.add.collider(newBarrel, ladderFloor);
            },
            loop: true
        });

        var ladders = this.physics.add.staticGroup();

        let ladder = ladders.create(408, 690, 'ladder_tall').setScale(0.65);
        ladder.body.updateFromGameObject();

        ladder = ladders.create(119, 590, 'ladder_tall').setScale(0.55);
        ladder.body.updateFromGameObject();

        ladder = ladders.create(263, 463, 'ladder').setScale(0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(263, 511, 'ladder').setScale(0.6);
        ladder.body.updateFromGameObject();

        ladder = ladders.create(454, 488, 'ladder_tall').setScale(0.6);
        ladder.body.updateFromGameObject();

        ladder = ladders.create(119, 385, 'ladder_tall').setScale(0.55);
        ladder.body.updateFromGameObject();

        ladder = ladders.create(454, 285, 'ladder_tall').setScale(0.6);
        ladder.body.updateFromGameObject();

        this.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);

        // Create Shield power-up
        this.shieldPowerup = this.physics.add.sprite(250, 300, 'shield');
        this.shieldPowerup.setScale(0.5); // Adjust scale as needed
        this.physics.add.collider(this.shieldPowerup, floor);

        // Add an overlap event to detect when the player collects the Shield power-up
        this.physics.add.overlap(this.player, this.shieldPowerup, this.collectShield, null, this);

        // Create Destroy Barrel power-up
        this.destroyBarrelPowerup = this.physics.add.sprite(500, 600, 'destroy_barrel').setScale(0.5);
        this.physics.add.collider(this.destroyBarrelPowerup, floor);

        // Add an overlap event to detect when the player collects the Destroy Barrel power-up
        this.physics.add.overlap(this.player, this.destroyBarrelPowerup, this.collectDestroyBarrelPowerup, null, this);

        // Ending flag level transition
        this.flag = this.physics.add.staticSprite(50, 205, 'flag');
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);

        //points
        this.addPoints = this.physics.add.sprite(408, 690, 'add_points').setScale(0.5);
        this.addPoints.body.allowGravity = false;
        this.physics.add.collider(this.addPoints, floor);
        this.physics.add.overlap(this.player, this.addPoints, this.collectPoints, null, this);

        this.addPoints2 = this.physics.add.sprite(120, 590, 'add_points').setScale(0.5);
        this.addPoints2.body.allowGravity = false;
        this.physics.add.collider(this.addPoints2, floor);
        this.physics.add.overlap(this.player, this.addPoints2, this.collectPoints, null, this);

        this.addPoints3 = this.physics.add.sprite(263, 480, 'add_points').setScale(0.5);
        this.addPoints3.body.allowGravity = false;
        this.physics.add.collider(this.addPoints3, floor);
        this.physics.add.overlap(this.player, this.addPoints3, this.collectPoints, null, this);

        this.addPoints4 = this.physics.add.sprite(120, 380, 'add_points').setScale(0.5);
        this.addPoints4.body.allowGravity = false;
        this.physics.add.collider(this.addPoints4, floor);
        this.physics.add.overlap(this.player, this.addPoints4, this.collectPoints, null, this);

        this.addPoints5 = this.physics.add.sprite(455, 265, 'add_points').setScale(0.5);
        this.addPoints5.body.allowGravity = false;
        this.physics.add.collider(this.addPoints5, floor);
        this.physics.add.overlap(this.player, this.addPoints5, this.collectPoints, null, this);

        this.addPoints6 = this.physics.add.sprite(455, 475, 'add_points').setScale(0.5);
        this.addPoints6.body.allowGravity = false;
        this.physics.add.collider(this.addPoints6, floor);
        this.physics.add.overlap(this.player, this.addPoints6, this.collectPoints, null, this);
    }

    collectShield(player, shieldPowerup) {
        // Disable the power-up temporarily
        shieldPowerup.disableBody(true, true);
        
        // Activate shield effect for player
        player.hasShield = true;
    
        // Timer for shield duration
        this.time.delayedCall(10000, this.deactivateShield, [player], this);
        this.game.gameState.scoringSystem.awardPointsForCollectingPowerUps();
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
        this.game.gameState.scoringSystem.awardPointsForCollectingPowerUps();
        console.log('Destroy Barrel Power-up collected!');
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }
    destroyBarrel(barrel) {
        barrel.destroy();
    }
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        player.onCollision(barrel);

        // Award points for jumping on top of the barrel
        this.game.gameState.scoringSystem.awardPointsForJumpingBarrel();

    }

    nextLevel(player, flag){
        this.song.stop();
        console.log("next: " + this.player.hearts);
        this.scene.start("interlude1", { previousHearts: this.player.hearts });
        //this.scene.start("level2", { previousHearts: this.player.hearts }); kept for reference
    }

    collectPoints(player, addPoints) {
        addPoints.disableBody(true, true);
        this.game.gameState.scoringSystem.awardPointsForCollectingPoints();
    }
    
    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }
}