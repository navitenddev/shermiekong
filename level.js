// level.js
class Level{
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
    }

    update() {
        this.player.update();
        //this.barrel.update();
    }

    createBackground() {
        this.scene.add.image(400, 300, 'lvl_default_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400);
        //this.barrel = new Barrel(this.scene, 600, 300);
    }
  
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        barrel.onCollision(player);
        player.onCollision(barrel);
    }
}
