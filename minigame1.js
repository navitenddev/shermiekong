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
    const rect = new Phaser.Geom.Rectangle(250, 200, 300, 200);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } });
            graphics.fillRectShape(rect);
    */
    handlePlayerInput(){
        
        if (this.player.cursors.left.isDown) {
            const string1 = new Phaser.Geom.Rectangle(285, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } });
            graphics.fillRectShape(string1);
        }
        if (this.player.cursors.right.isDown) {
            const string2 = new Phaser.Geom.Rectangle(345, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string2);
        }
        if (this.player.cursors.up.isDown) {
            const string3 = new Phaser.Geom.Rectangle(405, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string3);
        }
        if (this.player.cursors.down.isDown) {
            const string4 = new Phaser.Geom.Rectangle(465, 525, 50, 50);
            const graphics = this.scene.add.graphics({ fillStyle: { color: 0x0000ff } })
            graphics.fillRectShape(string4);
        }
    }
    
}