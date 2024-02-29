// healthManager.js
class HealthManager {
    constructor(scene, initialHealth) {
        this.scene = scene;
        this.health = initialHealth;
        this.maxHealth = initialHealth;

        // Create an array to store references to the heart sprites
        this.hearts = [];

        // Create hearts UI at the top of the screen
        this.createHeartsUI();
    }

    createHeartsUI() {
        const heartSize = 32;
        const spacing = 30;
        for (let i = 0; i < this.maxHealth; i++) {
            const heart = this.scene.add.image(i * (heartSize + spacing), 10, 'heart').setOrigin(0, 0);
            heart.setScrollFactor(0); // Make sure the UI stays fixed at the top
            heart.setScale(0.2);
            this.hearts.push(heart);
        }
    }

    loseHealth() {
        if (this.health > 0) {
            this.health--;
    
            // Hide the corresponding heart
            this.hearts[this.health].setVisible(false);
        }
    }
    
    resetHealth() {
        this.health = this.maxHealth;
    
        this.hearts.forEach((heart) => {
            heart.setVisible(true);
        });
    }
}
