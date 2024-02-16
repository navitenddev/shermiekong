// level1.js
class Level1 extends Level {
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    // Override createBackground method for Level 1
    createBackground() {
        this.scene.add.image(400, 300, 'lvl_1_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 500, 400);
        this.barrel = new Barrel(this.scene, 700, 300);
    }
}
