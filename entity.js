class Entity {
    constructor(scene, x, y, spriteKey) {
        this.scene = scene;
        this.sprite = this.scene.physics.add.sprite(x, y, spriteKey);

        // Enable physics for the sprite
        this.scene.physics.world.enable(this.sprite);

        // Set common physics properties
        this.sprite.body.setCollideWorldBounds(true);
    }

    update() {
        // This method will be overridden by subclasses
    }

    onCollision(otherEntity) {
        // This method will be overridden by subclasses
    }

    destroy() {
        this.sprite.destroy();
    }
}
