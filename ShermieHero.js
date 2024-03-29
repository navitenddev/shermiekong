class ShermieHero extends Phaser.Scene{
    constructor() {
        super("ShermieHero");
    }

    preload(){
        //Shermie hero
        this.load.image('dialogue', 'assets/dialogue_box.png');
        this.load.image('stage', 'assets/stage.png');
        this.load.image('bass', 'assets/bass.png');
        this.load.image('string', 'assets/string.png');
        this.load.image('noteline', 'assets/noteline.png');
        this.load.audio('shermieHero', 'assets/shermie_hero.mp3');
        this.load.image('left', 'assets/left_arrow.png');
        this.load.image('right', 'assets/right_arrow.png');
        this.load.image('down', 'assets/down_arrow.png');
        this.load.image('up', 'assets/up_arrow.png');
        this.load.spritesheet('shermie_bass', 'assets/shermie-bass.png', 
        {frameWidth: 256, frameHeight: 256});
    }

    create(){
        const { previousHearts } = this.scene.settings.data;
        if(previousHearts == undefined){
            this.hearts = 3;
        }
        else{
            this.hearts = previousHearts;
        }
        console.log("Starting hearts: " + this.hearts);

        this.heroScore = 0;
        this.hitScore = 100; //pts for hitting a note
        this.buildLevel();
        this.scoreText = this.add.text(20, 20, 'Score ' + this.heroScore);
        //80 notes
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

        //timed end of level
        this.endOfLevel = this.time.addEvent({
            delay: 40000,
            callback: this.endLevel,
            callbackScope: this,
            loop: false
        });

        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()});

        this.events.on('resume', () => {this.song.resume()});
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
        this.add.image(336, 384, 'stage');
        this.add.image(672/2, 300, 'bass');
        this.add.image(245, 300, 'string');
        this.add.image(305, 300, 'string');
        this.add.image(365, 300, 'string');
        this.add.image(425, 300, 'string');
        //marks where player should hit notes
        this.add.image(400, 700, 'noteline');
        this.add.image(336, 1150, 'lvl_default_bg');

        //animated background
        this.shermieBass = this.add.sprite(70, 450, 'shermie_bass').setScale(0.8);
        
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

    updateScore(){
        this.scoreText.setText('Score: ' + this.heroScore);
    }
    
    checkNoteCollisions(){
        this.physics.overlap(this.string1Press, this.notesString1, (string1, note) => {
            string1.hit = true;
            this.string1Press.splice(this.string1Press.indexOf(string1), 1);
            note.destroy();
            this.notesString1.splice(this.notesString1.indexOf(note), 1);
            this.heroScore += this.hitScore;
            this.updateScore();
        });
        this.physics.overlap(this.string2Press, this.notesString2, (string2, note) => {
            string2.hit = true;
            this.string2Press.splice(this.string2Press.indexOf(string2), 1);
            note.destroy();
            this.notesString2.splice(this.notesString2.indexOf(note), 1);
            this.heroScore += this.hitScore;
            this.updateScore();
        });
        this.physics.overlap(this.string3Press, this.notesString3, (string3, note) => {
            string3.hit = true;
            this.string3Press.splice(this.string3Press.indexOf(string3), 1);
            note.destroy();
            this.notesString3.splice(this.notesString3.indexOf(note), 1);
            this.heroScore += this.hitScore;
            this.updateScore();
        });
        this.physics.overlap(this.string4Press, this.notesString4, (string4, note) => {
            string4.hit = true;
            this.string4Press.splice(this.string4Press.indexOf(string4), 1);
            note.destroy();
            this.notesString4.splice(this.notesString4.indexOf(note), 1);
            this.heroScore += this.hitScore;
            this.updateScore();
        });
    }

    endLevel(){
        this.lineNum = 0;
        if(this.heroScore >= 6000){
            this.line = this.add.text(100, 620, "Way to go! Extra life earned.");
            this.hearts += 1;
            console.log("End life: " + this.hearts);
        }
        else{
            this.line = this.add.text(100, 620, "Gotta keep practicing...");
        }
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.scene.start("night1", { previousHearts: this.hearts })});
    }

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
        this.song.pause();
    }
}