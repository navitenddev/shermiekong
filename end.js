class End extends Phaser.Scene{
    constructor(){
        super('end');
    }

    preload(){
        this.load.image('end_game', 'assets/end.png');
        this.load.audio('victory', 'assets/victory.mp3');
    }

    create(){
        this.soundEffect = this.sound.add("victory");
        this.soundEffect.volume = 0.7;
        this.soundEffect.play();
        this.add.image(336, 768/2, 'end_game');

        this.add.text(270, 500, 'Your Score: ' + this.game.gameState.scoringSystem.getScore());

        this.add.image(336, 600, "main_menu_button")
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start("startScreen");
        });
    }
}