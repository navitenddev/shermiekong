class MazeGame extends Phaser.Scene {
    constructor() {
        super("mazeGame");

        this.facing = true;
    }

    preload() {
        // Load your assets here
        this.load.image('background', 'assets/grass.jpeg');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('maze_barrier', 'assets/bush.png');
    }

    create() {
        this.physics.world.gravity.y = 0;

        //animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'faceLeft',
            frames: [ { key: 'player', frame: 0 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'faceRight',
            frames: [ { key: 'player', frame: 3 } ],
            frameRate: 20
        });
        
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        const { previousHearts } = this.scene.settings.data;
        if(previousHearts == undefined){
        this.hearts = 3;
        }
        else{
        this.hearts = previousHearts;
        }

        // Add the background image
        let background = this.add.image(336, 384, 'background');
        background.setDisplaySize(this.sys.canvas.width, this.sys.canvas.height);

        //pause button
        this.add.image(625, 40, 'pause_button')
        .setScale(0.5)
        .setInteractive()
        .on('pointerdown', () => {this.pause()});

        this.player = new Player(this, 73, 155, 3, 200, 350);
        // Hide the hearts display
        this.player.heartsArray.forEach(heart => heart.setVisible(false));
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setScale(0.17);  // Scale down the player
        this.player.setCollideWorldBounds(true);  // Add collider bounds with the game screen
        this.player.body.updateFromGameObject();
        this.player.body.setGravityY(0);  // Remove gravity from the player
        this.createMaze();
    }

    update() {
        if (this.cursors.left.isDown) {
            this.facing = true; //take true = was last walking left and false = was last walking right
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
        }
        else if (this.cursors.right.isDown) {
            this.facing = false;
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
        }
        else {
            this.player.setVelocityX(0);
        }

        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-200);
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(200);
        } else {
            this.player.setVelocityY(0);
        }
    }

    createMaze() {
        var maze = this.physics.add.staticGroup();
    
        // Define the size of the maze
        var mazeWidth = 25, mazeHeight = 24;
    
        // Create an empty maze
        var mazeMatrix = [];
        for (let i = 0; i < mazeHeight; i++) {
            mazeMatrix[i] = [];
            for (let j = 0; j < mazeWidth; j++) {
                mazeMatrix[i][j] = 'W'; // Initialize all cells as walls
            }
        }
    
        // Define the starting point (entrance)
        var startX = 1, startY = 1;
        mazeMatrix[startY][startX] = ' '; // Set the starting cell as a path
    
        // Define the ending point (exit)
        var endX = 21, endY = 18;
        mazeMatrix[endY][endX] = ' '; // Set the ending cell as a path
    
        // Recursive function to carve the maze
        function carve(x, y, depth = 0) {
            if (depth > 1000) return; // Stop the recursion after 1000 steps

            var directions = [[-1, 0], [1, 0], [0, -1], [0, 1]]; // 4 possible directions: up, down, left, right
            directions.sort(() => Math.random() - 0.5); // Randomize the directions

            for (let [dx, dy] of directions) {
                var nx = x + dx * 2, ny = y + dy * 2;

                if (nx > 0 && nx < mazeWidth - 1 && ny > 0 && ny < mazeHeight - 1 && (mazeMatrix[ny][nx] === 'W' || Math.random() < 0.0001)) {
                    mazeMatrix[y + dy][x + dx] = ' '; // Carve a path
                    mazeMatrix[ny][nx] = ' '; // Carve a path
                    carve(nx, ny, depth + 1); // Recursively carve the next cell

                    // Sometimes backtrack and carve a dead-end path
                    if (Math.random() < 0.0001) {
                        carve(nx - dx, ny - dy, depth + 1);
                    }
                }
            }
        }
    
        carve(startX, startY); // Start carving the maze from the entrance
        carve(endX, endY); // Start carving the maze from the exit
    
        // Create the maze in Phaser based on the maze matrix
        for (let i = 0; i < mazeHeight; i++) {
            for (let j = 0; j < mazeWidth; j++) {
                if (mazeMatrix[i][j] === 'W') {
                    let barrier = maze.create(50 + j * 24, 130 + i * 24, 'maze_barrier');
                    barrier.setScale(0.04);
                    barrier.body.updateFromGameObject();
                }
            }
        }
    
        // Add the flag at the exit of the maze
        this.flag = this.physics.add.sprite(53 + 23 * 24, 130 + 21 * 24, 'flag');
        this.flag.setScale(0.75);
        // Add overlap between the player and the flag
        this.physics.add.overlap(this.player, this.flag, this.nextLevel, null, this);

        // Add collision between the player and the maze
        this.physics.add.collider(this.player, maze);
    }

    nextLevel(player, flag){
        //this.song.stop();
        console.log("next: " + this.player.hearts);
        // // Add a 6 second delay before starting the LevelSelect scene
        // this.time.delayedCall(6000, () => {
        //     this.scene.start("LevelSelect", { previousHearts: this.player.hearts });
        // });
        this.hearts += 1;
        this.scene.start("night3", { previousHearts: this.hearts }); 
    }

    gameOver() {
        // Display a success message
        this.line = this.add.text(100, 620, "Congratulations! You've successfully navigated the maze.");
        this.hearts += 1;
        console.log("num hearts: " + this.hearts);
    
        /*this.line.setDepth(3);
        this.box = this.add.image(336, 600, "dialogue")
            .setInteractive()
            .on('pointerdown', () => {
                this.sound.get('song3').stop();
                this.scene.start("night2", { previousHearts: this.hearts });
            });*/
    }
    
      pause(){
        this.scene.launch('pause');
        this.scene.pause();
      }
}
