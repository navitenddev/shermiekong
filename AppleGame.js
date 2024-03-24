class AppleGame extends Phaser.Scene {
  constructor(){
    super('AppleGame');
  }

  preload() {
    this.load.image('orchard', 'assets/orchard.png');
    this.load.image('shermie_basket', 'assets/shermie_basket.png');
    this.load.image('apple', 'assets/apple.png');
    this.load.audio('ding', 'assets/collect_sound.mp3');
    this.load.spritesheet('basket',
        'assets/shermie_basket_walk.png',
        { frameWidth: 128, frameHeight: 128 });
  }

  create() {
    this.player;
    this.cursors;
    this.playerSpeed = 500;
    this.target;
    this.points = 0;
    this.playerscore;
    this.textTime;
    this.timeEvent;
    this.remainingTime;
    this.coinMusic;
    this.bgMusic;

    this.scene.pause("scene-game");
    this.coinMusic = this.sound.add('ding');

    this.add.image(336,384,'orchard');
    this.player = this.physics.add.sprite(630, 690, 'basket');
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player.setSize(80,15).setOffset(10,70);

    this.target = this.physics.add.image(0, 0, 'apple').setScale(0.7);
    this.target.setMaxVelocity(0, 750);
    this.physics.add.overlap(this.target, this.player, this.score, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.playerscore = this.add.text(475, 20, "Score: 0" , {
      font: "25px Arial",
      fill: "#000000",
    });

    this.textTime = this.add.text(40, 20, "Remaining Time: 00", {
      font: "25px Arial",
      fill: "#000000",
    });

    this.timeEvent = this.time.delayedCall(30000, this.gameOver, [], this);
    
    //animation
    this.facing = true;
    this.anims.create({
      key: 'b_left',
      frames: this.anims.generateFrameNumbers('basket', { start: 0, end: 2 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
        key: 'b_faceLeft',
        frames: [ { key: 'basket', frame: 0 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'b_faceRight',
        frames: [ { key: 'basket', frame: 3 } ],
        frameRate: 20
    });
  
    this.anims.create({
        key: 'b_right',
        frames: this.anims.generateFrameNumbers('basket', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
  }

  update() {
    this.remainingTime = Math.max(0, (this.timeEvent.delay - this.timeEvent.elapsed) / 1000);
    this.textTime.setText(`Remaining Time: ${Math.round(this.remainingTime).toString()}`);

    if (this.target.y > 760){
      this.target.setY(0);
      this.target.setX(this.randomPos())
    }
    const {left, right} = this.cursors

    if(left.isDown){
      this.player.setVelocityX(-this.playerSpeed);
      this.player.anims.play('b_left', true);
      this.facing = true;
    }
    else if (right.isDown){
      this.player.setVelocityX(this.playerSpeed);
      this.player.anims.play('b_right', true);
      this.facing = false;
    }
    else{
      this.player.setVelocityX(0);
      if(this.facing){
        this.player.anims.play('b_faceLeft');
      }
      else{
        this.player.anims.play('b_faceRight');
      }
    }
  }
  
  randomPos () {
    return Math.floor(Math.random() * 630);
  };

  score () {
    this.coinMusic.play();
    this.target.setY(0);
    this.target.setX(this.randomPos())
    this.points++;
    this.playerscore.setText(`Score: ${this.points}`);
  };

  gameOver (){
      if (game) {
          game.scene.pause();
          game.scene.remove("scene-game");
          game.destroy();
      }
  
      if (this.points >= 10) {
          this.add.text(300, 300, "Win!", {font: '64px'}).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
      } else {
          this.add.text(100, 300, "Better luck next time!", {font: '40px'}).setTint(0xff00ff, 0xffff00, 0x0000ff, 0xff0000);
      }
  
      // gameEndScoreSpan.textContent = this.points;
      // gameEndDiv.style.display = "flex";
  }
}


