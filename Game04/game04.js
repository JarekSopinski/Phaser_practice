// tools - normal items with randomized textures, they give 1 to 5 points (random value)
// diamonds - exclusive items, are more rare than tools but always give 100 points

const game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

let platforms;
let player;
let cursors;
let diamonds;
let diamond;
let tools;
let tool;
let gameScore = 0;
let scoreText;


function preload() {

    game.load.image('sky', '../assets/sky.png');
    game.load.image('ground', '../assets/platform.png');
    game.load.spritesheet('dude', '../assets/dude.png', 32, 48); // spritesheet, nie image!!!
    game.load.image('diamond', '../assets/diamond.png');

    //tools:

    game.load.image('drill', '../assets/tools/drill.PNG');
    game.load.image('hammer', '../assets/tools/hammer.PNG');
    game.load.image('pincers', '../assets/tools/pincers.PNG');
    game.load.image('screwdriver', '../assets/tools/screwdriver.PNG');
    game.load.image('wrench', '../assets/tools/wrench3.PNG');

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

    diamonds = game.add.group();
    diamonds.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND * 2, spawnDiamonds, this);
    // if more seconds, the item will be more rare

    tools = game.add.group();
    tools.enableBody = true;
    game.time.events.loop(Phaser.Timer.SECOND, spawnTools, this);


    cursors = game.input.keyboard.createCursorKeys();
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

};

function update() {


    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, diamonds, collectDiamonds, null, this);
    game.physics.arcade.overlap(player, tools, collectTools, null, this);


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

        player.body.velocity.y = -450;

    };


};

function spawnDiamonds() {

    // randomizing spawning interval
    const randomNum = Math.floor(Math.random() * 10); // if this number is bigger, item will be more rare
    if (randomNum === 1) { // diamonds spawn only 3 to 10 times

        diamond = diamonds.create(800, game.world.height - 380, 'diamond');
        // height is hardcoded, so the diamond doesn't overlap with tools (always will spawn above tools)
        diamond.body.velocity.x = -200;

    }

};

function collectDiamonds(player, diamond) {

    diamond.kill();
    gameScore += 100;
    // diamond is exclusive item, so it give +100 to score (while tools give only +1)
    scoreText.text = 'Score: ' + gameScore;

};

function spawnTools() {

    //generating random tool texture
    const toolsArray = ['drill', 'hammer', 'pincers', 'screwdriver', 'wrench'];
    const randomTool = toolsArray[Math.floor(Math.random() * toolsArray.length)];

    //randomizing height
    const maxHeight = 350;
    const minHeight = 200;
    const randomHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;

    //randomizing spawning interval
    const randomNum = Math.random() * 10;
    if (randomNum >= 3) {

        tool = tools.create(800, game.world.height - randomHeight, randomTool);
        tool.scale.setTo(0.5,0.5);
        tool.body.velocity.x = -200;

    };

};

function collectTools(player, tool) {

    tool.kill();
    gameScore += Math.floor(Math.random() * 10);
    scoreText.text = 'Score: ' + gameScore;

};