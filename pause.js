class Pause extends Phaser.Scene{
    constructor(){
        super('pause');
    }

    preload(){
        this.load.image('pause_menu', 'assets/pause_menu.png');
        this.load.image('resume', 'assets/resume.png');
    }

    create(){
        this.scene.bringToTop('pause'); 
        this.add.image(672/2, 768/2, 'pause_menu');
        this.add.image(672/2, 300, 'resume')
        .setInteractive()
        .on('pointerdown', () => {this.resumeGame()});
    }

    resumeGame(){
        //fundamentally silly way to do it but I don't know how to access the scene manager
        var scenes = ['level1', 'level2', 'level3', 
        'night1', 'night2', 
        'intro', 'interlude1', 'interlude2', 
        'ShermieHero', 'AppleGame'];

        for(var i = 0; i < scenes.length; i++){
            if(this.scene.isPaused(scenes[i])){
                this.scene.resume(scenes[i]);
            }
        }

        this.scene.stop('pause');
    }
}