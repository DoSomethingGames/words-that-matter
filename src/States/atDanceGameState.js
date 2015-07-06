function AtDanceGame() {

	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tableArray;

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
		tableArray = [];
		tableCount = 5;

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

	console.log("loaded assets");

	function create() {

		game.physics.startSystem(Phaser.Physics.ARCADE);
		

		//draws tables
		for (var i = 0; i < tableCount; i ++) {
			tableArray.push(new createTable());
			game.add.sprite(tableArray[i].x, tableArray[i].y, 'tableImg');
		}

		//draws table
		player = game.add.sprite(createPlayer.x, createPlayer.y, 'playerImg');
		game.physics.arcade.enable(player);


		item1 = game.add.sprite(100, 100, 'itemImg1');
		game.physics.arcade.enable(item1);
		item2 = game.add.sprite(200, 200, 'itemImg2');
		game.physics.arcade.enable(item2);
		item3 = game.add.sprite(300, 300, 'itemImg3');
		game.physics.arcade.enable(item3);

	}

	function update() {

		game.physics.arcade.collide(player, item1, touchItem1, null, this);
		game.physics.arcade.collide(player, item2, touchItem2, null, this);
		game.physics.arcade.collide(player, item3, touchItem3, null, this);

		game.physics.arcade.overlap(player, item1, touchItem1, null, this);
		game.physics.arcade.overlap(player, item2, touchItem2, null, this);
		game.physics.arcade.overlap(player, item3, touchItem3, null, this);

		updatePlayer();

	}

	function shutdown() {

	}

	function createTable(x, y) {
		this.x = game.rnd.realInRange(0, BOARD_WIDTH);
		this.y = game.rnd.realInRange(0, BOARD_HEIGHT-25);  //25 buffers off-screen corner case, need to figure out how to get width
	}

	function createPlayer(x, y) {
		this.x = 10;
		this.y = BOARD_HEIGHT/2 - 12.5; //25 being the height of the player
	}

	function updatePlayer() {

		var speed = 10;
		var yDistance = game.input.mousePointer.y - player.y;
		var xDistance = game.input.mousePointer.x - player.x;

		if (Math.sqrt(yDistance*yDistance +  xDistance*xDistance) < speed) {
			player.x = game.input.mousePointer.x;
			player.y = game.input.mousePointer.y;
		} else {
			var directionAngle = game.math.angleBetween(player.x, player.y, game.input.mousePointer.x, game.input.mousePointer.y);
			player.x += Math.cos(directionAngle) * speed;
			player.y += Math.sin(directionAngle) * speed;
			player.angle = directionAngle * 180 / Math.PI;
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
