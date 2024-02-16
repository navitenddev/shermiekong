// level1.js
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
    }
}
