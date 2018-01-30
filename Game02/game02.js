const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let platforms;
let player;
let cursors;
let diamonds;
let monsters;



function preload() {

    game.load.image('sky', '../assets/sky.png');
    game.load.image('ground', '../assets/platform.png');
    game.load.spritesheet('dude', '../assets/dude.png', 32, 48); // spritesheet, nie image!!!
    game.load.image('diamond', '../assets/diamond.png');
    game.load.image('monster', '../assets/dragon.png');

};

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.add.sprite(0, 0, 'sky');

    platforms = game.add.group();
    platforms.enableBody = true;

    const ground = platforms.create(0, game.world.height - 64, 'ground');
    ground.scale.setTo(2, 2,);
    ground.body.immovable = true;

    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.physics.arcade.enable(player);

    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    player.animations.add('left', [0, 1, 2, 3], 10, true);
    player.animations.add('right', [5, 6, 7, 8], 10, true);

    // PRIZES

    setInterval(function(){

        const randomNum1To10 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        if (randomNum1To10 <= 1) {

            // If we want to randomize speed:
            /*
            const minSpeed = 100;
            const maxSpeed = 200;
            const randomSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;
            */

            diamonds = game.add.group();
            diamonds.enableBody = true;

            let diamond = diamonds.create(800, game.world.height - 300, 'diamond');
            diamond.body.velocity.x = -200;

        }

    }, 200);

    // MONSTERS

    setInterval(function(){

        const randomNum1To10 = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

        if (randomNum1To10 <= 2) {


            const minSpeed = 100;
            const maxSpeed = 200;
            const randomSpeed = Math.floor(Math.random() * (maxSpeed - minSpeed + 1)) + minSpeed;

            monsters = game.add.group();
            monsters.enableBody = true;

            let monster = monsters.create(800, game.world.height - 100, 'monster');
            monster.body.velocity.x = -randomSpeed;

        }

    }, 400);


    cursors = game.input.keyboard.createCursorKeys();

};

function update() {


    game.physics.arcade.collide(player, platforms);


    player.body.velocity.x = 0;

    if (cursors.left.isDown) {

        player.body.velocity.x = - 150;
        player.animations.play('left');

    } else if (cursors.right.isDown) {

        player.body.velocity.x = 150;
        player.animations.play('right');

    } else {

        player.animations.stop();
        player.frame = 4;

    };


    if (cursors.up.isDown && player.body.touching.down) {

        player.body.velocity.y = -400;

    };


};
