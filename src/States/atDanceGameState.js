function AtDanceGame() {

	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tableArray;

	//player
	var player;


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

	}

	console.log("loaded assets");

	function create() {
		//draws tables
		for (var i = 0; i < tableCount; i ++) {
			tableArray.push(new createTable());
			game.add.sprite(tableArray[i].x, tableArray[i].y, 'tableImg');
		}

		//draws table
		player = game.add.sprite(createPlayer.x, createPlayer.y, 'playerImg');

	}

	function update() {
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

	return {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}