// level3.js
class Level3 extends Phaser.Scene {
    constructor() {
        super("level3");
    }

    preload() {
        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');
        // Level Entities
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder_green', 'assets/girder_green.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('spikes_flipped', 'assets/spikes_flipped.png');
        this.load.image('moving_platform', 'assets/moving_platform.png');
        this.load.image('score_multiplier', 'assets/score_multiplier.png');
        this.load.image('add_points', 'assets/add_points.png');
    }

    create() {
        const scoreFromLevel2 = this.game.gameState.scoringSystem.getScore();

        console.log("score: "+ scoreFromLevel2);
        // Create and associate the scoring system with the scene, passing the score
        this.scoringSystem = new ScoringSystem(this, scoreFromLevel2);

        this.createBackground();
        this.createEntities();

        this.game.gameState.scoringSystem = this.scoringSystem;
        
        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()});

        //next level flag
        this.flag = this.physics.add.staticSprite(630, 205, 'flag'); //630, 205
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);
    }

    update() {
        this.isTouchingAddPoints = false;
        this.player.handlePlayerMovement();
        this.player.onMovingPlatform = false;
        this.switchPlatformDirections();
    }

    createBackground() {
        this.add.image(400, 300, 'lvl_default_bg');
        this.song = this.sound.add("chiptune4");
        this.song.volume = 0.8;
        this.song.loop = true;
        this.song.play();
    }

    // Updates player's horizontal movement speed to match the platform
    rideOnPlatform(player, platform) {
        const playerOnPlatform = player.body.touching.down;
        if (playerOnPlatform) {
            player.onMovingPlatform = true;
            player.addedVelocity = platform.body.velocity.x;
        }
    }

    createEntities() {
        // Initialize player and floor group
        const { previousHearts } = this.scene.settings.data;
        this.player = new Player(this, 30, 670, previousHearts);
        var floor = this.physics.add.staticGroup();
        var spikes = this.physics.add.staticGroup();

        // Initialize moving platforms
        var platforms = this.physics.add.group({
            immovable: true,
            allowGravity: false
        });

        this.addPoints = this.physics.add.sprite(300, 640, 'add_points').setScale(0.5);
        this.addPoints.body.allowGravity = false;
        this.physics.add.collider(this.addPoints, floor);
        this.physics.add.overlap(this.player, this.addPoints, this.collectPoints, null, this);

        this.addPoints2 = this.physics.add.sprite(50, 500, 'add_points').setScale(0.5);
        this.addPoints2.body.allowGravity = false;
        this.physics.add.collider(this.addPoints2, floor);
        this.physics.add.overlap(this.player, this.addPoints2, this.collectPoints, null, this);

        this.addPoints3 = this.physics.add.sprite(300, 200, 'add_points').setScale(0.5);
        this.addPoints3.body.allowGravity = false;
        this.physics.add.collider(this.addPoints3, floor);
        this.physics.add.overlap(this.player, this.addPoints3, this.collectPoints, null, this);

        this.addPoints4 = this.physics.add.sprite(650, 300, 'add_points').setScale(0.5);
        this.addPoints4.body.allowGravity = false;
        this.physics.add.collider(this.addPoints4, floor);
        this.physics.add.overlap(this.player, this.addPoints4, this.collectPoints, null, this);


        // var addPoints = this.physics.add.staticGroup();
        // addPoints.create(100, 400, 'add_points').setScale(0.1);;
        // addPoints.create(500, 500, 'add_points').setScale(0.1);;

        // Bottom spikes
        var x = 24;
        for (let i = 0; i < 14; i++){
            let spike = spikes.create(x, 756, 'spikes');
            spike.type = "spikes";  // Add a custom property
            x = x + 48;
        }

        // Lowest/starting platforms
        floor.create(24, 700, 'girder_green');
        floor.create(72, 700, 'girder_green');
        this.platform1 = platforms.create(120, 700, 'moving_platform');
        this.platform2 = platforms.create(552, 700, 'moving_platform');

        // Rightmost elevator
        floor.create(600, 700, 'girder_green');
        this.platform3 = platforms.create(648, 700, 'moving_platform');

        // 2nd floor
        floor.create(600, 600, 'girder_green');
        floor.create(552, 600, 'girder_green');
        floor.create(504, 600, 'girder_green');
        this.platform4 = platforms.create(456, 600, 'moving_platform');
        this.platform5 = platforms.create(312, 600, 'moving_platform');
        floor.create(216, 600, 'girder_green');
        floor.create(264, 600, 'girder_green');
        floor.create(24, 600, 'girder_green');

        // Left platform stack
        this.platform6 = platforms.create(120, 576, 'moving_platform');
        this.platform7 = platforms.create(120, 548, 'moving_platform');
        this.platform8 = platforms.create(216, 520, 'moving_platform');
        this.platform9 = platforms.create(216, 492, 'moving_platform');

        // 3rd floor
        let spike = spikes.create(264, 490, 'spikes_flipped');
        spike.type = "spikes_flipped";
        spike = spikes.create(312, 490, 'spikes_flipped');
        spike.type = "spikes_flipped";
        spike = spikes.create(360, 490, 'spikes_flipped');
        spike.type = "spikes_flipped";
        spike = spikes.create(408, 490, 'spikes_flipped');
        spike.type = "spikes_flipped";
        spike = spikes.create(648, 490, 'spikes_flipped');
        spike.type = "spikes_flipped";

        floor.create(264, 466, 'girder_green');
        floor.create(312, 466, 'girder_green');
        floor.create(360, 466, 'girder_green');
        floor.create(408, 466, 'girder_green');
        this.platform10 = platforms.create(552, 466, 'moving_platform');
        floor.create(648, 466, 'girder_green');
        this.platform17 = platforms.create(648, 442, 'moving_platform');

        // 4th floor
        this.platform11 = platforms.create(552, 379, 'moving_platform');
        this.platform12 = platforms.create(360, 379, 'moving_platform');
        this.platform12.setVelocityX(-100);
        this.platform13 = platforms.create(168, 351, 'moving_platform');
        this.platform14 = platforms.create(360, 351, 'moving_platform');
        this.platform14.setVelocityX(100);
        this.platform15 = platforms.create(24, 379, 'moving_platform');
        floor.create(72, 379, 'girder_green');

        // Top floor
        floor.create(216, 249, 'girder_green');
        floor.create(264, 249, 'girder_green');
        this.platform16 = platforms.create(312, 249, 'moving_platform');
        floor.create(456, 249, 'girder_green');
        floor.create(504, 249, 'girder_green');
        floor.create(552, 249, 'girder_green');
        floor.create(600, 249, 'girder_green');
        floor.create(648, 249, 'girder_green');
        
          
        // Allow riding on horizontally-moving platforms
        this.physics.add.overlap(this.player, this.platform1, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform2, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform4, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform6, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform7, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform8, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform9, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform10, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform11, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform12, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform13, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform14, this.rideOnPlatform, null, this);
        this.physics.add.overlap(this.player, this.platform17, this.rideOnPlatform, null, this);

        this.physics.add.collider(this.player, floor);
        this.physics.add.collider(this.player, platforms);

        // Create Score Multiplier powerup
        this.scoreMultiplierPowerup = this.physics.add.sprite(330, 400, 'score_multiplier');;
        this.physics.add.collider(this.scoreMultiplierPowerup, floor);

        // Add an overlap event to detect when the player collects the Score Multiplier
        this.physics.add.overlap(this.player, this.scoreMultiplierPowerup, this.collectScoreMultiplier, null, this);

        this.physics.add.collider(this.player, spikes, this.handleCollisionSpikes, null, this);

    }

    collectScoreMultiplier(player, scoreMultiplier) {
        // Disable the powerup temporarily
        scoreMultiplier.disableBody(true, true);
        
        player.hasScoreMultiplier = true;

        // Timer for the powerup duration
        this.time.delayedCall(5000, this.resetPlayerScoreMultiplier, [this.player], this);
        this.game.gameState.scoringSystem.awardPointsForCollectingScoreMultiplier();
        console.log('Score Multiplier collected!');
    }

    resetPlayerScoreMultiplier(player) {
        player.hasScoreMultiplier = false;
    }

    // Determine behavior of each moving platform
    switchPlatformDirections(){
        // Platform 1 - Bottom-left
        if(this.platform1.x >= 312){
            this.platform1.setVelocityX(-50);
        }
        if(this.platform1.x <= 120){
            this.platform1.setVelocityX(50);
        }

        // Platform 2 - Bottom-right
        if(this.platform2.x >= 552){
            this.platform2.setVelocityX(-50);
        }
        if(this.platform2.x <= this.platform1.x + 48){
            this.platform2.setVelocityX(50);
        }

        // Platform 3 - Bottom-right elevator
        if(this.platform3.y >= 700){
            this.platform3.setVelocityY(-100);
        }
        if(this.platform3.y <= 514){
            this.platform3.setVelocityY(100);
        }
        if(this.platform3.body.velocity.y == 0){
            this.platform3.setVelocityY(100);
        }

        // Platform 4 - Diagonal spike elevator
        if(this.platform4.y >= 600){
            this.platform4.setVelocityY(-50);
            this.platform4.setVelocityX(-50);
        }
        if(this.platform4.y <= 514){
            this.platform4.setVelocityY(50);
            this.platform4.setVelocityX(50);
        }
        if(this.platform4.body.velocity.y == 0){
            this.platform4.x = 456;
            this.platform4.y = 600;
        }

        // Platform 5 - Vertical spike elevator
        if(this.platform5.y >= 600){
            this.platform5.setVelocityY(-30);
        }
        if(this.platform5.y <= 514){
            this.platform5.setVelocityY(30);
        }
        if(this.platform5.body.velocity.y == 0){
            this.platform5.setVelocityY(30);
        }

        // Platform 6 - Left stack bottom
        if(this.platform6.x >= 168){
            this.platform6.setVelocityX(-30);
        }
        if(this.platform6.x <= 24){
            this.platform6.setVelocityX(30);
        }
        if(this.platform6.body.velocity.x == 0){
            this.platform6.setVelocityX(30);
        }

        // Platform 7 - Left stack low-middle
        if(this.platform7.x >= 168){
            this.platform7.setVelocityX(-50);
        }
        if(this.platform7.x <= 24){
            this.platform7.setVelocityX(50);
        }
        if(this.platform7.body.velocity.x == 0){
            this.platform7.setVelocityX(50);
        }

        // Platform 8 - Left stack high-middle
        if(this.platform8.x >= 216){
            this.platform8.setVelocityX(-70);
        }
        if(this.platform8.x <= 24){
            this.platform8.setVelocityX(70);
        }
        if(this.platform8.body.velocity.x == 0){
            this.platform8.setVelocityX(70);
        }

        // Platform 9 - Left stack top
        if(this.platform9.x >= 216){
            this.platform9.setVelocityX(-90);
        }
        if(this.platform9.x <= 24){
            this.platform9.setVelocityX(90);
        }
        if(this.platform9.body.velocity.x == 0){
            this.platform9.setVelocityX(90);
        }

        // Platform 10 - Fast 3rd floor platform
        if(this.platform10.x >= 552){
            this.platform10.setVelocityX(-200);
        }
        if(this.platform10.x <= 504){
            this.platform10.setVelocityX(200);
        }

        // Platform 11 - 1st 4th floor platform
        if(this.platform11.x >= 552 && this.platform11.y >= 376){
            this.platform11.setVelocityY(0);
            this.platform11.setVelocityX(-100);
        }
        if(this.platform11.x <= 168 && this.platform11.y >= 376){
            this.platform11.setVelocityX(0);
            this.platform11.setVelocityY(-100);
        }
        if(this.platform11.x <= 168 && this.platform11.y <= 351){
            this.platform11.setVelocityY(0);
            this.platform11.setVelocityX(100);
        }
        if(this.platform11.x >= 552 && this.platform11.y <= 351){
            this.platform11.setVelocityX(0);
            this.platform11.setVelocityY(100);
        }

        // Platform 12 - 2nd 4th floor platform
        if(this.platform12.x >= 552 && this.platform12.y >= 376){
            this.platform12.setVelocityY(0);
            this.platform12.setVelocityX(-100);
        }
        if(this.platform12.x <= 168 && this.platform12.y >= 376){
            this.platform12.setVelocityX(0);
            this.platform12.setVelocityY(-100);
        }
        if(this.platform12.x <= 168 && this.platform12.y <= 351){
            this.platform12.setVelocityY(0);
            this.platform12.setVelocityX(100);
        }
        if(this.platform12.x >= 552 && this.platform12.y <= 351){
            this.platform12.setVelocityX(0);
            this.platform12.setVelocityY(100);
        }

        // Platform 13 - 3rd 4th floor platform
        if(this.platform13.x >= 552 && this.platform13.y >= 376){
            this.platform13.setVelocityY(0);
            this.platform13.setVelocityX(-100);
        }
        if(this.platform13.x <= 168 && this.platform13.y >= 376){
            this.platform13.setVelocityX(0);
            this.platform13.setVelocityY(-100);
        }
        if(this.platform13.x <= 168 && this.platform13.y <= 351){
            this.platform13.setVelocityY(0);
            this.platform13.setVelocityX(100);
        }
        if(this.platform13.x >= 552 && this.platform13.y <= 351){
            this.platform13.setVelocityX(0);
            this.platform13.setVelocityY(100);
        }

        // Platform 14 - 4th 4th floor platform
        if(this.platform14.x >= 552 && this.platform14.y >= 376){
            this.platform14.setVelocityY(0);
            this.platform14.setVelocityX(-100);
        }
        if(this.platform14.x <= 168 && this.platform14.y >= 376){
            this.platform14.setVelocityX(0);
            this.platform14.setVelocityY(-100);
        }
        if(this.platform14.x <= 168 && this.platform14.y <= 351){
            this.platform14.setVelocityY(0);
            this.platform14.setVelocityX(100);
        }
        if(this.platform14.x >= 552 && this.platform14.y <= 351){
            this.platform14.setVelocityX(0);
            this.platform14.setVelocityY(100);
        }

        // Platform 15 - Upper-left elevator
        if(this.platform15.y >= 379){
            this.platform15.setVelocityY(-500);
        }
        if(this.platform15.y <= 249){
            this.platform15.setVelocityY(100);
        }
        if(this.platform15.body.velocity == 0){
            console.log(this.platform15.velocity);
            this.platform15.setVelocityY(100);
        }
        if(this.platform15.body.velocity.y == 0){
            this.platform15.setVelocityY(100);
        }

        // Platform 16 - Top springboard
        if(this.platform16.y >= 225){
            this.platform16.setVelocityY(-500);
        }
        if(this.platform16.y <= 249){
            this.platform16.setVelocityY(100);
        }

        // Platform 17 - Top-right elevator
        if(this.platform17.x <= 650 && this.platform17.y >= 440){
            this.platform17.setVelocityX(0);
            this.platform17.setVelocityY(-100);
        }
        if(this.platform17.x <= 650 && this.platform17.y <= 346){
            this.platform17.setVelocityX(100);
            this.platform17.setVelocityY(0);
        }
        if(this.platform17.x >= 696 && this.platform17.y <= 346){
            this.platform17.setVelocityX(0);
            this.platform17.setVelocityY(100);
        }
        if(this.platform17.x >= 696 && this.platform17.y >= 440){
            this.platform17.setVelocityX(-100);
            this.platform17.setVelocityY(0);
        }
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }

    handleCollisionSpikes(player, spikes) {
        player.onCollision(spikes);
    }

    collectPoints(player, addPoints) {
        addPoints.disableBody(true, true);
        this.game.gameState.scoringSystem.awardPointsForCollectingPoints();
    }

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }

    nextLevel(player, flag){
        this.song.stop();
        this.scene.start("end", { previousHearts: this.player.hearts });
    }
}
