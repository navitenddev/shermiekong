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
        this.load.image('spikes', 'assets/spikes.png');
        this.load.image('heart', 'assets/heart.png');
    }

    create() {
        this.createBackground();
        this.createEntities();
    }

    update() {
        this.player.handlePlayerMovement();

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
        this.player = new Player(this, 40, 600, previousHearts);

        // Ground floor
        var floor = this.physics.add.staticGroup();
        var x = 24;
        for (let i = 0; i < 12; i++){
            floor.create(x, 756, 'girder_blue');
            x = x + 48
        }
        floor.create(600, 756, 'spikes');
        floor.create(648, 756, 'spikes');

        // Starting platform
        floor.create(24, 669, 'girder_blue');
        floor.create(72, 669, 'girder_blue');
        this.brokenfloor = new BrokenFloor(this, 120, 669);
        this.brokenfloor2 = new BrokenFloor(this, 168, 669);
        floor.create(216, 669, 'girder_blue');

        // Middle spikes
        floor.create(264, 669, 'spikes');
        floor.create(312, 669, 'spikes');
        floor.create(360, 669, 'spikes');
        floor.create(408, 669, 'spikes');
        floor.create(456, 669, 'spikes');

        // Lower-right platforms
        floor.create(648, 669, 'girder_blue');
        this.brokenfloor3 = new BrokenFloor(this, 600, 669);
        floor.create(552, 669, 'girder_blue');
        floor.create(504, 669, 'girder_blue');

        floor.create(648, 582, 'girder_blue');
        floor.create(600, 582, 'girder_blue');
        
        floor.create(648, 495, 'girder_blue');
        floor.create(600, 495, 'girder_blue');
        floor.create(552, 495, 'girder_blue');
        floor.create(504, 495, 'girder_blue');

        this.brokenfloor4 = new BrokenFloor(this, 408, 495);
        this.brokenfloor5 = new BrokenFloor(this, 312, 517);

        // Middle-left platforms
        floor.create(24, 539, 'girder_blue');
        this.brokenfloor6 = new BrokenFloor(this, 72, 539);
        this.brokenfloor7 = new BrokenFloor(this, 120, 539);
        floor.create(168, 539, 'girder_blue');
        this.brokenfloor8 = new BrokenFloor(this, 216, 539);

        floor.create(24, 452, 'girder_blue');
        floor.create(72, 452, 'girder_blue');
        floor.create(168, 452, 'girder_blue');

        floor.create(24, 365, 'girder_blue');
        floor.create(168, 365, 'girder_blue');
        floor.create(216, 365, 'girder_blue');
        this.brokenfloor9 = new BrokenFloor(this, 264, 365);

        // Top-right platforms
        this.brokenfloor10 = new BrokenFloor(this, 456, 365);
        floor.create(408, 365, 'girder_blue');
        this.brokenfloor11 = new BrokenFloor(this, 360, 365);

        floor.create(648, 365, 'spikes');
        floor.create(600, 365, 'spikes');
        floor.create(552, 365, 'girder_blue');

        this.brokenfloor12 = new BrokenFloor(this, 648, 278);
        this.brokenfloor13 = new BrokenFloor(this, 600, 278);
        floor.create(552, 278, 'girder_blue');

        floor.create(648, 191, 'girder_blue');
        floor.create(600, 191, 'girder_blue');
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
        floor.create(216, 162, 'girder_blue');
        floor.create(264, 162, 'girder_blue');
        floor.create(312, 162, 'girder_blue');

        this.physics.add.collider(this.player, floor);

        var ladders = this.physics.add.staticGroup();
        ladders.create(220, 710, 'ladder').setScale(0.6, 0.6);
        ladders.create(26, 710, 'ladder').setScale(0.6, 0.6);
        ladders.create(500, 710, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 623, 'ladder').setScale(0.6, 0.6);
        ladders.create(600, 536, 'ladder').setScale(0.6, 0.6);
        ladders.create(26, 495, 'ladder').setScale(0.6, 0.6);
        ladders.create(165, 408, 'ladder').setScale(0.6, 0.6);
        ladders.create(552, 321, 'ladder').setScale(0.6, 0.6);
        ladders.create(648, 234, 'ladder').setScale(0.6, 0.6);
        ladders.create(213, 205, 'ladder').setScale(0.6, 0.6);
        ladders.create(309, 205, 'ladder').setScale(0.6, 0.6);

        this.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        this.physics.add.overlap(this.player, ladders, this.handlePlayerClimbing, null, this);
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
        this.player.playerClimbing();
    }
}
