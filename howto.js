class HowTo extends Phaser.Scene{
    constructor(){
        super('howTo');
    }

    preload(){
        this.load.image('how_to_play_screen', 'assets/how_to_play_screen.png');
        this.load.image('how_to_hero', 'assets/how_to_hero.png');
        this.load.image('how_to_apple', 'assets/how_to_apple.png');
        this.load.image('exit_button', 'assets/exit_button.png');
        this.load.image('next_button', 'assets/next_button.png');
    }

    create(){
        this.scene.bringToTop('howTo');
        this.instructionSet = 0;
        this.instruction = this.add.image(672/2, 768/2, 'how_to_play_screen');
        
        this.add.image(150, 590, 'exit_button')
        .setDepth(10)
        .setInteractive()
        .on('pointerdown', () => {this.handleExit()});
        
        this.add.image(515, 590, 'next_button')
        .setDepth(10)
        .setInteractive()
        .on('pointerdown', () => {this.nextInstruction()});

    }

    nextInstruction(){
        this.instructionSet += 1;
        switch(this.instructionSet){
            case 1:
                this.instruction = this.add.image(672/2, 768/2, 'how_to_hero');
                break;
            case 2:
                this.instruction = this.add.image(672/2, 768/2, 'how_to_apple');
                break;
        }
    }

    handleExit(){
        if(this.scene.isPaused('startScreen')){
            this.scene.resume('startScreen');
        }
        this.scene.stop('howTo');
    }

}