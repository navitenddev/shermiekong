// level2.js
class Level2 extends Phaser.Scene {
    constructor() {
        super("level2");
    }

    preload() {
        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');
        // Level Entities
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder_blue', 'assets/girder_blue.png');
        this.load.image('girder_blue_broken', 'assets/girder_blue_broken.png');
        this.load.image('ladder', 'assets/ladder.png');
        this.load.image('ladder_tall', 'assets/ladder_tall.png');
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.spritesheet('fireball', 'assets/fireball.png',
        { frameWidth: 32, frameHeight: 24 });
        this.load.image('jettpack', 'assets/jettpack.png');
        this.load.image('add_points', 'assets/add_points.png');
    }

    create() {
        const scoreFromLevel1 = this.game.gameState.scoringSystem.getScore();

        console.log("score: "+ scoreFromLevel1);
        // Create and associate the scoring system with the scene, passing the score
        this.scoringSystem = new ScoringSystem(this, scoreFromLevel1);

        this.createBackground();
        this.createEntities();

        this.song = this.sound.add("chiptune3");
        this.song.loop = true;
        this.song.volume = 1;
        this.song.play();

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
        this.fireball3.handleFireballMovement();

        // if (this.player.isClimbing) {
        //     this.game.gameState.scoringSystem.awardPointsForClimbingLadder();
        // }
        
        this.brokenfloor.update();
        this.physics.add.collider(this.player, this.brokenfloor.sprite, fc1, null, this);
        this.physics.add.collider(this.player, this.brokenfloor2.sprite, fc2, null, this);
        this.physics.add.collider(this.player, this.brokenfloor3.sprite, fc3, null, this);
        this.physics.add.collider(this.player, this.brokenfloor4.sprite, fc4, null, this);
        this.physics.add.collider(this.player, this.brokenfloor5.sprite, fc5, null, this);
        this.physics.add.collider(this.player, this.brokenfloor6.sprite, fc6, null, this);
        this.physics.add.collider(this.player, this.brokenfloor7.sprite, fc7, null, this);
        this.physics.add.collider(this.player, this.brokenfloor8.sprite, fc8, null, this);
        this.physics.add.collider(this.player, this.brokenfloor9.sprite, fc9, null, this);
        this.physics.add.collider(this.player, this.brokenfloor10.sprite, fc10, null, this);
        this.physics.add.collider(this.player, this.brokenfloor11.sprite, fc11, null, this);
        this.physics.add.collider(this.player, this.brokenfloor12.sprite, fc12, null, this);
        this.physics.add.collider(this.player, this.brokenfloor13.sprite, fc13, null, this);
        this.physics.add.collider(this.player, this.brokenfloor14.sprite, fc14, null, this);
        this.physics.add.collider(this.player, this.brokenfloor15.sprite, fc15, null, this);

        function fc1(player, floor) {
            this.brokenfloor.onCollision(player);
        }

        function fc2(player, floor) {
            this.brokenfloor2.onCollision(player);
        }

        function fc3(player, floor) {
            this.brokenfloor3.onCollision(player);
        }

        function fc4(player, floor) {
            this.brokenfloor4.onCollision(player);
        }

        function fc5(player, floor) {
            this.brokenfloor5.onCollision(player);
        }

        function fc6(player, floor) {
            this.brokenfloor6.onCollision(player);
        }

        function fc7(player, floor) {
            this.brokenfloor7.onCollision(player);
        }

        function fc8(player, floor) {
            this.brokenfloor8.onCollision(player);
        }

        function fc9(player, floor) {
            this.brokenfloor9.onCollision(player);
        }

        function fc10(player, floor) {
            this.brokenfloor10.onCollision(player);
        }

        function fc11(player, floor) {
            this.brokenfloor11.onCollision(player);
        }

        function fc12(player, floor) {
            this.brokenfloor12.onCollision(player);
        }

        function fc13(player, floor) {
            this.brokenfloor13.onCollision(player);
        }

        function fc14(player, floor) {
            this.brokenfloor14.onCollision(player);
        }

        function fc15(player, floor) {
            this.brokenfloor15.onCollision(player);
        }
    }

