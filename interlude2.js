class Interlude2 extends Phaser.Scene{
    constructor(){
        super("interlude2");
    }
    preload(){
        this.load.image('dialogue', 'assets/dialogue_box.png');
        this.load.audio('song1', 'assets/song1.mp3');
    }

    create(){
        const { previousHearts } = this.scene.settings.data;
        console.log("interlude prev: " + previousHearts);
        this.hearts = previousHearts;

        this.song = this.sound.add("song1");
        this.song.volume = 1;
        this.song.loop = true;
        this.song.play();

        // dialogue should pop up after a moment
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.dialogueInit,
            callbackScope: this,
            loop: false
        });

    }

    dialogueInit(){
        this.lineNum = 0;
        this.line = this.add.text(100, 620, "Another dream!");
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    levelTransition(skip){
        this.song.stop();
        if(skip){
            this.add.text(20, 20, "Level 3 under construction. Go pick apples.");
            //this.scene.start("level3", { previousHearts: this.hearts });
        }
        else{
            this.scene.start("AppleGame", { previousHearts: this.hearts });
        }
    }

    nextLine(){
        this.line.destroy();
        this.lineNum += 1;
        switch(this.lineNum){
            case 1:
                this.line = this.add.text(100, 620, "What could it mean?");
                break;
            case 2:
                this.line = this.add.text(100, 620, "<Shermie's stomach growls>");
                break;
            case 3:
                this.line = this.add.text(100, 620, "...maybe it means I'm hungry."); 
                break;
            case 4:
                this.line = this.add.text(100, 620, "I could outside and grab a few\napples from the orchard...");
                break;
            case 5:
                this.line = this.add.text(100, 600, "...or just order pizza delivery.");
                break;
            case 6:
                this.box.destroy();
                this.add.image(336, 600, "dialogue");
                this.add.text(100, 620, "<Order pizza>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(true)}); //true for skipping the mini game
                this.add.text(100, 640, "<Pick apples>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(false)});
                break;
        }
    }

}