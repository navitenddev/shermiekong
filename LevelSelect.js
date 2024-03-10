class LevelSelect extends Phaser.Scene{
    constructor(){
        super("LevelSelect");
    }

    create(){
        this.add.text(20, 50, "Level 1").setInteractive()
        .on('pointerdown', () => {this.scene.start("level1")});

        this.add.text(20, 80, "Shermie Hero").setInteractive()
        .on('pointerdown', () => {this.scene.start("ShermieHero")});

        this.add.text(20, 110, "Shermie's Lunch Break").setInteractive()
        .on('pointerdown', () => {this.scene.start("AppleGame")});
    }
}