class LevelSelect extends Phaser.Scene{
    constructor(){
        super("LevelSelect");
    }

    create(){
        this.add.text(20, 50, "Level 1").setInteractive()
        .on('pointerdown', () => {this.scene.start("level1")});

        this.add.text(20, 80, "Level 2").setInteractive()
        .on('pointerdown', () => {this.scene.start("level2")});

        this.add.text(20, 110, "Level 3").setInteractive()
        .on('pointerdown', () => {this.scene.start("level3")});

        this.add.text(20, 140, "Shermie Hero").setInteractive()
        .on('pointerdown', () => {this.scene.start("ShermieHero")});

        this.add.text(20, 170, "Shermie's Lunch Break").setInteractive()
        .on('pointerdown', () => {this.scene.start("AppleGame")});
    }
}