    createBackground() {
        this.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        const { previousHearts } = this.scene.settings.data;
        console.log("prev: " + previousHearts);

        this.player = new Player(this, 80, 620, previousHearts);
        this.player.currentLevel = 2;
        
        this.fireball = new Fireball(this, 750, 150);
        this.fireball.type = "fireball";
        this.fireball2 = new Fireball(this, 0, 350);
        this.fireball2.type = "fireball";
        this.fireball3 = new Fireball(this, 750, 700);
        this.fireball3.type = "fireball";

        // Ground floor
        var floor = this.physics.add.staticGroup();
        var ladderFloor = this.physics.add.staticGroup();
        var spikes = this.physics.add.staticGroup();

        var x = 24;
        for (let i = 0; i < 12; i++){
            floor.create(x, 756, 'girder_blue');
            x = x + 48
        }
        let spike1 = spikes.create(600, 756, 'spikes');
        spike1.type = "spikes";
        let spike2 = spikes.create(648, 756, 'spikes');
        spike2.type = "spikes";

        // Starting platform
        ladderFloor.create(24, 669, 'girder_blue');
        ladderFloor.create(72, 669, 'girder_blue');
        this.brokenfloor = new BrokenFloor(this, 120, 669);
        this.brokenfloor2 = new BrokenFloor(this, 168, 669);
        floor.create(216, 669, 'girder_blue');

        // Middle spikes
        let spike3 = spikes.create(264, 669, 'spikes');
        spike3.type = "spikes";
        let spike4 = spikes.create(312, 669, 'spikes');
        spike4.type = "spikes";
        let spike5 = spikes.create(360, 669, 'spikes');
        spike5.type = "spikes";
        let spike6 = spikes.create(408, 669, 'spikes');
        spike6.type = "spikes";
        let spike7 = spikes.create(456, 669, 'spikes');
        spike7.type = "spikes";

        // Lower-right platforms
        floor.create(648, 669, 'girder_blue');
        this.brokenfloor3 = new BrokenFloor(this, 600, 669);
        ladderFloor.create(552, 669, 'girder_blue');
        ladderFloor.create(504, 669, 'girder_blue');

        ladderFloor.create(648, 582, 'girder_blue');
        ladderFloor.create(600, 582, 'girder_blue');
        
        ladderFloor.create(648, 495, 'girder_blue');
        ladderFloor.create(600, 495, 'girder_blue');
        ladderFloor.create(552, 495, 'girder_blue');
        floor.create(504, 495, 'girder_blue');

        this.brokenfloor4 = new BrokenFloor(this, 408, 495);
        this.brokenfloor5 = new BrokenFloor(this, 312, 517);

        // Middle-left platforms
        floor.create(24, 539, 'girder_blue');
        this.brokenfloor6 = new BrokenFloor(this, 72, 539);
        this.brokenfloor7 = new BrokenFloor(this, 120, 539);
        floor.create(168, 539, 'girder_blue');
        this.brokenfloor8 = new BrokenFloor(this, 216, 539);

        ladderFloor.create(24, 452, 'girder_blue');
        ladderFloor.create(72, 452, 'girder_blue');
        floor.create(168, 452, 'girder_blue');

        ladderFloor.create(24, 365, 'girder_blue');
        ladderFloor.create(168, 365, 'girder_blue');
        ladderFloor.create(216, 365, 'girder_blue');
        this.brokenfloor9 = new BrokenFloor(this, 264, 365);

        // Top-right platforms
        this.brokenfloor10 = new BrokenFloor(this, 456, 365);
        floor.create(408, 365, 'girder_blue');
        this.brokenfloor11 = new BrokenFloor(this, 360, 365);

        let spike8 = spikes.create(648, 365, 'spikes');
        spike8.type = "spikes";
        let spike9 = spikes.create(600, 365, 'spikes');
        spike9.type = "spikes";

        floor.create(552, 365, 'girder_blue');

        this.brokenfloor12 = new BrokenFloor(this, 648, 278);
        this.brokenfloor13 = new BrokenFloor(this, 600, 278);
        ladderFloor.create(552, 278, 'girder_blue');

        ladderFloor.create(648, 191, 'girder_blue');
        ladderFloor.create(600, 191, 'girder_blue');
        floor.create(552, 191, 'girder_blue');

        // Top floor
        floor.create(24, 249, 'girder_blue');
        floor.create(72, 249, 'girder_blue');
        this.brokenfloor14 = new BrokenFloor(this, 120, 249);
        floor.create(168, 249, 'girder_blue');
        floor.create(216, 249, 'girder_blue');
        floor.create(264, 249, 'girder_blue');
        floor.create(312, 249, 'girder_blue');
        floor.create(360, 249, 'girder_blue');
        this.brokenfloor15 = new BrokenFloor(this, 408, 249);

        // Top platform
        ladderFloor.create(216, 162, 'girder_blue');
        ladderFloor.create(264, 162, 'girder_blue');
        ladderFloor.create(312, 162, 'girder_blue');

        this.physics.add.collider(this.player, ladderFloor);
        this.physics.add.collider(this.player, floor);
        // Set up collision between player and the spikes
        this.physics.add.collider(this.player, spikes, this.handleCollisionSpikes, null, this);
        this.physics.add.collider(this.player, this.fireball, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.fireball2, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.fireball3, this.handleCollision, null, this);

        var ladders = this.physics.add.staticGroup();
        let ladder = ladders.create(24, 700, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(500, 700, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(648, 613, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(600, 526, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(26, 485, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(165, 398, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(552, 311, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(648, 224, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(213, 195, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();
        ladder = ladders.create(309, 195, 'ladder_tall').setScale(0.6, 0.6);
        ladder.body.updateFromGameObject();

        this.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);

        // Create Jettpack powerup
        this.jettpackPowerup = this.physics.add.sprite(230, 600, 'jettpack');
        this.jettpackPowerup.setScale(0.10);
        this.physics.add.collider(this.jettpackPowerup, floor);

        // Add an overlap event to detect when the player collects the Jettpack
        this.physics.add.overlap(this.player, this.jettpackPowerup, this.collectJettpack, null, this);

        // Create Jettpack powerup
        this.jettpackPowerup2 = this.physics.add.sprite(600, 400, 'jettpack');
        this.jettpackPowerup2.setScale(0.10);
        this.physics.add.collider(this.jettpackPowerup2, floor);
        this.physics.add.collider(this.jettpackPowerup2, ladderFloor);

        // Add an overlap event to detect when the player collects the Jettpack
        this.physics.add.overlap(this.player, this.jettpackPowerup2, this.collectJettpack, null, this);

        //level end marker
        this.flag = this.physics.add.staticSprite(275, 118, 'flag');
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);

        //points
        /*
        this.addPoints = this.physics.add.sprite(220, 685, 'add_points').setScale(0.5);
        this.addPoints.body.allowGravity = false;
        this.physics.add.collider(this.addPoints, floor);
        this.physics.add.overlap(this.player, this.addPoints, this.collectPoints, null, this);
        */

        this.addPoints2 = this.physics.add.sprite(26, 685, 'add_points').setScale(0.5);
        this.addPoints2.body.allowGravity = false;
        this.physics.add.collider(this.addPoints2, floor);
        this.physics.add.overlap(this.player, this.addPoints2, this.collectPoints, null, this);

        this.addPoints3 = this.physics.add.sprite(500, 685, 'add_points').setScale(0.5);
        this.addPoints3.body.allowGravity = false;
        this.physics.add.collider(this.addPoints3, floor);
        this.physics.add.overlap(this.player, this.addPoints3, this.collectPoints, null, this);

        this.addPoints4 = this.physics.add.sprite(648, 600, 'add_points').setScale(0.5);
        this.addPoints4.body.allowGravity = false;
        this.physics.add.collider(this.addPoints4, floor);
        this.physics.add.overlap(this.player, this.addPoints4, this.collectPoints, null, this);

        this.addPoints5 = this.physics.add.sprite(600, 516, 'add_points').setScale(0.5);
        this.addPoints5.body.allowGravity = false;
        this.physics.add.collider(this.addPoints5, floor);
        this.physics.add.overlap(this.player, this.addPoints5, this.collectPoints, null, this);

        this.addPoints6 = this.physics.add.sprite(26, 470, 'add_points').setScale(0.5);
        this.addPoints6.body.allowGravity = false;
        this.physics.add.collider(this.addPoints6, floor);
        this.physics.add.overlap(this.player, this.addPoints6, this.collectPoints, null, this);

        this.addPoints7 = this.physics.add.sprite(165, 385, 'add_points').setScale(0.5);
        this.addPoints7.body.allowGravity = false;
        this.physics.add.collider(this.addPoints7, floor);
        this.physics.add.overlap(this.player, this.addPoints7, this.collectPoints, null, this);

        this.addPoints8 = this.physics.add.sprite(552, 300, 'add_points').setScale(0.5);
        this.addPoints8.body.allowGravity = false;
        this.physics.add.collider(this.addPoints8, floor);
        this.physics.add.overlap(this.player, this.addPoints8, this.collectPoints, null, this);

        this.addPoints9 = this.physics.add.sprite(648, 210, 'add_points').setScale(0.5);
        this.addPoints9.body.allowGravity = false;
        this.physics.add.collider(this.addPoints9, floor);
        this.physics.add.overlap(this.player, this.addPoints9, this.collectPoints, null, this);

        this.addPoints10 = this.physics.add.sprite(213, 180, 'add_points').setScale(0.5);
        this.addPoints10.body.allowGravity = false;
        this.physics.add.collider(this.addPoints10, floor);
        this.physics.add.overlap(this.player, this.addPoints10, this.collectPoints, null, this);

        this.addPoints11 = this.physics.add.sprite(309, 180, 'add_points').setScale(0.5);
        this.addPoints11.body.allowGravity = false;
        this.physics.add.collider(this.addPoints11, floor);
        this.physics.add.overlap(this.player, this.addPoints11, this.collectPoints, null, this);
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

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }

    handleCollision(player, fireball) {
        player.onCollision(fireball);
    }

    handleCollisionSpikes(player, spikes) {
        player.onCollision(spikes);
    }

    nextLevel(player, flag){
        this.song.stop();
        console.log("next: " + this.player.hearts);
        this.scene.start("interlude2", { previousHearts: this.player.hearts });

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
