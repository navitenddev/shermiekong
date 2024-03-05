class MainMenu extends Phaser.Scene{
    constructor(){
        super("startScreen");
    }
    //note: may need to move these to individual load screens before levels
    preload() {
        // Level Backgrounds
        this.load.image('lvl_default_bg', 'assets/lvl-default-bg.png');
        this.load.image('lvl_1_bg', 'assets/lvl-1-bg.png');
        //minigame assets
        this.load.image('minigame1_bg', 'assets/minigame1-bg.png');
        this.load.image('bass', 'assets/bass.png');
        this.load.image('string', 'assets/string.png');
        this.load.image('noteline', 'assets/noteline.png');
        this.load.audio('shermieHero', 'assets/shermie_hero.ogg');
        this.load.image('left', 'assets/left_arrow.png');
        this.load.image('right', 'assets/right_arrow.png');
        this.load.image('down', 'assets/down_arrow.png');
        this.load.image('up', 'assets/up_arrow.png');

        // Level Entities
        this.load.image('wolf', 'assets/wolf.png');
        this.load.image('platform', 'assets/platform.png');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('girder', 'assets/girder.png');
        this.load.image('ladder', 'assets/ladder.png');
    }

    create(){
        this.add.text(20, 20, "Press SPACE to start");
        this.space = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    
    update(){
        if(Phaser.Input.Keyboard.JustDown(this.space)){
            this.scene.start("ShermieHero");
        }
    }

}