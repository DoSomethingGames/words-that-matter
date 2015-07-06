function AtDanceGame() {

	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tables;

	//player
	var player;

	//items
	var pickup;
	var item1;
	var item2;
	var item3;
	var itemDialogue1;
	var itemDialogue2;
	var itemDialogue3;

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

		game.load.image('itemImg1', 'assets/ADG_player.png');
		game.load.image('itemImg2', 'assets/ADG_player.png');
		game.load.image('itemImg3', 'assets/ADG_player.png');

		//item dialogue
		game.load.image('itemDialogue1', 'assets/ADG_couple.png');
		game.load.image('itemDialogue2', 'assets/ADG_couple.png');
		game.load.image('itemDialogue3', 'assets/ADG_couple.png');


	}

	function create() {
		game.physics.startSystem(Phaser.Physics.ARCADE);
		

		//draws tables
		tables = game.add.group();
		tables.name = 'tables';
		tables.enableBody = true;

		for (var i = 0; i < tableCount; i ++) {
			table = tables.create(game.rnd.realInRange(0, BOARD_WIDTH), game.rnd.realInRange(0, BOARD_HEIGHT-25), 'tableImg');
			table.body.collideWorldBounds = true;
			table.body.immovable = true;
		}

<<<<<<< HEAD
		//draws player
		player = game.add.sprite(10, BOARD_HEIGHT/2 - 12.5, 'playerImg');
		player.name = 'player';
		game.physics.arcade.enable(player, Phaser.Physics.ARCADE);
		player.body.allowGravity = false;
		player.body.collideWorldBounds = true;
		player.body.velocity = 10;
=======
		//draws table
		player = game.add.sprite(createPlayer.x, createPlayer.y, 'playerImg');
		game.physics.arcade.enable(player);

>>>>>>> collsions, dialogue popups, all work, just need assets

		item1 = game.add.sprite(100, 100, 'itemImg1');
		game.physics.arcade.enable(item1);
		item2 = game.add.sprite(200, 200, 'itemImg2');
		game.physics.arcade.enable(item2);
		item3 = game.add.sprite(300, 300, 'itemImg3');
		game.physics.arcade.enable(item3);

	}

	function update() {
<<<<<<< HEAD
		collide(player, item1, touchItem1, null, this);
		collide(player, item2, touchItem2, null, this);
		collide(player, item3, touchItem3, null, this);

		if (game.physics.arcade.collide(player, item1)) {
			touchItem1();
		}
		else if (game.physics.arcade.collide(player, item2)) {
			touchItem2();
		}
		else if (game.physics.arcade.collide(player, item3)) {
			touchItem3();
		}
=======

		game.physics.arcade.collide(player, item1, touchItem1, null, this);
		game.physics.arcade.collide(player, item2, touchItem2, null, this);
		game.physics.arcade.collide(player, item3, touchItem3, null, this);

		game.physics.arcade.overlap(player, item1, touchItem1, null, this);
		game.physics.arcade.overlap(player, item2, touchItem2, null, this);
		game.physics.arcade.overlap(player, item3, touchItem3, null, this);

		updatePlayer();

>>>>>>> collsions, dialogue popups, all work, just need assets
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

	function touchItem1() {

		item1.kill();
		game.paused = true;
		itemDialogue1 = game.add.sprite(game.width/2, game.height/4, 'itemDialogue1');
		setTimeout(killDialogue1, 2000)
		console.log('item1');

	}

	function touchItem2() {

		item2.kill();
		game.paused = true;
		itemDialogue2 = game.add.sprite(game.width/2, game.height/4, 'itemDialogue2');
		setTimeout(killDialogue2, 2000)
		console.log('item2');
		
	}

	function touchItem3() {

		item3.kill();
		game.paused = true;
		itemDialogue3 = game.add.sprite(game.width/2, game.height/4, 'itemDialogue3');
		setTimeout(killDialogue3, 2000)
		console.log('item3');
		
	}

	function killDialogue1() {
		game.paused = false;
		itemDialogue1.kill();
	}

	function killDialogue2() {
		game.paused = false;
		itemDialogue2.kill();
	}

	function killDialogue3() {
		game.paused = false;
		itemDialogue3.kill();
	}

	return {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}
