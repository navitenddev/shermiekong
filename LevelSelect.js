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
            // ...
        } else {
            // Handle the case where scoringSystem is not properly initialized
            console.error("Scoring system not properly initialized.");
            console.log(scoreFromLevel1);
        }
        // Get the score from Level1
        //const scoreFromLevel1 = this.game.gameState.scoringSystem.getScore();

        this.add.text(20, 80, "Level 2").setInteractive()
        .on('pointerdown', () => { this.scene.start("level2", { score: scoreFromLevel1 }) });
        
        this.add.text(20, 110, "Shermie Hero").setInteractive()
        .on('pointerdown', () => {this.scene.start("ShermieHero")});

        this.add.text(20, 140, "Shermie's Lunch Break").setInteractive()
        .on('pointerdown', () => {this.scene.start("AppleGame")});
    }
}