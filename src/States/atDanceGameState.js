function AtDanceGame() {
	//board dimensions
	var BOARD_WIDTH, BOARD_HEIGHT;

	//table
	var tableCount;
	var tableArray;


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
			tableArray.push(new table());
			game.add.sprite(tableArray[i].x, tableArray[i].y, 'tableImg');
		}

		//draws table
		game.add.sprite(player.x, player.y, 'playerImg');

	}

	function update() {

	}

	function shutdown() {

	}

	function table(x, y) {
		this.x = game.rnd.realInRange(0, BOARD_WIDTH);
		this.y = game.rnd.realInRange(0, BOARD_HEIGHT-25);  //25 buffers off-screen corner case, need to figure out how to get width
	}

	function player(x, y) {
		this.x = 10;
		this.y = BOARD_HEIGHT/2 - 12.5; //25 being the height of the player
		console.log(this.x, this.y);
		this.speed = 3;
	}

	return {
		init: init,
		preload: preload,
		create: create,
		update: update
	}
}