//scoringSystem.js

class ScoringSystem {
    constructor(scene) {
        console.log("ScoringSystem created!");
        this.scene = scene;
        this.score = 0;
        console.log("Score Text Object:", this.scene.add.text);
        this.scoreText = this.scene.add.text(672-150, 10, 'Score: 0', { fontSize: '40px', fill: '#ff0000' }).setOrigin(0.5, 0);
        this.scoreText.setVisible(true);
        this.scoreText.setDepth(1); // Use a value that ensures it's above other elements
        this.scoreText.setScrollFactor(0);
    }      
    updateScore(points) {
        console.log("Updating score with points:", points);
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
        console.log("Score text object:", this.scoreText);
    }
    awardPointsForJumpingBarrel() {
        const points = 50; // Adjust the points as needed
        this.updateScore(points);
    }
    awardPointsForClimbingLadder() {
        const points = 20; // Adjust the points as needed
        this.updateScore(points);
    }
}
// Expose ScoringSystem class to be used in other files
window.ScoringSystem = ScoringSystem;
