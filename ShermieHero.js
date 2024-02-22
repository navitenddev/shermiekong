class ShermieHero extends Level{
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    createBackground() {
        this.scene.add.image(400, 300, 'minigame1_bg');
        this.scene.add.image(672/2, 300, 'bass');
        this.scene.add.image(245, 300, 'string'); // diff of 60 between strings
        this.scene.add.image(305, 300, 'string');
        this.scene.add.image(365, 300, 'string');
        this.scene.add.image(425, 300, 'string');
        //marks where player should hit notes
        this.scene.add.image(400, 700, 'noteline');
    }

    createEntities() {
        this.player = new Player(this.scene, 400, 400);
        this.strings = this.scene.physics.add.staticGroup();
    }

    update(){
        this.handlePlayerInput();
    }

    /* the controls for this game spawn colliders on each string depending on which
    * arrow key is pressed. 
    */
    handlePlayerInput(){
        if (this.player.cursors.left.isDown) {
            let string1 = this.scene.add.circle(310, 550, 15, 0x0380fc);
            this.scene.physics.add.existing(string1);
            this.scene.tweens.add({
                targets: string1,
                scale: 2,
                duration: 100,
                onComplete: () => {
                    string1.destroy();
                }
            });
        }
        if (this.player.cursors.right.isDown) {
            let string2 = this.scene.add.circle(370, 550, 15, 0x0380fc);
            this.scene.physics.add.existing(string2);
            this.scene.tweens.add({
                targets: string2,
                scale: 2,
                duration: 100,
                onComplete: () => {
                    string2.destroy();
                }
            });
        }
        if (this.player.cursors.up.isDown) {
            let string3 = this.scene.add.circle(430, 550, 15, 0x0380fc);
            this.scene.physics.add.existing(string3);
            this.scene.tweens.add({
                targets: string3,
                scale: 2,
                duration: 100,
                onComplete: () => {
                    string3.destroy();
                }
            });
        }
        if (this.player.cursors.down.isDown) {
            let string4 = this.scene.add.circle(490, 550, 15, 0x0380fc);
            this.scene.physics.add.existing(string4);
            this.scene.tweens.add({
                targets: string4,
                scale: 2,
                duration: 100,
                onComplete: () => {
                    string4.destroy();
                }
            });
        }
    }
    stringTimer(){
        this.strings.destroy();
    }
}