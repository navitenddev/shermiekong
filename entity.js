// entity.js
class Entity {
    constructor(scene, x, y, spriteKey) {
        this.scene = scene;
        this.position = new Phaser.Math.Vector2(x, y);
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.sprite = this.scene.physics.add.sprite(x, y, spriteKey);
    }

    update() {

    }

    onCollision(otherEntity) {
        // Define behavior when this entity collides with another entity
    }

    destroy() {
        this.sprite.destroy();
    }
}

class Barrel extends Entity {
    constructor(scene, x, y) {
        // Call the parent constructor (aka inherit from Entity)
        super(scene, x, y, 'wolf');

        // Set up any additional configurations (specific to the Barrel class)
        this.sprite.setScale(0.2);
        this.sprite.setCollideWorldBounds(true);

        this.scene.physics.world.enable(this.sprite);
        this.sprite.body.setGravityY(300);
    }

    update() {
        super.update();
    }

    onCollision(otherEntity) {
        console.log('Player hit by a barrel!');
    }
}
