class BrokenFloor extends Entity {
    constructor(scene, x, y) {
        super(scene, x, y, 'girder_blue_broken');

        this.scene.physics.world.enable(this.sprite);
        this.sprite.body.setAllowGravity(false);
        this.sprite.setPushable(false);

        this.xPos = x;
        this.yPos = y;
    }

    update() {
        super.update();
    }

    respawn() {
        this.sprite.body.setAllowGravity(false);
        this.sprite.x = this.xPos;
        this.sprite.y = this.yPos;
    }

    onCollision(otherEntity) {
        //console.log('Player hit broken floor!');
        this.sprite.body.setAllowGravity(true);
        this.respawnTimer = this.scene.time.addEvent({
            delay: 3000, // Wait 3 seconds
            callback: () => this.respawn(),
            callbackScope: this,
            loop: false
        });

    }
}