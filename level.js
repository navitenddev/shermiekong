// level.js
class Level {
    constructor(scene) {
        this.scene = scene;
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    createBackground() {
        this.scene.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400);
        this.barrel = new Barrel(this.scene, 600, 300);
    }
}
