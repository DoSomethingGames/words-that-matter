function AtDanceGame() {

  //board dimensions
  var BOARD_WIDTH, BOARD_HEIGHT;
  var background;

  //game start/end
  var startButton;
  var instructions;
  var paused;

  //table
  var tableCount;
  var tables;
  var tableDialogue

  //enemies
  var enemyCount;
  var enemies;
  var enemyDialogue = ['enemyDialogue1', 'enemyDialogue2', 'enemyDialogue3'];

  //player
  var player;

  //itemsgit
  var item1;
  var item2;
  var item3;
  var dialogue;
  var itemsCount;

  function init() {
    BOARD_HEIGHT = 600;
    BOARD_WIDTH = 800;

    paused = true;
    startButton = null;

    //table
    tables = null;
    tableCount = 4;

    //enemycouples
    enemies = null;
    enemyCount = 5;
  }

  function preload() {
    //background
    game.load.image('background', 'assets/Backgrounds/ADG_background.png');

    game.load.image('instructions', 'assets/mini-game/ADG_instructions.png');
    game.load.image('startButtonImg', 'assets/mini-game/ADG_startButton.png');

    game.load.image('tableImg', 'assets/mini-game/ADG_table.png');
    game.load.image('enemyImg', 'assets/mini-game/ADG_couple.png')
    game.load.image('playerImg', 'assets/mini-game/ADG_player.png');

    game.load.image('itemImg1', 'assets/mini-game/ADG_bowtie.png');
    game.load.image('itemImg2', 'assets/mini-game/ADG_corsage.png');
    game.load.image('itemImg3', 'assets/mini-game/ADG_purse.png');

    //item dialogue
    game.load.image('itemDialogue1', 'assets/mini-game/ADG_itemDialogue1.png');
    game.load.image('itemDialogue2', 'assets/mini-game/ADG_itemDialogue2.png');
    game.load.image('itemDialogue3', 'assets/mini-game/ADG_itemDialogue3.png');

    //enemy, table collision dialogue
    game.load.image('enemyDialogue1', 'assets/mini-game/enemyDialogue1.png');
    game.load.image('enemyDialogue2', 'assets/mini-game/enemyDialogue2.png');
    game.load.image('enemyDialogue3', 'assets/mini-game/enemyDialogue3.png');
    game.load.image('tableDialogue', 'assets/mini-game/tableDialogue.png');
  }

  function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    
    //draws tables
    tables = game.add.group();
    tables.name = 'tables';
    tables.enableBody = true;

    //generating tables
    var tableX = 150;
    var tableY = 100;
    for (var i = 0; i < tableCount; i ++) {
      if (i == 2) {
        tableY = 400;
        tableX = 150;
      }
      var table = tables.create(tableX, tableY, 'tableImg');
      table.body.collideWorldBounds = true;
      table.body.immovable = true;
      tableX += 350;
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
      couple.body.velocity.setTo(0);
    }

    //generating items
    itemsCount = 3;
    item1 = game.add.sprite(400, 100, 'itemImg1');
    game.physics.arcade.enable(item1);
    item2 = game.add.sprite(550, 200, 'itemImg2');
    game.physics.arcade.enable(item2);
    item3 = game.add.sprite(300, 300, 'itemImg3');
    game.physics.arcade.enable(item3);

    //draws player
    player = game.add.sprite(10, BOARD_HEIGHT/2 - 12.5, 'playerImg');
    player.name = 'player';
    game.physics.arcade.enable(player);
    player.body.allowGravity = false;
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(200,200);
    player.body.velocity = 3;

    //start button
    startButton = game.add.button(game.world.centerX - game.cache.getImage('startButtonImg').width/2, game.world.centerY - game.cache.getImage('startButtonImg').height/2, 'startButtonImg', null, null, 2, 1, 0);
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(actionOnClick, {selected: 1});
    startButton.events.onInputOver.add(increaseButtonSize.bind({button: startButton}));
    startButton.events.onInputOut.add(decreaseButtonSize.bind({button: startButton}));

    instructions = game.add.sprite(game.world.centerX - game.cache.getImage('instructions').width/2, 10, 'instructions');
  }

  function update() {
    //item disappears when touched and brings up dialogue
    game.physics.arcade.collide(player, item1, touchItem, null, {type: 'item', itemPickedUp: item1, dialogueName: 'itemDialogue1', duration: 6000});
    game.physics.arcade.collide(player, item2, touchItem, null, {type: 'item', itemPickedUp: item2, dialogueName: 'itemDialogue2', duration: 6000});
    game.physics.arcade.collide(player, item3, touchItem, null, {type: 'item', itemPickedUp: item3, dialogueName: 'itemDialogue3', duration: 2500});

    game.physics.arcade.overlap(player, item1, touchItem, null, {type: 'item', itemPickedUp: item1, dialogueName: 'itemDialogue1', duration: 6000});
    game.physics.arcade.overlap(player, item2, touchItem, null, {type: 'item', itemPickedUp: item2, dialogueName: 'itemDialogue2', duration: 6000});
    game.physics.arcade.overlap(player, item3, touchItem, null, {type: 'item', itemPickedUp: item3, dialogueName: 'itemDialogue3', duration: 2500});

    //checks table collisions
    game.physics.arcade.collide(player, tables, touchItem, null, {type: 'table', itemPickedUp: tables, dialogueName: 'tableDialogue', duration: 2000});
    game.physics.arcade.overlap(player, tables, touchItem, null, {type: 'table', itemPickedUp: enemies, dialogueName: 'tableDialogue', duration: 2000});

    //checks enemy collisions
    game.physics.arcade.collide(player, enemies, touchItem, null,
      {type: 'enemy', itemPickedUp: enemyDialogue, dialogueName: enemyDialogue[game.rnd.between(0, 2)], duration: 2000});

    //@todo:change it so the enemy dialogue chooses randomly for each individual collision 

    //game.physics.arcade.overlap(player, enemies, touchItem, null, {type: 'enemy', itemPickedUp: enemyDialogue, dialogueName: 'enemyDialogue'});

    game.physics.arcade.collide(enemies, tables);
    game.physics.arcade.overlap(enemies, tables);

    if (!paused) {
      //updates enemy movement
      updateEnemies();

      //updates player movement
      updatePlayer();
    }
  }

  function shutdown() {
    player.destroy();
    tables.destroy();
    enemies.destroy();
  }

  function updateEnemies() {
    enemies.forEach(function(couple) {
      couple.angle+=5;
    }, this);
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

  function touchItem() {
    if (this.type == 'item') {
      this.itemPickedUp.kill();
      itemsCount--;

      // If all items have been picked up, move onto next state once the
      // dialogue box has been killed. See setTimeout(killDialogue) below.
      if (itemsCount <= 0) {
        transitionToNextState();
      }
    }
    game.paused = true;
    player.body.enable = false;
    // 350 and 100 are half the size of the dialogue asset
    dialogue = game.add.sprite(game.world.centerX - 350, game.world.centerY - 100, this.dialogueName);
    setTimeout(killDialogue, this.duration);
    if (this.type != 'item') {
      player.x -= 5;
      player.y -= 5;
    }
  }

  function killDialogue() {
  	setTimeout(function enablePhysics() {player.body.enable = true;}, 1000);
    game.paused = false;
    dialogue.kill();
    dialogue = null;
  }

  function actionOnClick() {
    paused = false;
    enemies.forEach(function(couple) { couple.body.velocity.setTo(200); }, this);
    startButton.kill();
    startButton = null;

    instructions.kill();
    instructions = null;
  }

  /**
   * Increases the size of a button. The intent is for this function to be used
   * as a callback with the `button` variable "binded" to the function.
   *
   * ex: button1.events.onInputOver.add(increaseButtonSize.bind({button: button1}))
   */
  function increaseButtonSize() {
    var sizeDelta = 10;

    if (!this.button) {
      return;
    }

    this.button.width += sizeDelta;
    this.button.height += sizeDelta;

    this.button.x -= (sizeDelta / 2);
    this.button.y -= (sizeDelta / 2);
  }

  /**
   * Decreases the size of a button.
   *
   * See increaseButtonSize() for more notes on its usage.
   */
  function decreaseButtonSize() {
    var sizeDelta = 10;

    if (!this.button) {
      return;
    }

    this.button.width -= sizeDelta;
    this.button.height -= sizeDelta;

    this.button.x += (sizeDelta / 2);
    this.button.y += (sizeDelta / 2);
  }

  /**
   * Begin transition to the next state with a fade out.
   */
  function transitionToNextState() {
    var properties = {alpha: 0};
    var fadeOutDuration = 2000;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 2000;
    var repeat = false;
    var yoyo = false;

    // Disable physics on the player object
    player.body.enable = false;

    // Fade out sprites
    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(enemies).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(player).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(tables).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    setTimeout(startNextState, fadeOutDuration + delay - 250);
  }

  /**
   * Add and start next state. Starting a new state automatically shuts down the current one.
   */
  function startNextState() {
    game.state.add('bystander-intervention', new BystanderIntervention());
    game.state.start('bystander-intervention');
  }

  return {
    init: init,
    preload: preload,
    create: create,
    update: update
  }
}
