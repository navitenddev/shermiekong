//import Phaser from "phaser";

const gameStartDiv = document.querySelector("#gameStartDiv");
const gameStartBtn = document.querySelector("#gameStartBtn");
const gameEndDiv = document.querySelector("#gameEndDiv");
const gameWinLoseSpan = document.querySelector("#gameWinLoseSpan");
const gameEndScoreSpan = document.querySelector("#gameEndScoreSpan");

let game;

gameStartBtn.addEventListener("click", () => {
  gameStartDiv.style.display = "none";
  game = new Phaser.Game(config);
});

class GameScene {
  constructor(){
    this.player;
    this.cursors;
    this.playerSpeed = 300;
    this.target;
    this.points = 0;
    this.playerscore;
    this.textTime;
    this.timeEvent;
    this.remainingTime;
    this.coinMusic;
    this.bgMusic;
  }

  preload() {
    this.load.image('orchard', 'assets/orchard.png');
    this.load.image('shermie_basket', 'assets/shermie_basket.png');
    this.load.image('apple', 'assets/apple.png');
    this.load.audio('ding', 'assets/public_assets_coin.mp3');
  }

  create() {
    this.scene.pause("scene-game");
    this.coinMusic = this.sound.add('ding');

    this.add.image(336,384,'orchard');
    this.player = this.physics.add.image(630,713, 'shermie_basket').setScale(0.8);;
    this.player.setImmovable(true);
    this.player.body.allowGravity = false;
    this.player.setCollideWorldBounds(true);
    this.player.setSize(80,15).setOffset(10,70);

    this.target = this.physics.add.image(0, 0, 'apple').setScale(0.9);;
    this.target.setMaxVelocity(0, Phaser.Math.Between(400, 800));
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
    }
    else if (right.isDown){
      this.player.setVelocityX(this.playerSpeed);
    }
    else{
      this.player.setVelocityX(0);
    }
  }
  
  randomPos () {
    return Math.floor(Math.random() * 480);
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
          gameWinLoseSpan.textContent = "Win!";
      } else {
          gameWinLoseSpan.textContent = "Lose!";
      }
  
      gameEndScoreSpan.textContent = this.points;
      gameEndDiv.style.display = "flex";
  }
}

const config = {
  type: Phaser.WEBGL,
  width: 672,
  height: 768,
  canvas: gameCanvas,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [GameScene],
};

/*const game = new Phaser.Game(config);
gameStartBtn.addEventListener("click", () => {
  gameStartDiv.style.display="none"
  game.scene.resume("scene-game")
});*/