class MainMenu extends Phaser.Scene{
    constructor(){
        super("startScreen");
    }
    //note: may need to move these to individual load screens before levels
    preload() {
        //Shermie
        this.load.spritesheet('player',
        'assets/shermie_walk.png',
        { frameWidth: 128, frameHeight: 84 });

        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');

        // Level Entities
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('shermie', 'assets/shermie.png');
        this.load.image('girder', 'assets/girder.png');
        this.load.image('ladder', 'assets/ladder.png');

        //Menu screen assets
        this.load.image('logo', 'assets/logo.png');
        this.load.image('start', 'assets/start_button.png');
        this.load.image('levels', 'assets/levels_button.png');

        //Music
        this.load.audio('chiptune1', 'assets/chiptune1.mp3');
        this.load.audio('chiptune2', 'assets/chiptune2.mp3');
        this.load.audio('chiptune3', 'assets/chiptune3.mp3');
        this.load.audio('song1', 'assets/song1.mp3');
        this.load.audio('song2', 'assets/song2.mp3');

        //Shermie hero
        this.load.image('minigame1_bg', 'assets/minigame1-bg.png');
        this.load.image('bass', 'assets/bass.png');
        this.load.image('string', 'assets/string.png');
        this.load.image('noteline', 'assets/noteline.png');
        this.load.audio('shermieHero', 'assets/shermie_hero.mp3');
        this.load.image('left', 'assets/left_arrow.png');
        this.load.image('right', 'assets/right_arrow.png');
        this.load.image('down', 'assets/down_arrow.png');
        this.load.image('up', 'assets/up_arrow.png');
        this.load.spritesheet('shermie_bass', 'assets/shermie-bass.png', 
        {frameWidth: 256, frameHeight: 256});

        // Level end marker
        this.load.image('flag', 'assets/flag.png');
    }

    create(){
        this.add.image(336, 200, "logo");
        this.add.image(330, 340, "shermie");

        this.add.image(336, 470, "start")
        .setScale(.8)
        .setInteractive()
        .on('pointerdown', () => {this.scene.start("level1")});

        this.add.image(336, 600, "levels").setInteractive()
        .on('pointerdown', () => {this.scene.start("LevelSelect")});

        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.space)){
            this.scene.start("ShermieHero");
        }
    }

}