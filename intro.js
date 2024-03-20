class Intro extends Phaser.Scene{
    constructor(){
        super("intro");
    }
    preload(){
        this.load.image('dialogue', 'assets/dialogue_box.png');
        this.load.audio('song1', 'assets/song1.mp3');
    }

    create(){
        this.add.image(336, 384, 'night');
        this.song = this.sound.add("song1");
        this.song.volume = 1;
        this.song.loop = true;
        this.song.play();

        // dialogue should pop up after a moment
        this.timedEvent = this.time.addEvent({
            delay: 2000,
            callback: this.dialogueInit,
            callbackScope: this,
            loop: false
        });

    }

    dialogueInit(){
        this.lineNum = 0;
        this.line = this.add.text(100, 620, "<Click anywhere on the dialogue box to continue>");
        this.line.setDepth(3);
        this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    nextLine(){
        this.line.destroy();
        this.lineNum += 1;
        switch(this.lineNum){
            case 1:
                this.line = this.add.text(100, 620, "Wow, what a week!");
                break;
            case 2:
                this.line = this.add.text(100, 620, "TGIF though, haha!");
                break;
            case 3:
                this.line = this.add.text(100, 620, "Boy am I tired!"); 
                break;
            case 4:
                this.line = this.add.text(100, 620, "And I have band practice tomorrow...");
                break;
            case 5:
                this.line = this.add.text(100, 620, "Hm. Well, better get to bed.");
                break;
            case 6:
                this.song.stop();
                this.scene.start('level1');
                break;
        }
    }
}