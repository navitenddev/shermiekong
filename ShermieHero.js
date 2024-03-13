class ShermieHero extends Phaser.Scene{
    constructor() {
        super("ShermieHero");
    }

    create(){
        this.buildLevel();
        this.noteTimings = [2695, 3357, 4079, 4724, 5407, 5731, 6100, 6455, 6767, 7090, 7405, 7725, 8073, 8779, 9438, 10080, 10725, 11084, 11284, 11494, 11754, 12060, 12715, 13422, 14094, 14375, 14749, 15400, 15711, 16099, 16778, 17429, 18070, 18764, 19101, 19442, 19751, 20101, 20421, 20733, 21075, 21406, 22036, 22227, 22528, 23073, 23420, 23661, 23983, 24676, 25383, 26159, 26745, 27108, 27418, 27752, 28074, 28399, 28698, 29006, 29409, 30078, 30711, 31317, 32100, 32725, 33388, 34041, 34692, 35074, 35413, 35730, 36073, 36396, 36734, 37049, 37386, 37972, 38671, 39301];
        this.noteTime = 1000;

        //groups for collision checking
        this.notesString1 = [];
        this.notesString2 = [];
        this.notesString3 = [];
        this.notesString4 = [];

        this.string1Press = [];
        this.string2Press = [];
        this.string3Press = [];
        this.string4Press = [];

        for(var i = 0; i < this.noteTimings.length; i++){
            this.createTimedEvents(this.noteTimings[i] - this.noteTime);
        }
    }

    update(){
        this.handlePlayerInput();
        this.checkNoteCollisions();
        this.shermieBass.anims.play('strum', true);
    }

    buildLevel() {
        this.createBackground();
        this.createKeys();
    }

    createBackground() {
        this.add.image(400, 300, 'minigame1_bg');
        this.add.image(672/2, 300, 'bass');
        this.add.image(245, 300, 'string');
        this.add.image(305, 300, 'string');
        this.add.image(365, 300, 'string');
        this.add.image(425, 300, 'string');
        //marks where player should hit notes
        this.add.image(400, 700, 'noteline');
        this.add.image(400, 1150, 'lvl_default_bg');

        //animated background
        this.shermieBass = this.add.sprite(70, 500, 'shermie_bass').setScale(0.8);
        
        this.anims.create(
            {
                key: 'strum',
                frames: this.anims.generateFrameNumbers('shermie_bass', {start: 0, end: 2}),
                framerate: 1,
                duration: 400,
            }
        );

        this.song = this.sound.add("shermieHero");
        this.song.volume = 1;
        this.song.play();
    }

    /**
     * Control is handled differently in this type of game than the platformer. 
     * Each key press must only be handled on its initial press,
     * not for the duration it's held down
     */
    createKeys(){
        this.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    createTimedEvents(timeDelay){
        this.timedEvent = this.time.addEvent({
            delay: timeDelay,
            callback: this.createNotes,
            callbackScope: this,
            loop: false
        });
    }

    createNotes(){
        //the notes will spawn on random strings
        let randString = Math.floor(Math.random() * 4 + 1);
        this.createNote(randString);
    }

    createNote(stringNum){
        let note;
        switch(stringNum){
            case 1:
                note = this.add.image(245, 0, 'left');
                this.notesString1.push(note);
                this.physics.add.existing(note);
                this.physics.moveTo(note, 245, 768, null, this.noteTime);
                break;
            case 2:
                note = this.add.image(305, 0, 'up');
                this.notesString2.push(note);
                this.physics.add.existing(note);
                this.physics.moveTo(note, 305, 768, null, this.noteTime);
                break;
            case 3:
                note = this.add.image(365, 0, 'down');
                this.notesString3.push(note);
                this.physics.add.existing(note);
                this.physics.moveTo(note, 365, 768, null, this.noteTime);
                break;
            case 4:
                note = this.add.image(425, 0, 'right');
                this.notesString4.push(note);
                this.physics.add.existing(note);
                this.physics.moveTo(note, 425, 768, null, this.noteTime);
                break;
        }
        
    }

    /* the controls for this game spawn colliders on each string depending on which
    * arrow key is pressed. 
    */
    handlePlayerInput(){
        if (Phaser.Input.Keyboard.JustDown(this.left)) {
            let string1 = this.add.circle(245, 700, 15, 0x0380fc);
            this.physics.add.existing(string1);
            this.tweens.add({
                targets: string1,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string1.destroy();
                }
            });
            this.string1Press.push(string1);
        }
        if (Phaser.Input.Keyboard.JustDown(this.up)) {
            let string2 = this.add.circle(305, 700, 15, 0x0380fc);
            this.physics.add.existing(string2);
            this.tweens.add({
                targets: string2,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string2.destroy();
                }
            });
            this.string2Press.push(string2);
        }
        if (Phaser.Input.Keyboard.JustDown(this.down)) {
            let string3 = this.add.circle(365, 700, 15, 0x0380fc);
            this.physics.add.existing(string3);
            this.tweens.add({
                targets: string3,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string3.destroy();
                }
            });
            this.string3Press.push(string3);
        }
        if (Phaser.Input.Keyboard.JustDown(this.right)) {
            let string4 = this.add.circle(425, 700, 15, 0x0380fc);
            this.physics.add.existing(string4);
            this.tweens.add({
                targets: string4,
                scale: 3,
                duration: 100,
                onComplete: () => {
                    string4.destroy();
                }
            });
            this.string4Press.push(string4);
        }
    }
    
    checkNoteCollisions(){
        this.physics.overlap(this.string1Press, this.notesString1, (string1, note) => {
            string1.hit = true;
            this.string1Press.splice(this.string1Press.indexOf(string1), 1);
            note.destroy();
            this.notesString1.splice(this.notesString1.indexOf(note), 1);

            console.log("String 1 note hit");
        });
        this.physics.overlap(this.string2Press, this.notesString2, (string2, note) => {
            string2.hit = true;
            this.string2Press.splice(this.string2Press.indexOf(string2), 1);
            note.destroy();
            this.notesString2.splice(this.notesString2.indexOf(note), 1);

            console.log("String 2 note hit");
        });
        this.physics.overlap(this.string3Press, this.notesString3, (string3, note) => {
            string3.hit = true;
            this.string3Press.splice(this.string3Press.indexOf(string3), 1);
            note.destroy();
            this.notesString3.splice(this.notesString3.indexOf(note), 1);

            console.log("String 3 note hit");
        });
        this.physics.overlap(this.string4Press, this.notesString4, (string4, note) => {
            string4.hit = true;
            this.string4Press.splice(this.string4Press.indexOf(string4), 1);
            note.destroy();
            this.notesString4.splice(this.notesString4.indexOf(note), 1);

            console.log("String 4 note hit");
        });
    }
}