class HealthManager {
    constructor(scene, initialHealth, maxHealth) {
        this.scene = scene;
        this.health = initialHealth;
        this.maxHealth = maxHealth;
        this.initialHealth = initialHealth;

        this.hearts = [];
        this.createHearts();
        //this.createHeartsUI();
    }

    preload() {
        this.load.image('heart', 'assets/heart.png');
    }

    // createHeartsUI() {
    //     const heartSize = 32;
    //     const spacing = 30;
    //     for (let i = 0; i < this.maxHealth; i++) {
    //         const heart = this.scene.add.image(i * (heartSize + spacing), 10, 'heart').setOrigin(0, 0);
    //         heart.setScrollFactor(0);
    //         heart.setScale(0.2);
    //         this.hearts.push(heart);
    //     }
    // }

    createHearts() {
        const heartSize = 32;
        const spacing = 30;
        for (let i = 0; i < this.maxHealth; i++) {
            const heart = this.scene.add.image(i * (heartSize + spacing), 10, 'heart').setOrigin(0, 0);
            heart.setScrollFactor(0); // Make sure the UI stays fixed at the top
            heart.setScale(0.2);
            this.hearts.push(heart);
        }
    }

    updateHearts() {
        // Update visibility based on current health
        for (let i = 0; i < this.maxHealth; i++) {
            if (i < this.health) {
                // Show heart
                this.hearts[i].setVisible(true);
            } else {
                // Hide heart
                this.hearts[i].setVisible(false);
            }
        }

        // Log the current health to the console
        console.log('Current health:', this.health);
    }

    loseHealth() {
        if (this.health > 0) {
            this.health--;
            this.updateHearts();

            if (this.health === 0) {
                // Perform game over logic or respawn logic here
                console.log('Game Over');
                this.resetHealth();
            }
        }
    }

    resetHealth() {
        this.health = this.maxHealth;

        this.hearts.forEach((heart) => {
            heart.setVisible(true);
        });
    }
}
