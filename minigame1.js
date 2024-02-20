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
        this.createNotes();
    }

    createNotes(){

    }
}