class MazeGame extends Phaser.Scene {
    constructor() {
        super("mazeGame");
    }

    preload() {
        // Load your assets here
        this.load.image('background', 'assets/grass.jpeg');
        this.load.image('player', 'assets/shermie.png');
        this.load.image('maze_barrier', 'assets/bush.png');
    }

    create() {
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

        this.player = this.physics.add.sprite(100, 700, 'player');
        this.cursors = this.input.keyboard.createCursorKeys();
        this.player.setScale(0.20);  // Scale down the player
        this.player.setCollideWorldBounds(true);  // Add collider bounds with the game screen
        this.player.body.updateFromGameObject();
        this.player.body.setGravityY(0);  // Remove gravity from the player
        this.createMaze();
    }

    update() {
        // Player movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
        } else {
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
    
        // Maze layout
        var layout = [
            '####################',
            '#P                 #',
            '# ###### ###########',
            '# #    # #         #',
            '# # ## # # ####### #',
            '# # ## # # #     # #',
            '# #    #   # ### # #',
            '# ######### ### # # #',
            '#           #   #   #',
            '###################E#'
        ];
    
        // Calculate the size of each cell to fit the game scale
        var cellWidth = (this.sys.canvas.width * 0.8) / layout[0].length;  // Make the maze slightly smaller
        var cellHeight = (this.sys.canvas.height * 0.8) / layout.length;  // Make the maze slightly smaller
    
        // Create maze based on layout
        for (let y = 0; y < layout.length; y++) {
            for (let x = 0; x < layout[y].length; x++) {
                if (layout[y][x] === '#') {
                    let barrier;
                    if (y === 0 || y === layout.length - 1 || x === 0 || x === layout[y].length - 1) {
                        // Create the edge of the maze with no gaps between the barriers
                        barrier = maze.create((x * cellWidth + cellWidth / 2) * 1.2, (y * cellHeight + cellHeight / 2) * 1.2, 'maze_barrier');
                        barrier.setScale(0.05);
                    } else {
                        // Create the interior of the maze with gaps between the barriers
                        barrier = maze.create((x * cellWidth + cellWidth / 2) * 1.2, (y * cellHeight + cellHeight / 2) * 1.2, 'maze_barrier');
                        barrier.setScale(0.025);  // Scale down the barriers
                    }
                    barrier.body.updateFromGameObject();
                }
            }
        }
    
        // Add collision between the player and the maze
        this.physics.add.collider(this.player, maze);
    }
}
