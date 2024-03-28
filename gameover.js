class GameOver extends Phaser.Scene{
    constructor(){
        super("GameOver");
    }

    preload(){
        this.load.image('game_over', 'assets/game_over.png');
        this.load.audio('game_over_sound', 'assets/game_over_sound.mp3');
    }

    create(){
        this.soundEffect = this.sound.add("game_over_sound");
        this.soundEffect.volume = 0.8;
        this.soundEffect.play();
        this.add.image(336, 470, 'game_over');
        this.add.image(336, 470, "main_menu_button")
        .setInteractive()
        .on('pointerdown', () => {this.scene.start("startScreen")});
    }
}