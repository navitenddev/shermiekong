class End extends Phaser.Scene{
    constructor(){
        super('end');
    }

    preload(){
        this.load.image('end_game', 'assets/end.png');
    }

    create(){
        this.add.image(336, 768/2, 'end_game');

        this.add.text(270, 500, 'Your Score: ' + this.game.gameState.scoringSystem.getScore());

        this.add.image(336, 600, "main_menu_button")
        .setInteractive()
        .on('pointerdown', () => {
            this.scene.start("startScreen");
        });
    }
}