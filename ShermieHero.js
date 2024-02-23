class ShermieHero extends Level{
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
        this.createKeys();
        this.create();
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
    }
    /**
     * Control is handled differently in this type of game than the platformer. 
     * Each key press must only be handled on its initial press,
     * not for the duration it's held down
     */
    createKeys(){
        this.up = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    create(){
        this.string1NoteTimings = [];
        this.string2NoteTimings = [];
        

        this.noteTime = 10000; //ms
        this.notes = [];
        this.createNote(1);
        this.createNote(2);
        this.createNote(3);
        this.createNote(4);

    }

    createNotes(){
        
    }

    createNote(stringNum){
        let note;
        switch(stringNum){
            case 1:
                note = this.scene.add.circle(245, 0, 20, 0x03fc03);
                this.notes.push(note);
                this.scene.physics.add.existing(note);
                this.scene.physics.moveTo(note, 245, 768, null, this.noteTime);
                break;
            case 2:
                note = this.scene.add.circle(305, 0, 20, 0x03fc03);
                this.notes.push(note);
                this.scene.physics.add.existing(note);
                this.scene.physics.moveTo(note, 305, 768, null, this.noteTime);
                break;
            case 3:
                note = this.scene.add.circle(365, 0, 20, 0x03fc03);
                this.notes.push(note);
                this.scene.physics.add.existing(note);
                this.scene.physics.moveTo(note, 365, 768, null, this.noteTime);
                break;
            case 4:
                note = this.scene.add.circle(425, 0, 20, 0x03fc03);
                this.notes.push(note);
                this.scene.physics.add.existing(note);
                this.scene.physics.moveTo(note, 425, 768, null, this.noteTime);
                break;
        }
        
    }

    update(){
        this.handlePlayerInput();
    }

    /* the controls for this game spawn colliders on each string depending on which
    * arrow key is pressed. 
    */
    handlePlayerInput(){
        if (Phaser.Input.Keyboard.JustDown(this.left)) {
            let string1 = this.scene.add.circle(245, 700, 15, 0x0380fc);
            this.scene.physics.add.existing(string1);
            this.scene.tweens.add({
                targets: string1,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string1.destroy();
                }
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.up)) {
            let string2 = this.scene.add.circle(305, 700, 15, 0x0380fc);
            this.scene.physics.add.existing(string2);
            this.scene.tweens.add({
                targets: string2,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string2.destroy();
                }
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.down)) {
            let string3 = this.scene.add.circle(365, 700, 15, 0x0380fc);
            this.scene.physics.add.existing(string3);
            this.scene.tweens.add({
                targets: string3,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string3.destroy();
                }
            });
        }
        if (Phaser.Input.Keyboard.JustDown(this.right)) {
            let string4 = this.scene.add.circle(425, 700, 15, 0x0380fc);
            this.scene.physics.add.existing(string4);
            this.scene.tweens.add({
                targets: string4,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string4.destroy();
                }
            });
        }
    }
    
}