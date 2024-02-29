// level.js
class Level {
    constructor(scene) {
        this.scene = scene;
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    create() {
        // Set up collision between player and the barrel
        this.scene.physics.add.collider(currentLevel.player.sprite, currentLevel.barrel.sprite, this.handleCollision, null, this);

        // Create a group to hold hearts
        this.hearts = this.scene.physics.add.group();

        // Display hearts at the top of the screen
        for (let i = 0; i < this.healthManager.maxHealth; i++) {
            let heart = this.hearts.create(20 + i * 30, 20, 'heart');
            heart.setScrollFactor(0);  // Make sure hearts stay in place when the camera moves
            heart.setScale(0.01);
            heart.setDisplaySize(20, 20);  // Set the display size to make the hearts smaller
        }
    }

    update() {
        this.player.update();
        this.barrel.update();
        this.updateHearts(); // Update the hearts
    }

    createBackground() {
        this.scene.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400, this.healthManager); // Pass healthManager to Player
        this.barrel = new Barrel(this.scene, 600, 300);
    }

    updateHearts() {
        this.hearts.children.iterate(function (heart, index) {
            heart.visible = index < currentLevel.healthManager.currentHealth;
        });
    }

    handleCollision(player, barrel) {
        // Reduce player health
        this.healthManager.loseHealth();

        // Check if the player is out of health
        if (this.healthManager.health === 0) {
            // Perform any game over logic here
            console.log("Game Over");

            // Reset the game or perform other actions
            this.resetGame();
        }
        this.player.resetPosition();
    }

    resetGame() {
        // Reset player's position
        this.player.resetPosition();
        this.healthManager.resetHealth();
    }
}
