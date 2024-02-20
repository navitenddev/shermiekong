// level1.js
class Level1 extends Level {
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
        this.buildFloor();
    }

    // Override createBackground method for Level 1
    createBackground() {
        //this.scene.add.image(400, 300, 'lvl_1_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 500, 400);
        this.barrel = new Barrel(this.scene, 700, 300);
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

        this.girder = new Girder(this.scene, 600, 669)
        this.girder = new Girder(this.scene, 552, 666)
        this.girder = new Girder(this.scene, 504, 663)
        this.girder = new Girder(this.scene, 456, 660)
        this.girder = new Girder(this.scene, 408, 657)
        this.girder = new Girder(this.scene, 360, 654)
        this.girder = new Girder(this.scene, 312, 651)
        this.girder = new Girder(this.scene, 264, 648)
        this.girder = new Girder(this.scene, 216, 645)
        this.girder = new Girder(this.scene, 168, 642)
        this.girder = new Girder(this.scene, 120, 639)
        this.girder = new Girder(this.scene, 72, 636)
        this.girder = new Girder(this.scene, 24, 633)

        this.girder = new Girder(this.scene, 72, 567)
        this.girder = new Girder(this.scene, 120, 564)
        this.girder = new Girder(this.scene, 168, 561)
        this.girder = new Girder(this.scene, 216, 558)
        this.girder = new Girder(this.scene, 264, 555)
        this.girder = new Girder(this.scene, 312, 552)
        this.girder = new Girder(this.scene, 360, 549)
        this.girder = new Girder(this.scene, 408, 546)
        this.girder = new Girder(this.scene, 456, 543)
        this.girder = new Girder(this.scene, 504, 540)
        this.girder = new Girder(this.scene, 552, 537)
        this.girder = new Girder(this.scene, 600, 534)
        this.girder = new Girder(this.scene, 648, 531)
        
        this.girder = new Girder(this.scene, 600, 465)
        this.girder = new Girder(this.scene, 552, 462)
        this.girder = new Girder(this.scene, 504, 459)
        this.girder = new Girder(this.scene, 456, 456)
        this.girder = new Girder(this.scene, 408, 453)
        this.girder = new Girder(this.scene, 360, 450)
        this.girder = new Girder(this.scene, 312, 447)
        this.girder = new Girder(this.scene, 264, 444)
        this.girder = new Girder(this.scene, 216, 441)
        this.girder = new Girder(this.scene, 168, 438)
        this.girder = new Girder(this.scene, 120, 435)
        this.girder = new Girder(this.scene, 72, 432)
        this.girder = new Girder(this.scene, 24, 429)

        this.girder = new Girder(this.scene, 72, 363)
        this.girder = new Girder(this.scene, 120, 360)
        this.girder = new Girder(this.scene, 168, 357)
        this.girder = new Girder(this.scene, 216, 354)
        this.girder = new Girder(this.scene, 264, 351)
        this.girder = new Girder(this.scene, 312, 348)
        this.girder = new Girder(this.scene, 360, 345)
        this.girder = new Girder(this.scene, 408, 342)
        this.girder = new Girder(this.scene, 456, 339)
        this.girder = new Girder(this.scene, 504, 336)
        this.girder = new Girder(this.scene, 552, 333)
        this.girder = new Girder(this.scene, 600, 330)
        this.girder = new Girder(this.scene, 648, 327)

        this.girder = new Girder(this.scene, 600, 261)
        this.girder = new Girder(this.scene, 552, 258)
        this.girder = new Girder(this.scene, 504, 255)
        this.girder = new Girder(this.scene, 456, 252)
        this.girder = new Girder(this.scene, 408, 249)
        this.girder = new Girder(this.scene, 360, 249)
        this.girder = new Girder(this.scene, 312, 249)
        this.girder = new Girder(this.scene, 264, 249)
        this.girder = new Girder(this.scene, 216, 249)
        this.girder = new Girder(this.scene, 168, 249)
        this.girder = new Girder(this.scene, 120, 249)
        this.girder = new Girder(this.scene, 72, 249)
        this.girder = new Girder(this.scene, 24, 249)
    }
}
