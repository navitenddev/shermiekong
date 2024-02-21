class Minigame1 extends Level{
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    createBackground() {
        this.scene.add.image(400, 300, 'minigame1_bg');
        this.scene.add.image(400, 300, 'bass');
        this.scene.add.image(310, 300, 'string');
        this.scene.add.image(370, 300, 'string');
        this.scene.add.image(430, 300, 'string');
        this.scene.add.image(490, 300, 'string');
        //marks where player should hit notes
        this.scene.add.image(400, 550, 'noteline');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400);
    }

    update(){
        this.handlePlayerInput();

    }

    /* the controls for this game spawn colliders on each string depending on which
    * arrow key is pressed. 
    */
    handlePlayerInput(){
        
        if (this.player.cursors.left.isDown) {
            var string1 = new Phaser.Geom.Rectangle(285, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } });
            graphics.fillRectShape(string1);
            this.scene.physics.add.existing(string1);
            this.scene.tweens.add({
                targets: string1,
                duration: 100,
                onComplete: () => {
                    
                    
                }
            });
        }
        if (this.player.cursors.right.isDown) {
            var string2 = new Phaser.Geom.Rectangle(345, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string2);
        }
        if (this.player.cursors.up.isDown) {
            var string3 = new Phaser.Geom.Rectangle(405, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string3);
        }
        if (this.player.cursors.down.isDown) {
            var string4 = new Phaser.Geom.Rectangle(465, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string4);
        }
    }

    debug(){

    }
    
}