class Interlude3 extends Phaser.Scene{
    constructor(){
        super("interlude3");
    }
    preload(){
        this.load.image('dialogue', 'assets/dialogue_box.png');
        this.load.image('maze', 'assets/shermie_maze.png');
    }

    create(){
        const { previousHearts } = this.scene.settings.data;
        console.log("interlude prev: " + previousHearts);
        this.hearts = previousHearts;

        this.background = this.add.image(336, 384, 'day');

        this.song = this.sound.add("song3");
        this.song.volume = 0.8;
        this.song.loop = true;
        this.song.play();

        // dialogue should pop up after a moment
        this.timedEvent = this.time.addEvent({
            delay: 1000,
            callback: this.dialogueInit,
            callbackScope: this,
            loop: false
        });

        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()}).setDepth(3);
    }

    dialogueInit(){
        this.lineNum = 0;
        this.line = this.add.text(100, 620, "Wow!");
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    mazeInit(){
        this.line = this.add.text(100, 620, 'Oh gosh. I forgot about the hedge maze I had\ninstalled.');
        this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
        .setInteractive()
        .on('pointerdown', () => {this.nextLine()});
    }

    levelTransition(skip){
        if(skip){
            this.song.stop();
            this.scene.start("night3", { previousHearts: this.hearts });
        }
        else{
            console.log("Maze minigame here");
            this.scene.start("mazeGame", { previousHearts: this.hearts });
        }
    }

    nextLine(){
        this.line.destroy();
        this.lineNum += 1;
        switch(this.lineNum){
            case 1:
                this.line = this.add.text(100, 620, "That dream was a wild one!");
                break;
            case 2:
                this.line = this.add.text(100, 620, "I wonder if it's a premonition of some kind...");
                break;
            case 3:
                this.line = this.add.text(100, 620, "Or an omen!"); 
                break;
            case 4:
                this.line = this.add.text(100, 620, "Or it might just mean I stay up too\nlate playing video games.");
                break;
            case 5:
                this.line = this.add.text(100, 620, "Well, let's start the day off right and check\nthe mail for the morning paper.");
                break;
            case 6:
                this.box.destroy();
                this.background = this.add.image(336, 384, 'maze');
                this.time.addEvent({
                    delay: 2000,
                    callback: this.mazeInit,
                    callbackScope: this,
                    loop: false
                });
                break;
            case 7:
                this.line = this.add.text(100, 620, "...You know, the news probably isn't all that\ninteresting today.");
                break;
            case 8:
                this.line = this.add.text(100, 620, "Oh come on Shermie! You going to let a little\nmaze get you down?");
                break;
            case 9:
                this.box.destroy();
                this.add.image(336, 600, "dialogue");
                this.add.text(100, 620, "<Get the mail later>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(true)}); //true for skipping the mini game
                this.add.text(100, 640, "<Go through maze>").setInteractive()
                .on('pointerdown', () => {this.levelTransition(false)});
                break;
        }
    }

    pause(){
        this.scene.launch('pause');
        this.scene.pause();
    }

}