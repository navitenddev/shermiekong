class Night2 extends Phaser.Scene{
    constructor(){
        super("night2");
    }
    preload(){
        this.load.image('dialogue', 'assets/dialogue_box.png');
    }

    create(){
        const { previousHearts } = this.scene.settings.data;
        console.log("interlude prev: " + previousHearts);
        this.hearts = previousHearts;

        this.add.image(336, 384, 'night');

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
        this.line = this.add.text(100, 620, "What a day!");
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    nextLine(){
        this.line.destroy();
        this.lineNum += 1;
        switch(this.lineNum){
            case 1:
                this.line = this.add.text(100, 620, "Nothing like a warm bed after a long day!");
                break;
            case 2:
                this.song.stop();
                this.scene.start('level3', { previousHearts: this.hearts });
                break;
        }
    }

}