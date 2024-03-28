class LevelSelect extends Phaser.Scene{
    constructor(){
        super("LevelSelect");
    }

    create(){
        this.add.text(20, 50, "Level 1").setInteractive()
        .on('pointerdown', () => {this.scene.start("level1")});
        let scoreFromLevel1 = 0;

        if (this.game.gameState && this.game.gameState.scoringSystem) {
            scoreFromLevel1 = this.game.gameState.scoringSystem.getScore();
        } 
        else {
            // Create a new scoring system instance if not initialized
            this.game.gameState.scoringSystem = new ScoringSystem(this);
            console.log("Scoring system initialized.");
        }

        this.add.text(20, 80, "Level 2").setInteractive()
        .on('pointerdown', () => { this.scene.start("level2", { score: scoreFromLevel1 }) });
      
        this.add.text(20, 110, "Level 3").setInteractive()
        .on('pointerdown', () => {this.scene.start("level3")});

        this.add.text(20, 140, "Shermie Hero").setInteractive()
        .on('pointerdown', () => {this.scene.start("ShermieHero")});

        this.add.text(20, 170, "Shermie's Lunch Break").setInteractive()
        .on('pointerdown', () => {
            this.sound.add("song3").play();
            this.scene.start("AppleGame")});
    }
}