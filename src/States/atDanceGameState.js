function AtDanceGame() {

	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tables;

	//enemies
	var enemyCount;
	var enemies;

	//player
	var player;

	function init() {

		BOARD_HEIGHT = 600;
		BOARD_WIDTH = 800;

		//table
		tables = null;
		tableCount = 5;

		//enemycouples
		enemies = null;
		enemyCount = 5;

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
			var table = tables.create(game.rnd.realInRange(0, BOARD_WIDTH), game.rnd.realInRange(0, BOARD_HEIGHT-25), 'tableImg');
			table.body.collideWorldBounds = true;
			table.body.immovable = true;
		}

		//enemies
		enemies = game.add.group();
		enemies.name = 'enemies';
		enemies.enableBody = true;

		for (var i = 0; i < enemyCount; i++) {
			var couple = enemies.create(game.rnd.realInRange(0, BOARD_WIDTH), game.rnd.realInRange(0, BOARD_HEIGHT-25), 'enemyImg');
			couple.body.collideWorldBounds = true;
			couple.body.allowGravity = false;
			couple.body.bounce.setTo(1,1);
			couple.body.velocity.setTo(200);
		}

		//draws player
		player = game.add.sprite(10, BOARD_HEIGHT/2 - 12.5, 'playerImg');
		player.name = 'player';
		game.physics.arcade.enable(player);
		player.body.allowGravity = false;
		player.body.collideWorldBounds = true;
		player.body.bounce.set(5);
		player.body.velocity = 3;

	}

	function update() {

		//checks table collisions
		game.physics.arcade.collide(player, tables, tableCallback);
		game.physics.arcade.overlap(player, tables, tableCallback);

		//checks enemy collisions
		game.physics.arcade.collide(player, enemies, enemyCallback);
		game.physics.arcade.overlap(player, enemies, enemyCallback);
		game.physics.arcade.collide(enemies, tables);
		game.physics.arcade.overlap(enemies, tables);

		//updates enemy movement
		updateEnemies();

		//updates player movement
		updatePlayer();
	}

	function shutdown() {
		player.destroy();
		tables.destroy();
		enemies.destroy();
	}

	function tableCallback() {
		game.paused = true;
		//DIALOGUE HAPPENS HERE
		//game.paused = false;
	}

	function enemyCallback() {
		game.paused = true;
		//DIALOGUE HAPPENS HERE
		//game.paused = false;		
	}

	function updateEnemies() {
		enemies.forEach(function(couple) {
			couple.angle+=5;
		}, this);
	}

	function updatePlayer() {

		//mouse following
		// player.rotation = game.physics.arcade.angleToPointer(player);
		// game.physics.arcade.moveToPointer(player);

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