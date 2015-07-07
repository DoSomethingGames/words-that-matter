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

	//items
	var item1;
	var item2;
	var item3;
	var dialogue;

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

		//tables
		tables = game.add.group();
		tables.name = 'tables';
		tables.enableBody = true;

		//randomly generating tables
		for (var i = 0; i < tableCount; i ++) {
			var table = tables.create(game.rnd.realInRange(0, BOARD_WIDTH), game.rnd.realInRange(0, BOARD_HEIGHT-25), 'tableImg');
			table.body.collideWorldBounds = true;
			table.body.immovable = true;
		}

		//enemy group and random generation
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

		//generating items
		item1 = game.add.sprite(100, 100, 'itemImg1');
		game.physics.arcade.enable(item1);
		item2 = game.add.sprite(200, 200, 'itemImg2');
		game.physics.arcade.enable(item2);
		item3 = game.add.sprite(300, 300, 'itemImg3');
		game.physics.arcade.enable(item3);

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
		//item disappears when touched and brings up dialogue
		game.physics.arcade.collide(player, item1, touchItem, null, {itemPickedUp: item1, dialogueName: 'itemDialogue1'});
		game.physics.arcade.collide(player, item2, touchItem, null, {itemPickedUp: item2, dialogueName: 'itemDialogue2'});
		game.physics.arcade.collide(player, item3, touchItem, null, {itemPickedUp: item3, dialogueName: 'itemDialogue3'});

		game.physics.arcade.overlap(player, item1, touchItem, null, {itemPickedUp: item1, dialogueName: 'itemDialogue1'});
		game.physics.arcade.overlap(player, item2, touchItem, null, {itemPickedUp: item2, dialogueName: 'itemDialogue2'});
		game.physics.arcade.overlap(player, item3, touchItem, null, {itemPickedUp: item3, dialogueName: 'itemDialogue3'});

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

	function touchItem() {
		this.itemPickedUp.kill();
		game.paused = true;
		dialogue = game.add.sprite(game.width/2, game.height/4, this.dialogueName);
		setTimeout(killDialogue, 2000);
	}

	function killDialogue() {
		game.paused = false;
		dialogue.kill();
		dialogue = null;
	}

	return {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}
