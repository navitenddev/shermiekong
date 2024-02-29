// level.js
class Level {
    constructor(scene) {
        this.scene = scene;
        this.score = 0;
        this.scoreText = this.scene.add.text(672 - 10, 10, 'Score: 0', { fontSize: '40px', fill: '#ff0000' }).setOrigin(1, 0);        
        this.scoreText.setScrollFactor(0); // Make sure it stays in place when the camera moves
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    create() {
        // Set up collision between player and the barrel
        this.scene.physics.add.collider(currentLevel.player.sprite, currentLevel.barrel.sprite, this.handleCollision, null, this);
    }

    update() {
        this.player.update();
        this.barrel.update();
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.setText('Score: ' + this.score);
    }

    awardPointsForJumpingBarrel() {
        const points = 50; // Adjust the points as needed
        this.updateScore(points);
    }

    awardPointsForClimbingLadder() {
        const points = 20; // Adjust the points as needed
        this.updateScore(points);
    }

    createBackground() {
        this.scene.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400);
        this.barrel = new Barrel(this.scene, 600, 300);
    }

    
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        barrel.onCollision(player);
        player.onCollision(barrel);
    }
}
