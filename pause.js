class Pause extends Phaser.Scene{
    constructor(){
        super('pause');
    }

    preload(){
        this.load.image('pause_menu', 'assets/pause_menu.png');
        this.load.image('resume', 'assets/resume.png');
        this.load.image('audio_off', 'assets/audio_off.png');
        this.load.image('audio_on', 'assets/audio_on.png');
    }

    create(){
        this.scene.bringToTop('pause'); 
        this.add.image(672/2, 768/2, 'pause_menu');

        this.add.image(672/2, 250, 'resume')
        .setInteractive()
        .on('pointerdown', () => {this.resumeGame()});

        this.add.image(672/2, 330, 'main_menu_button')
        .setScale(0.7)
        .setInteractive()
        .on('pointerdown', () => {this.goToMain()});

        this.add.image(672/2, 430, 'how_to_play')
        .setInteractive()
        .on('pointerdown', () => {this.scene.launch('howTo')});

        if(this.game.sound.mute){
            this.audioButton = this.add.image(672/2, 550, 'audio_off')
            .setInteractive()
            .on('pointerdown', () => {this.toggleAudio()});
        }
        else{
            this.audioButton = this.add.image(672/2, 550, 'audio_on')
            .setInteractive()
            .on('pointerdown', () => {this.toggleAudio()});
        }
    }

    resumeGame(){
        //fundamentally silly way to do it but I don't know how to access the scene manager.
        //that being said we dont need to pause the main menu or game over scenes
        var scenes = ['level1', 'level2', 'level3', 'level4',
        'night1', 'night2', 'night3', 
        'intro', 'interlude1', 'interlude2', 'interlude3',
        'ShermieHero', 'AppleGame', 'mazeGame'];

        for(var i = 0; i < scenes.length; i++){
            if(this.scene.isPaused(scenes[i])){
                this.scene.resume(scenes[i]);
            }
        }

        this.scene.stop('pause');
    }

    toggleAudio(){
        if(this.game.sound.mute){
            this.game.sound.mute = false;
            this.audioButton.destroy();
            this.audioButton = this.add.image(672/2, 550, 'audio_on')
            .setInteractive()
            .on('pointerdown', () => {this.toggleAudio()});
        }
        else{
            this.game.sound.mute = true;
            this.audioButton.destroy();
            this.audioButton = this.add.image(672/2, 550, 'audio_off')
            .setInteractive()
            .on('pointerdown', () => {this.toggleAudio()});
        }
    }

    goToMain(){
        this.game.sound.stopAll();

        var scenes = ['level1', 'level2', 'level3', 'level4',
        'night1', 'night2', 'night3', 
        'intro', 'interlude1', 'interlude2', 'interlude3',
        'ShermieHero', 'AppleGame', 'mazeGame'];

        for(var i = 0; i < scenes.length; i++){
            if(this.scene.isPaused(scenes[i])){
                this.scene.stop(scenes[i]);
            }
        }
        this.scene.start('startScreen');

        this.scene.stop('pause');
    }
}