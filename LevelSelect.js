// LevelSelect.js
class LevelSelect extends Phaser.Scene {
    constructor() {
        super("LevelSelect");
    }

    create() {
        this.input.keyboard.on('keydown', (event) => {
            if (event.key === 'Escape') {
                this.resetHealth();
                this.scene.start("MainMenu");
            }
        });

        // Corrected the duplicated line
        this.add.text(20, 50, "Level 1").setInteractive()
            .on('pointerdown', () => {
                // Pass the current scene to Level1, creating an instance with the healthManager
                let level1 = new Level1(this);
                this.scene.add("level1", level1);
                this.scene.start("level1");
            });

        this.add.text(20, 80, "Level 2").setInteractive()
            .on('pointerdown', () => { this.scene.start("level2") });

        this.add.text(20, 110, "Shermie Hero").setInteractive()
            .on('pointerdown', () => { this.scene.start("ShermieHero") });

        this.add.text(20, 140, "Shermie's Lunch Break").setInteractive()
            .on('pointerdown', () => { this.scene.start("AppleGame") });
    }

    resetHealth() {
        const level1 = this.scene.get("level1"); // Retrieve the Level1 scene instance
        if (level1 && level1.healthManager) {
            level1.healthManager.resetHealth();
        }
    }
}
