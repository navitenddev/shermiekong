//scoringSystem.js

class ScoringSystem {
    constructor(scene, initialScore = 0) {
        this.scene = scene;
        this.score = initialScore;
        //this.create();

        this.scoreText = this.scene.add.text(672/2, 10, 'Score: ' + this.score, { fontSize: '40px', fill: '#ff0000' }).setOrigin(0.5, 0);
        this.scoreText.setVisible(true);
        this.scoreText.setDepth(1); // Use a value that ensures it's above other elements
        this.scoreText.setScrollFactor(0);
    } 
    
    getScore() {
        return this.score;
    }     
    
    updateScore(points) {
        if(this.scene.player.hasScoreMultiplier){
            points *= 2;
        }
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }
    
    awardPointsForJumpingBarrel() {
        const points = 0; // Adjust the points as needed
        this.updateScore(points);
    }
    
    awardPointsForClimbingLadder() {
        const points = 0; // Adjust the points as needed
        //this.updateScore(points);
    }

    awardPointsForCollectingJettpack() {
        const points = 100; // Adjust the points as needed
        this.updateScore(points);
    }

    awardPointsForCollectingPoints() {
        const points = 100; // Adjust the points as needed
        this.updateScore(points);
    }

    awardPointsForDestroyingBarrel() {
        const points = 30; // Adjust the points as needed
        this.updateScore(points);
    }

    awardPointsForCollectingPowerUps() {
        const points = 30; // Adjust the points as needed
        this.updateScore(points);
    }

    awardPointsForCollectingScoreMultiplier() {
        const points = 10; // Adjust the points as needed
        this.updateScore(points);
    }
}
// Expose ScoringSystem class to be used in other files
window.ScoringSystem = ScoringSystem;
