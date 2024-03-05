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
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder', 'assets/girder.png');
        this.load.image('ladder', 'assets/ladder.png');
    }

    create() {
        this.createBackground();
        this.createEntities();
        // Set up collision between player and the barrel
        //this.physics.add.collider(currentLevel.player.sprite, currentLevel.barrel.sprite, this.handleCollision, null, this);
    }

    update() {
        this.player.handlePlayerMovement();
        // this.barrel.update();
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    createBackground() {
        this.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this, 100, 700);

        // this.barrel = new Barrel(this.scene, 600, 200);

        var floor = this.physics.add.staticGroup();
        floor.create(24, 756, 'girder');
        floor.create(72, 756, 'girder');
        floor.create(120, 756, 'girder');
        floor.create(168, 756, 'girder');
        floor.create(216, 756, 'girder');
        floor.create(264, 756, 'girder');
        floor.create(312, 756, 'girder');
        floor.create(360, 753, 'girder');
        floor.create(408, 750, 'girder');
        floor.create(456, 747, 'girder');
        floor.create(504, 744, 'girder');
        floor.create(552, 741, 'girder');
        floor.create(600, 738, 'girder');
        floor.create(648, 735, 'girder');

        floor.create(600, 669, 'girder');
        floor.create(552, 666, 'girder');
        floor.create(504, 663, 'girder');
        floor.create(456, 660, 'girder');
        floor.create(408, 657, 'girder');
        floor.create(360, 654, 'girder');
        floor.create(312, 651, 'girder');
        floor.create(264, 648, 'girder');
        floor.create(216, 645, 'girder');
        floor.create(168, 642, 'girder');
        floor.create(120, 639, 'girder');
        floor.create(72, 636, 'girder');
        floor.create(24, 633, 'girder');

        floor.create(72, 567, 'girder');
        floor.create(120, 564, 'girder');
        floor.create(168, 561, 'girder');
        floor.create(216, 558, 'girder');
        floor.create(264, 555, 'girder');
        floor.create(312, 552, 'girder');
        floor.create(360, 549, 'girder');
        floor.create(408, 546, 'girder');
        floor.create(456, 543, 'girder');
        floor.create(504, 540, 'girder');
        floor.create(552, 537, 'girder');
        floor.create(600, 534, 'girder');
        floor.create(648, 531, 'girder');

        floor.create(600, 465, 'girder');
        floor.create(552, 462, 'girder');
        floor.create(504, 459, 'girder');
        floor.create(456, 456, 'girder');
        floor.create(408, 453, 'girder');
        floor.create(360, 450, 'girder');
        floor.create(312, 447, 'girder');
        floor.create(264, 444, 'girder');
        floor.create(216, 441, 'girder');
        floor.create(168, 438, 'girder');
        floor.create(120, 435, 'girder');
        floor.create(72, 432, 'girder');
        floor.create(24, 429, 'girder');

        floor.create(72, 363, 'girder');
        floor.create(120, 360, 'girder');
        floor.create(168, 357, 'girder');
        floor.create(216, 354, 'girder');
        floor.create(264, 351, 'girder');
        floor.create(312, 348, 'girder');
        floor.create(360, 345, 'girder');
        floor.create(408, 342, 'girder');
        floor.create(456, 339, 'girder');
        floor.create(504, 336, 'girder');
        floor.create(552, 333, 'girder');
        floor.create(600, 330, 'girder');
        floor.create(648, 327, 'girder');

        floor.create(600, 261, 'girder');
        floor.create(552, 258, 'girder');
        floor.create(504, 255, 'girder');
        floor.create(456, 252, 'girder');
        floor.create(408, 249, 'girder');
        floor.create(360, 249, 'girder');
        floor.create(312, 249, 'girder');
        floor.create(264, 249, 'girder');
        floor.create(216, 249, 'girder');
        floor.create(168, 249, 'girder');
        floor.create(120, 249, 'girder');
        floor.create(72, 249, 'girder');
        floor.create(24, 249, 'girder');

        this.physics.add.collider(this.player, floor);
        // this.scene.physics.add.collider(this.barrel.sprite, floor);

        var ladders = this.physics.add.staticGroup();
        ladders.create(425, 700, 'ladder');
        ladders.create(225, 500, 'ladder');

        this.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        //this.physics.add.overlap(this.player.sprite, ladders, this.handlePlayerClimbing, null, this);
    }

    handlePlayerClimbing() {
        //this.player.isClimbing = true;
    }

    
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        barrel.onCollision(player);
        player.onCollision(barrel);
    }
}
