// level2.js
class Level2 extends Level {
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    createEntities() {
        this.player = new Player(this.scene, 100, 400);
        this.barrel = new Barrel(this.scene, 600, 300);

        var floor = this.scene.physics.add.staticGroup();
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

        this.scene.physics.add.collider(this.player.sprite, floor);
    }
}
