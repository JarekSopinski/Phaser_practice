const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let platforms;
let player;
let cursors;
let items;
let item;
let gameScore = 0;
let scoreText;


function preload() {

    game.load.image('sky', '../assets/sky.png');
    game.load.image('ground', '../assets/platform.png');
    game.load.spritesheet('dude', '../assets/dude.png', 32, 48); // spritesheet, nie image!!!
    game.load.image('diamond', '../assets/diamond.png');

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
    items = game.add.group();
    items.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND, spawnItem, this);


    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

};

function update() {


    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, items, collectItem, null, this);


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

function spawnItem() {


    const randomNum = Math.random() * 10;

    const maxHeight = 400;
    const minHeight = 200;
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    if (randomNum >= 3) {

        item = items.create(800, game.world.height - randomHeight, 'diamond');
        item.body.velocity.x = -200;

    }

}

function collectItem(player, item) {

    item.kill();
    gameScore ++;
    scoreText.text = 'Score: ' + gameScore;
    console.log(gameScore);

}