// level1.js
class Level1 extends Level {
    constructor(scene) {
        super(scene);
    }

    buildLevel() {
        this.createBackground();
        this.createEntities();
    }

    create() {
        // Set up collision between player and the barrel
        this.scene.physics.add.collider(currentLevel.player.sprite, currentLevel.barrel.sprite, this.handleCollision, null, this);
    }

    update() {
        this.player.update();
        this.barrel.update();
    }

    // Override createBackground method for Level 1
    createBackground() {
        //this.scene.add.image(400, 300, 'lvl_1_bg');
    }

    createEntities() {
        this.player = new Player(this.scene, 100, 450);
        this.barrel = new Barrel(this.scene, 600, 200);

        var floor = this.scene.physics.add.staticGroup();
        // 1st floor
        var x = 24;
        for (let i = 0; i < 7; i++){
            floor.create(x, 756, 'girder');
            x = x + 48
        }
        x = 360;
        var y = 753;
        for (let i = 0; i < 7; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 2nd floor
        x = 600;
        y = 669;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 3rd floor
        x = 72;
        y = 567;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 4th floor
        x = 600;
        y = 465;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x - 48;
            y = y - 3;
        }

        // 5th floor
        x = 72;
        y = 363;
        for (let i = 0; i < 13; i++){
            floor.create(x, y, 'girder');
            x = x + 48;
            y = y - 3;
        }

        // 6th floor
        floor.create(600, 261, 'girder');
        floor.create(552, 258, 'girder');
        floor.create(504, 255, 'girder');
        floor.create(456, 252, 'girder');
        x = 408;
        for (let i = 0; i < 9; i++){
            floor.create(x, 249, 'girder');
            x = x - 48;
        }

        this.scene.physics.add.collider(this.player.sprite, floor);
        this.scene.physics.add.collider(this.barrel.sprite, floor);

        var ladders = this.scene.physics.add.staticGroup();
        ladders.create(425, 700, 'ladder');
        ladders.create(225, 500, 'ladder');

        this.scene.physics.add.collider(ladders, floor);

        // Add an overlap event to detect when the player is on the ladder
        this.scene.physics.add.overlap(this.player.sprite, ladders, this.handlePlayerClimbing, null, this);
    }

    handlePlayerClimbing() {
        this.player.isClimbing = true;
    }

    
    handleCollision(player, barrel) {
        // Perform specific actions when the player collides with a barrel
        barrel.onCollision(player);
        player.onCollision(barrel);
    }
}
