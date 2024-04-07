// level4.js
class Level4 extends Phaser.Scene {
    constructor() {
        super("level4");
    }

    preload() {
        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');
        // Level Entities
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder_purple', 'assets/girder_purple.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('spikes_flipped', 'assets/spikes_flipped.png');
        this.load.image('add_points', 'assets/add_points.png');
        this.load.image('score_multiplier', 'assets/score_multiplier.png');
        this.load.image('jettpack', 'assets/jettpack.png');
        this.load.image('conveyor_left', 'assets/conveyor_left.png');
        this.load.image('conveyor_right', 'assets/conveyor_right.png');
        this.load.spritesheet('conveyor_left_sheet', 'assets/conveyor_left_sheet.png',
        {frameWidth: 50, frameHeight: 24});
        this.load.spritesheet('conveyor_right_sheet', 'assets/conveyor_right_sheet.png', 
        {frameWidth: 50, frameHeight: 24});
        this.load.image('heart', 'assets/heart.png');
        this.load.spritesheet('fireball', 'assets/fireball.png',
        { frameWidth: 32, frameHeight: 24 });
    }

    create() {
        //animations
        this.anims.create({
            key: 'conveyor_left',
            frames: this.anims.generateFrameNumbers('conveyor_left_sheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'conveyor_right',
            frames: this.anims.generateFrameNumbers('conveyor_right_sheet', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        const scoreFromLevel3 = this.game.gameState.scoringSystem.getScore();

        console.log("score: "+ scoreFromLevel3);
        // Create and associate the scoring system with the scene, passing the score
        this.scoringSystem = new ScoringSystem(this, scoreFromLevel3);

        this.createBackground();
        this.createEntities();

        this.game.gameState.scoringSystem = this.scoringSystem;
        
        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()});
    }

    update() {
        this.player.handlePlayerMovement();
        this.fireball.handleFireballMovement();
        this.fireball2.handleFireballMovement();
        this.player.onLeftConveyor = false;
        this.player.onRightConveyor = false;
        this.player.conveyorVelocity = 0;
    }

    createBackground() {
        this.add.image(400, 300, 'lvl_default_bg');
        this.song = this.sound.add("chiptune5");
        this.song.loop = true;
        this.song.play();
    }

    // Updates player's horizontal movement speed to match the platform
    rideOnLeftConveyor(player, conveyor) {
        const playerOnLeftConveyor = player.body.touching.down;
        if (playerOnLeftConveyor) {
            player.conveyorVelocity = -75;
        }
    }
    rideOnRightConveyor(player, conveyor) {
        const playerOnRightConveyor = player.body.touching.down;
        if (playerOnRightConveyor) {
            player.conveyorVelocity = 75;
        }
    }

    createEntities() {
        // Initialize player and floor group
        this.player = new Player(this, 30, 724);
        this.player.currentLevel = 4;
        var floor = this.physics.add.staticGroup();
        var ladderFloor = this.physics.add.staticGroup();
        var spikes = this.physics.add.staticGroup();

        // Initialize conveyor belts
        var conveyors = this.physics.add.staticGroup({
            immovable: true,
            allowGravity: false
        });

        this.fireball = new Fireball(this, 750, 484).setScale(0.7);
        this.fireball2 = new Fireball(this, 750, 400).setScale(0.7);
        this.fireball.type = "fireball";
        this.fireball2.type = "fireball";

        // 1st floor
        floor.create(24, 756, 'girder_purple');
        floor.create(72, 756, 'girder_purple');
        this.conveyor1 = conveyors.create(120, 755, 'conveyor_left');
        
        floor.create(168, 756, 'girder_purple');
        this.conveyor2 = conveyors.create(216, 755, 'conveyor_right');
        floor.create(264, 756, 'girder_purple');
        floor.create(312, 756, 'girder_purple');
        this.conveyor3 = conveyors.create(360, 755, 'conveyor_right');
        this.conveyor4 = conveyors.create(408, 755, 'conveyor_right');
        let spike = spikes.create(456, 756, 'spikes');
        let spike2 = spikes.create(504, 756, 'spikes');
        spike.type = "spikes";
        spike2.type = "spikes";
        this.conveyor5 = conveyors.create(552, 755, 'conveyor_left');
        this.conveyor6 = conveyors.create(600, 755, 'conveyor_left');
        floor.create(648, 756, 'girder_purple');

        // 2nd floor
        ladderFloor.create(648, 672, 'girder_purple');
        this.conveyor7 = conveyors.create(600, 671, 'conveyor_left');
        this.conveyor8 = conveyors.create(552, 671, 'conveyor_left');
        this.conveyor9 = conveyors.create(408, 671, 'conveyor_right');
        this.conveyor10 = conveyors.create(360, 671, 'conveyor_right');
        floor.create(312, 672, 'girder_purple');
        floor.create(168, 672, 'girder_purple');
        floor.create(120, 672, 'girder_purple');
        floor.create(72, 672, 'girder_purple');
        floor.create(24, 672, 'girder_purple');

        // 3rd floor
        ladderFloor.create(312, 588, 'girder_purple');
        this.conveyor11 = conveyors.create(360, 587, 'conveyor_right');
        this.conveyor12 = conveyors.create(408, 587, 'conveyor_right');
        this.conveyor13 = conveyors.create(552, 587, 'conveyor_left');
        this.conveyor14 = conveyors.create(600, 587, 'conveyor_left');
        floor.create(648, 588, 'girder_purple');
        ladderFloor.create(72, 588, 'girder_purple');
        floor.create(24, 588, 'girder_purple');

        // 4th floor
        ladderFloor.create(648, 504, 'girder_purple');
        floor.create(600, 504, 'girder_purple');
        floor.create(552, 504, 'girder_purple');
        this.conveyor15 = conveyors.create(504, 503, 'conveyor_left');
        this.conveyor16 = conveyors.create(456, 503, 'conveyor_left');
        this.conveyor17 = conveyors.create(408, 503, 'conveyor_left');
        this.conveyor18 = conveyors.create(360, 503, 'conveyor_left');
        this.conveyor19 = conveyors.create(312, 503, 'conveyor_left');
        this.conveyor20 = conveyors.create(264, 503, 'conveyor_left');
        this.conveyor21 = conveyors.create(216, 503, 'conveyor_left');
        this.conveyor22 = conveyors.create(168, 503, 'conveyor_left');
        this.conveyor23 = conveyors.create(120, 503, 'conveyor_left');
        this.conveyor24 = conveyors.create(72, 503, 'conveyor_left');
        floor.create(24, 504, 'girder_purple');
        var x = 120;
        for (let i = 0; i < 9; i++){
            let spike = spikes.create(x, 444, 'spikes_flipped');
            spike.type = "spikes_flipped";
            x = x + 48;
        }

        // 5th floor
        ladderFloor.create(24, 420, 'girder_purple');
        this.conveyor25 = conveyors.create(72, 419, 'conveyor_left');
        this.conveyor26 = conveyors.create(120, 419, 'conveyor_left');
        this.conveyor27 = conveyors.create(168, 419, 'conveyor_left');
        this.conveyor28 = conveyors.create(216, 419, 'conveyor_left');
        this.conveyor29 = conveyors.create(264, 419, 'conveyor_left');
        this.conveyor30 = conveyors.create(312, 419, 'conveyor_left');
        floor.create(360, 420, 'girder_purple');
        this.conveyor31 = conveyors.create(408, 419, 'conveyor_right');
        floor.create(456, 420, 'girder_purple');
        floor.create(504, 420, 'girder_purple');
        floor.create(552, 420, 'girder_purple');
        floor.create(600, 420, 'girder_purple');
        floor.create(648, 420, 'girder_purple');
        var x = 72;
        for (let i = 0; i < 8; i++){
            if(i == 0){
                let spike = spikes.create(x, 355, 'spikes_flipped');
                spike.type = "spikes_flipped";
                x = x + 48;
                continue;
            }
            if(i == 2 || i == 3 || i == 4){
                x = x + 48;
                continue;
            }
            let spike = spikes.create(x, 360, 'spikes_flipped');
            spike.type = "spikes_flipped";
            x = x + 48;
        }

        // 6th floor
        ladderFloor.create(648, 336, 'girder_purple');
        floor.create(600, 336, 'girder_purple');
        this.conveyor32 = conveyors.create(552, 335, 'conveyor_left');
        this.conveyor33 = conveyors.create(408, 335, 'conveyor_right');
        this.conveyor34 = conveyors.create(360, 335, 'conveyor_right');
        this.conveyor35 = conveyors.create(312, 335, 'conveyor_left');
        this.conveyor36 = conveyors.create(264, 335, 'conveyor_left');
        this.conveyor37 = conveyors.create(120, 335, 'conveyor_right');
        floor.create(72, 336, 'girder_purple');
        floor.create(24, 336, 'girder_purple');

        // Top floor
        x = 648;
        for (let i = 0; i < 14; i++){
            if(i == 10 || i == 9 || i == 8){
                x = x - 48;
                continue;
            }
            ladderFloor.create(x, 249, 'girder_purple');
            x = x - 48;
        }

        var ladders = this.physics.add.staticGroup();
        ladders.create(648, 710, 'ladder').setScale(0.6, 0.6);
        ladders.create(312, 626, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 543, 'ladder').setScale(0.6, 0.6);
        ladders.create(72, 626, 'ladder').setScale(0.6, 0.6);
        ladders.create(24, 460, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 374, 'ladder').setScale(0.6, 0.6);
        ladders.create(334, 290, 'ladder').setScale(0.6, 0.6);
        ladders.create(72, 290, 'ladder').setScale(0.6, 0.6);

        this.physics.add.collider(this.player, ladderFloor);
        this.physics.add.collider(this.player, floor);

        //level end marker
        this.flag = this.physics.add.staticSprite(575, 205, 'flag');
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);

        // Point collectibles
        this.addPoints = this.physics.add.sprite(24, 640, 'add_points').setScale(0.5);
        this.addPoints.body.allowGravity = false;
        this.physics.add.collider(this.addPoints, floor);
        this.physics.add.overlap(this.player, this.addPoints, this.collectPoints, null, this);

        this.addPoints2 = this.physics.add.sprite(24, 560, 'add_points').setScale(0.5);
        this.addPoints2.body.allowGravity = false;
        this.physics.add.collider(this.addPoints2, floor);
        this.physics.add.overlap(this.player, this.addPoints2, this.collectPoints, null, this);

        this.addPoints3 = this.physics.add.sprite(480, 675, 'add_points').setScale(0.5);
        this.addPoints3.body.allowGravity = false;
        this.physics.add.collider(this.addPoints3, floor);
        this.physics.add.overlap(this.player, this.addPoints3, this.collectPoints, null, this);

        this.addPoints4 = this.physics.add.sprite(480, 340, 'add_points').setScale(0.5);
        this.addPoints4.body.allowGravity = false;
        this.physics.add.collider(this.addPoints4, floor);
        this.physics.add.overlap(this.player, this.addPoints4, this.collectPoints, null, this);

        this.addPoints5 = this.physics.add.sprite(24, 220, 'add_points').setScale(0.5);
        this.addPoints5.body.allowGravity = false;
        this.physics.add.collider(this.addPoints5, floor);
        this.physics.add.overlap(this.player, this.addPoints5, this.collectPoints, null, this);

        this.addPoints6 = this.physics.add.sprite(24, 300, 'add_points').setScale(0.5);
        this.addPoints6.body.allowGravity = false;
        this.physics.add.collider(this.addPoints6, floor);
        this.physics.add.overlap(this.player, this.addPoints6, this.collectPoints, null, this);

        // Create Score Multiplier powerup
        this.scoreMultiplierPowerup = this.physics.add.sprite(150, 640, 'score_multiplier');
        this.scoreMultiplierPowerup.setScale(1);
        this.physics.add.collider(this.scoreMultiplierPowerup, floor);

        // Add an overlap event to detect when the player collects the Score Multiplier
        this.physics.add.overlap(this.player, this.scoreMultiplierPowerup, this.collectScoreMultiplier, null, this);

        // Create Jettpack powerup
        this.jettpackPowerup = this.physics.add.sprite(120, 210, 'jettpack');
        this.jettpackPowerup.setScale(0.10);
        this.physics.add.collider(this.jettpackPowerup, floor);
        this.physics.add.collider(this.jettpackPowerup, ladderFloor);

        // Add an overlap event to detect when the player collects the Jettpack
        this.physics.add.overlap(this.player, this.jettpackPowerup, this.collectJettpack, null, this);
          
        // Allow conveyors to alter player movement
        this.physics.add.overlap(this.player, this.conveyor1, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor2, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor3, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor4, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor5, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor6, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor7, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor8, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor9, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor10, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor11, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor12, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor13, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor14, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor15, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor16, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor17, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor18, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor19, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor20, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor21, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor22, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor23, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor24, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor25, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor26, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor27, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor28, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor29, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor30, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor31, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor32, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor33, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor34, this.rideOnRightConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor35, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor36, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor37, this.rideOnRightConveyor, null, this);

        this.physics.add.collider(this.player, conveyors);

        this.physics.add.collider(this.player, spikes, this.handleCollisionSpikes, null, this);
        this.physics.add.collider(this.player, this.fireball, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.fireball2, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);

        //left conveyors - 1, 2, 5-8, 13-30, 32, 35-36
        this.conveyor1.anims.play('conveyor_left', true);
        this.conveyor2.anims.play('conveyor_right', true);
        this.conveyor5.anims.play('conveyor_left', true);
        this.conveyor6.anims.play('conveyor_left', true);
        this.conveyor7.anims.play('conveyor_left', true);
        this.conveyor8.anims.play('conveyor_left', true);
        this.conveyor13.anims.play('conveyor_left', true);
        this.conveyor14.anims.play('conveyor_left', true);
        this.conveyor15.anims.play('conveyor_left', true);
        this.conveyor16.anims.play('conveyor_left', true);
        this.conveyor17.anims.play('conveyor_left', true);
        this.conveyor18.anims.play('conveyor_left', true);
        this.conveyor19.anims.play('conveyor_left', true);
        this.conveyor20.anims.play('conveyor_left', true);
        this.conveyor21.anims.play('conveyor_left', true);
        this.conveyor22.anims.play('conveyor_left', true);
        this.conveyor23.anims.play('conveyor_left', true);
        this.conveyor24.anims.play('conveyor_left', true);
        this.conveyor25.anims.play('conveyor_left', true);
        this.conveyor26.anims.play('conveyor_left', true);
        this.conveyor27.anims.play('conveyor_left', true);
        this.conveyor28.anims.play('conveyor_left', true);
        this.conveyor29.anims.play('conveyor_left', true);
        this.conveyor30.anims.play('conveyor_left', true);
        this.conveyor32.anims.play('conveyor_left', true);
        this.conveyor35.anims.play('conveyor_left', true);
        this.conveyor36.anims.play('conveyor_left', true);
        //right conveyors - 3, 4, 9-12, 31, 33-34, 37
        this.conveyor3.anims.play('conveyor_right', true);
        this.conveyor4.anims.play('conveyor_right', true);
        this.conveyor9.anims.play('conveyor_right', true);
        this.conveyor10.anims.play('conveyor_right', true);
        this.conveyor11.anims.play('conveyor_right', true);
        this.conveyor12.anims.play('conveyor_right', true);
        this.conveyor31.anims.play('conveyor_right', true);
        this.conveyor33.anims.play('conveyor_right', true);
        this.conveyor34.anims.play('conveyor_right', true);
        this.conveyor37.anims.play('conveyor_right', true);
        
    }

    handleCollisionSpikes(player, spikes) {
        player.onCollision(spikes);
    }

    handleCollision(player, fireball) {
        player.onCollision(fireball);
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }

    collectPoints(player, addPoints) {
        addPoints.disableBody(true, true);
        this.game.gameState.scoringSystem.awardPointsForCollectingJettpack();
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

    collectJettpack(player, jettpack) {
        // Disable the powerup temporarily
        jettpack.disableBody(true, true);
        
        player.hasJettpack = true;

        // Timer for the powerup duration
        this.time.delayedCall(5000, this.resetPlayerVelocity, [this.player], this);
        this.game.gameState.scoringSystem.awardPointsForCollectingJettpack();
        console.log('Jettpack collected!');
    }

    resetPlayerVelocity(player) {
        player.hasJettpack = false;
        player.VelocityX = 200;
        player.VelocityY = 350;
    }

    nextLevel(player, flag){
        this.song.stop();
        console.log("next: " + this.player.hearts);
        this.scene.start("end", { previousHearts: this.player.hearts }); // Change to interlude 4 when available
    }

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }
}
