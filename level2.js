// level1.js
class Level2 extends Level {
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
        this.buildFloor();
    }

    createEntities() {
        this.player = new Player(this.scene, 100, 400);
        this.barrel = new Barrel(this.scene, 600, 300);
    }

    buildFloor() {
        this.girder = new Girder(this.scene, 24, 756)
        this.girder = new Girder(this.scene, 72, 756)
        this.girder = new Girder(this.scene, 120, 756)
        this.girder = new Girder(this.scene, 168, 756)
        this.girder = new Girder(this.scene, 216, 756)
        this.girder = new Girder(this.scene, 264, 756)
        this.girder = new Girder(this.scene, 312, 756)
        this.girder = new Girder(this.scene, 360, 753)
        this.girder = new Girder(this.scene, 408, 750)
        this.girder = new Girder(this.scene, 456, 747)
        this.girder = new Girder(this.scene, 504, 744)
        this.girder = new Girder(this.scene, 552, 741)
        this.girder = new Girder(this.scene, 600, 738)
        this.girder = new Girder(this.scene, 648, 735)
    }
}
