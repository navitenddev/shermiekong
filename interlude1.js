class Interlude1 extends Phaser.Scene{
    constructor(){
        super("interlude1");
    }
    preload(){
        this.load.image('dialogue', 'assets/dialogue_box.png');
        this.load.audio('song2', 'assets/song2.mp3');
    }

    create(){
        const { previousHearts } = this.scene.settings.data;
        console.log("interlude prev: " + previousHearts);
        this.hearts = previousHearts;

        this.song = this.sound.add("song2");
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
        this.line = this.add.text(100, 620, "What a weird dream!");
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    levelTransition(skip){
        this.song.stop();
        if(skip){
            this.scene.start("level2", { previousHearts: this.hearts });
        }
        else{
            this.scene.start("ShermieHero", { previousHearts: this.hearts });
        }
    }

    nextLine(){
        this.line.destroy();
        this.lineNum += 1;
        switch(this.lineNum){
            case 1:
                this.line = this.add.text(100, 620, "It was like I was in a retro video game of\nsome sort...");
                break;
            case 2:
                this.line = this.add.text(100, 620, "The machinations of the brain never cease to amaze.");
                break;
            case 3:
                this.line = this.add.text(100, 620, "Now I gotta get to band practice."); 
                break;
            case 4:
                this.line = this.add.text(100, 620, "...or I could skip it and get some rest.");
                break;
            case 5:
                this.line = this.add.text(100, 600, "<Between levels, you will have the opportunity\nto play a mini game. If you perform well in the\nmini game, you'll earn an extra life in\nShermie-Kong!>");
                break;
            case 6:
                this.box.destroy();
                this.add.image(336, 600, "dialogue");
                this.add.text(100, 620, "<Get some rest>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(true)}); //true for skipping the mini game
                this.add.text(100, 640, "<Go to band practice>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(false)});
                break;
        }
    }

}