function AtDanceGame() {

	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tables;

	//player
	var player;

	function init() {

		BOARD_HEIGHT = 600;
		BOARD_WIDTH = 800;

		//table
		tables = null;
		tableCount = 1;

	}

	function preload() {

		game.load.image('tableImg', 'assets/ADG_table.png');
		game.load.image('enemyImg', 'assets/ADG_couple.png')
		game.load.image('playerImg', 'assets/ADG_player.png');

	}

	function create() {

		//enables Physics
		game.physics.startSystem(Phaser.Physics.ARCADE);

		//tables
		tables = game.add.group();
		tables.name = 'tables';
		tables.enableBody = true;

		for (var i = 0; i < tableCount; i ++) {
			table = tables.create(game.rnd.realInRange(0, BOARD_WIDTH), game.rnd.realInRange(0, BOARD_HEIGHT-25), 'tableImg');
			table.body.collideWorldBounds = true;
			table.body.immovable = true;
		}

		//draws player
		player = game.add.sprite(10, BOARD_HEIGHT/2 - 12.5, 'playerImg');
		player.name = 'player';
		game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
		player.body.allowGravity = false;
		player.body.collideWorldBounds = true;
		player.body.velocity = 10;

	}

	function update() {

		if (!game.physics.arcade.collide(player, tables)) {
			updatePlayer();
		} else {
			console.log('collision detected');
		}

	}

	function shutdown() {
		player.destroy();
	}

	function updatePlayer() {

		//mouse following
		var yDistance = game.input.mousePointer.y - player.y;
		var xDistance = game.input.mousePointer.x - player.x;
		if (Math.sqrt(yDistance*yDistance +  xDistance*xDistance) < player.body.velocity) {
			//prevents jitter when sprite is at mouse location
			player.x = game.input.mousePointer.x;
			player.y = game.input.mousePointer.y;
		} else {
			//points sprite in direction of mouse and moves it based on speed
			var directionAngle = game.math.angleBetween(player.x, player.y, game.input.mousePointer.x, game.input.mousePointer.y);
			player.angle = directionAngle * 180 / Math.PI;
			player.x += Math.cos(directionAngle) * player.body.velocity;
			player.y += Math.sin(directionAngle) * player.body.velocity;
		}

	}

	return {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}