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
        this.load.image('conveyor_left', 'assets/conveyor_left.png');
        this.load.image('conveyor_right', 'assets/conveyor_right.png');
        this.load.image('conveyor_left_sheet', 'assets/conveyor_left_sheet.png');
        this.load.image('conveyor_right_sheet', 'assets/conveyor_right_sheet.png');
        this.load.image('heart', 'assets/heart.png');
        this.load.spritesheet('fireball', 'assets/fireball.png',
        { frameWidth: 32, frameHeight: 24 });
    }

    create() {
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
        //this.song.play();
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
        this.player = new Player(this, 30, 720);
        var floor = this.physics.add.staticGroup();
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
        this.conveyor2 = conveyors.create(168, 755, 'conveyor_left');
        floor.create(216, 756, 'girder_purple');
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
        floor.create(648, 672, 'girder_purple');
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
        floor.create(312, 588, 'girder_purple');
        this.conveyor11 = conveyors.create(360, 587, 'conveyor_right');
        this.conveyor12 = conveyors.create(408, 587, 'conveyor_right');
        this.conveyor13 = conveyors.create(552, 587, 'conveyor_left');
        this.conveyor14 = conveyors.create(600, 587, 'conveyor_left');
        floor.create(648, 588, 'girder_purple');
        floor.create(72, 588, 'girder_purple');
        floor.create(24, 588, 'girder_purple');

        // 4th floor
        floor.create(648, 504, 'girder_purple');
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
        var x = 72;
        for (let i = 0; i < 10; i++){
            let spike = spikes.create(x, 444, 'spikes_flipped');
            spike.type = "spikes";  // Add a custom property
            x = x + 48;
        }

        // 5th floor
        floor.create(24, 420, 'girder_purple');
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
        //this.conveyor33 = conveyors.create(504, 419, 'conveyor_right');
        floor.create(552, 420, 'girder_purple');
        floor.create(600, 420, 'girder_purple');
        floor.create(648, 420, 'girder_purple');
        var x = 72;
        for (let i = 0; i < 8; i++){
            if(i == 2 || i == 3 || i == 4){
                x = x + 48;
                continue;
            }
            let spike = spikes.create(x, 360, 'spikes_flipped');
            spike.type = "spikes";  // Add a custom property
            x = x + 48;
        }

        // 6th floor
        x = 648;
        for (let i = 0; i < 14; i++){
            if(i == 2 || i == 3 || i == 4 || i == 8 || i == 9){
                x = x - 48;
                continue;
            }
            floor.create(x, 336, 'girder_purple');
            x = x - 48;
        }
        this.conveyor32 = conveyors.create(552, 335, 'conveyor_left');

        // Top floor
        x = 648;
        for (let i = 0; i < 9; i++){
            floor.create(x, 249, 'girder_purple');
            x = x - 48;
        }

        var ladders = this.physics.add.staticGroup();
        ladders.create(648, 710, 'ladder').setScale(0.6, 0.6);
        ladders.create(312, 626, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 542, 'ladder').setScale(0.6, 0.6);
        ladders.create(72, 626, 'ladder').setScale(0.6, 0.6);
        ladders.create(24, 458, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 374, 'ladder').setScale(0.6, 0.6);

        this.physics.add.collider(this.player, floor);
          
        // Allow riding on horizontally-moving platforms
        this.physics.add.overlap(this.player, this.conveyor1, this.rideOnLeftConveyor, null, this);
        this.physics.add.overlap(this.player, this.conveyor2, this.rideOnLeftConveyor, null, this);
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

        this.physics.add.collider(this.player, conveyors);

        this.physics.add.collider(this.player, spikes, this.handleCollisionSpikes, null, this);
        this.physics.add.collider(this.player, this.fireball, this.handleCollision, null, this);
        this.physics.add.collider(this.player, this.fireball2, this.handleCollision, null, this);
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);

        //var ladders = this.physics.add.staticGroup();
        //this.physics.add.collider(ladders, floor);
        // Add an overlap event to detect when the player is on the ladder
        //this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);
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

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }
}
