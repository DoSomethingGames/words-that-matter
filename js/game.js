var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Variables for tracking and displaying dance game stats
var GLOBALS = {
  numEnemiesCollided: 0,
  numTablesCollided: 0,
  timeDancing: 0
};

var registerSubmit = function() {
  var fname;
  var phone;

  fname = $('#first_name').val();
  phone = $('#phone').val();

  console.log('@TODO: register user on northstar');
};
function StartScreen() {

	console.log('in startScreen');

	var background, startButton;

	function init() {
		startButton = null;
		console.log('init');
	}

	function preload() {
		//background
		game.load.image('background', 'assets/Backgrounds/startScreen.png');

		//start button
		game.load.image('startButton', 'assets/playButton.png');
		console.log('assets loaded');
	}

	function create() {
		background = game.add.tileSprite(0, 0, 800, 600, 'background');

		startButton = game.add.button(game.world.centerX - 150, game.world.centerY, 'startButton', null, null, 2, 1, 0);
    startButton.inputEnabled = true;
    startButton.events.onInputUp.add(transitionToNextState);
    startButton.events.onInputOver.add(increaseButtonSize.bind({button: startButton}));
    startButton.events.onInputOut.add(decreaseButtonSize.bind({button: startButton}));
    console.log('create');
	}

	function update() {}

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
   * Begin transition to the next state with a fade out.  Modified to delete button as well.
   */
  function transitionToNextState() {
    var properties = {alpha: 0};
    var fadeOutDuration = 2000;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 500;
    var repeat = false;
    var yoyo = false;

    startButton.kill();

    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);

    // Starting next state shortly before fade out is complete. Should fix flicker problem.
    setTimeout(startNextState, fadeOutDuration + delay - 250);
  }

  /**
   * Add and start next state. Starting a new state automatically shuts down the current one.
   */
  function startNextState() {
    game.state.add('getting-ready', new GettingReady());
    game.state.start('getting-ready');
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('start-screen', new StartScreen());
game.state.start('start-screen');

function GettingReady() {

  var DEFAULT_DIALOGUE_DISPLAY_TIME = 3000;
  
  var dialogueTree = [
    {type: 'narrative', msg: 'narrative1', duration: 5000},
    {type: 'narrative', msg: 'narrative2', duration: 8000},
    {type: 'narrative', msg: 'narrative3', duration: 7000},
    {type: 'friend', msg: 'friend1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'friend', msg: 'friend2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'friend', msg: 'friend3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 0} 
    ];

  var progress;
  var background;
  var spriteDate;
  var spriteFriend;

  // These are the actual sprites and buttons that will be created and
  // destroyed as the dialogue progresses.
  var choiceButton1;
  var choiceButton2;
  var dateDialogue;
  var friendDialogue;
  var narrative;

  function init() {
    progress = 0;

    choiceButton1 = null;
    choiceButton2 = null;
    dateDialogue = null;
    friendDialogue = null;
  }

  function preload() {

    //background
    game.load.image('background', 'assets/Backgrounds/getting-ready-bkgrd.png');

    //narrative assets
    game.load.image('narrative1', 'assets/getting-ready/GR_narrative1.png');
    game.load.image('narrative2', 'assets/getting-ready/GR_narrative2.png');
    game.load.image('narrative3', 'assets/getting-ready/GR_narrative3.png');

    //player assets
    game.load.image('choice1a', 'assets/getting-ready/GR_choice1a.png');
    game.load.image('choice1b', 'assets/getting-ready/GR_choice1b.png');

    //date assets
    game.load.image('datePic', 'assets/dateCrop.png');
    game.load.image('date1', 'assets/getting-ready/GR_date1.png');
    game.load.image('date2', 'assets/getting-ready/GR_date2.png');
    game.load.image('date3', 'assets/getting-ready/GR_date3.png');

    //friend assets
    game.load.image('friendPic', 'assets/friendCrop.png');
    game.load.image('friend1', 'assets/getting-ready/GR_friend1.png');
    game.load.image('friend2', 'assets/getting-ready/GR_friend2.png');
    game.load.image('friend3', 'assets/getting-ready/GR_friend3.png');

  }

  function create() {
    var bg;
    var properties;
    var fadeInDuration;
    var ease;
    var autoStart;
    var delay;
    var repeat;
    var yoyo;

    background = game.add.tileSprite(0, 0, 800, 600, 'background');

    background.alpha = 0;

    properties = {alpha: 1};
    fadeInDuration = 2000;
    ease = Phaser.Easing.Linear.None;
    autoStart = true;
    delay = 0;
    repeat = 0;
    yoyo = false;
    game.add.tween(background).to(properties, fadeInDuration, ease, autoStart, delay, repeat, yoyo);

    setTimeout(displayNext, fadeInDuration);
  }

  function update() {}

  /**
   * createChoiceButton: [asset key] int int -> void
   * adds a button to the current state at the given position, using the asset key as the image
  **/

  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, null, null, 2, 1, 0);
  }

  /**
   * createChoiceButton1: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton1(key) {
    return createChoiceButton(key, game.world.centerX + 50, game.world.centerY + 50);
  }

  /**
   * createChoiceButton2: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton2(key) {
    return createChoiceButton(key, game.world.centerX - 350, game.world.centerY + 50);
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
   * createDateDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createDateDialogue(key) {
    if (!spriteDate) {
      spriteDate = game.add.sprite(game.world.centerX + 150, game.world.centerY - 200, 'datePic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createFriendDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createFriendDialogue(key) {
    if (!spriteFriend) {
      spriteFriend = game.add.sprite(game.world.centerX - 350, game.world.centerY - 200, 'friendPic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createNarrative: [asset key] -> void 
   * adds narrative sprite corresponding to asset key to the screen 
  **/

  function createNarrative(key) {
    return game.add.sprite(game.world.centerX - 350, game.world.centerY + 100, key);
  }

  /**
   * displayNext: void -> void
   * function iterates through dialogueTree and checks 'type' tag in order to display friend/date dialogue or choice buttons.
   */
  function displayNext() {

    if (dateDialogue) {
      dateDialogue.destroy();
    }
    
    if (friendDialogue) {
      friendDialogue.destroy();
    }

    if (narrative) {
      narrative.destroy();
    }

    if (progress >= dialogueTree.length) {
      transitionToNextState();
      return;
    }

    console.log(progress);

    if (dialogueTree[progress].type == 'choice') {

      //checking for correct player choice dialogue buttons
      switch(dialogueTree[progress].msg) {

        case 0:
          key1 = 'choice1a';
          key2 = 'choice1b';
          console.log('c1');
          break;

        case 1:
          key1 = 'choice2a';
          key2 = 'choice2b';
          console.log('c2');
          break;

        default:
          console.log('error in switch');
      }

      // Destroying buttons to clean up references, like removing event listeners
      if (choiceButton1) {
        choiceButton1.destroy();
      }

      if (choiceButton2) {
        choiceButton2.destroy();
      }

      choiceButton1 = createChoiceButton1(key1);
      choiceButton1.inputEnabled = true;
      choiceButton1.events.onInputUp.add(onChoiceSelected, {selected: 1});
      choiceButton1.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton1}));
      choiceButton1.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton1}));

      choiceButton2 = createChoiceButton2(key2);
      choiceButton2.inputEnabled = true;
      choiceButton2.events.onInputUp.add(onChoiceSelected, {selected: 2});
      choiceButton2.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton2}));
      choiceButton2.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton2}));
    }
    else if (dialogueTree[progress].type == 'narrative') {
      narrative = createNarrative(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else if (dialogueTree[progress].type == 'date') {
      dateDialogue = createDateDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else if (dialogueTree[progress].type == 'friend') {
      friendDialogue = createFriendDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else {
      console.log('unable to match type');
    }

    // Progress the dialogue tree
    progress++;
  }

  /**
   * onChoiceSelected: void -> void
   * clears the screen of all buttons and/or dialogue, resets all to null, and then displays the next dialogue
   */
  function onChoiceSelected() {
    if (choiceButton1) {
      choiceButton1.destroy();
    }

    if (choiceButton2) {
      choiceButton2.destroy();
    }

    dateDialogue = null;
    friendDialogue = null;
    choiceButton1 = null;
    choiceButton2 = null;
    narrative = null;

    // Display the next dialogue
    displayNext();
  }

  /**
   * Begin transition to the next state with a fade out.
   */
  function transitionToNextState() {
    var properties = {alpha: 0};
    var fadeOutDuration = 1500;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 1000;
    var repeat = false;
    var yoyo = false;

    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteDate).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteFriend).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    // 250ms buffer to avoid flicker problem
    setTimeout(startNextState, fadeOutDuration + delay - 250);
  }

  /**
   * Add and start next state. Starting a new state automatically shuts down the current one.
   */
  function startNextState() {
    game.state.add('at-prom', new AtProm());
    game.state.start('at-prom');
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('getting-ready', new GettingReady());

function AtProm() {

  var DEFAULT_DIALOGUE_DISPLAY_TIME = 3000;
  var DEFAULT_NARRATIVE_DISPLAY_TIME = 6000;
  
  var dialogueTree = [
    {type: 'narrative', msg: 'narrative1', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative2', duration: 3000},
    {type: 'narrative', msg: 'narrative3', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative4', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'choice', msg: 0},
    {type: 'date', msg: 'date1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 1},
    {type: 'friend', msg: 'friend1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'friend', msg: 'friend2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 2},
    {type: 'friend', msg: 'friend3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'date', msg: 'date4', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 3},
    {type: 'date', msg: 'date5', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 4}
    ];

  var progress;

  // These are the actual sprites and buttons that will be created and
  // destroyed as the dialogue progresses.
  var choiceButton1;
  var choiceButton2;
  var dateDialogue;
  var friendDialogue;
  var narrative;
  var spriteDate;
  var spriteFriend;
  var spriteBackground;

  function init() {
    progress = 0;

    choiceButton1 = null;
    choiceButton2 = null;
    dateDialogue = null;
    friendDialogue = null;
  }

  function preload() {

    //background
    game.load.image('background', 'assets/Backgrounds/AP_bkgrd.png');

    //narrative assets
    game.load.image('narrative1', 'assets/at-prom/AP_narrative1.png');
    game.load.image('narrative2', 'assets/at-prom/AP_narrative2.png');
    game.load.image('narrative3', 'assets/at-prom/AP_narrative3.png');
    game.load.image('narrative4', 'assets/at-prom/AP_narrative4.png');

    //player assets
    game.load.image('choice1a', 'assets/at-prom/AP_choice1a.png');
    game.load.image('choice1b', 'assets/at-prom/AP_choice1b.png');
    game.load.image('choice2a', 'assets/at-prom/AP_choice2a.png');
    game.load.image('choice2b', 'assets/at-prom/AP_choice2b.png');
    game.load.image('choice3a', 'assets/at-prom/AP_choice3a.png');
    game.load.image('choice3b', 'assets/at-prom/AP_choice3b.png');
    game.load.image('choice4a', 'assets/at-prom/AP_choice4a.png');
    game.load.image('choice4b', 'assets/at-prom/AP_choice4b.png');
    game.load.image('choice5a', 'assets/at-prom/AP_choice5a.png');
    game.load.image('choice5b', 'assets/at-prom/AP_choice5b.png');

    //date assets
    game.load.image('datePic', 'assets/dateCrop.png');
    game.load.image('date1', 'assets/at-prom/AP_date1.png');
    game.load.image('date2', 'assets/at-prom/AP_date2.png');
    game.load.image('date3', 'assets/at-prom/AP_date3.png');
    game.load.image('date4', 'assets/at-prom/AP_date4.png');
    game.load.image('date5', 'assets/at-prom/AP_date5.png');

    //friend assets
    game.load.image('friendPic', 'assets/friendCrop.png');
    game.load.image('friend1', 'assets/at-prom/AP_friend1.png');
    game.load.image('friend2', 'assets/at-prom/AP_friend2.png');
    game.load.image('friend3', 'assets/at-prom/AP_friend3.png');

  }

  console.log('loaded assets');

  function create() {
    var properties;
    var fadeInDuration;
    var ease;
    var autoStart;
    var delay;
    var repeat;
    var yoyo;

    spriteBackground = game.add.tileSprite(0, 0, 800, 600, 'background');
    spriteBackground.alpha = 0;

    properties = {alpha: 1};
    fadeInDuration = 2000;
    ease = Phaser.Easing.Linear.None;
    autoStart = true;
    delay = 0;
    repeat = 0;
    yoyo = false;
    game.add.tween(spriteBackground).to(properties, fadeInDuration, ease, autoStart, delay, repeat, yoyo);

    setTimeout(displayNext, fadeInDuration);
  }

  function update() {}

 /**
   * createChoiceButton: [asset key] int int -> void
   * adds a button to the current state at the given position, using the asset key as the image
  **/

  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, null, null, 2, 1, 0);
  }

  /**
   * createChoiceButton1: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton1(key) {
    return createChoiceButton(key, game.world.centerX + 50, game.world.centerY + 50);
  }

  /**
   * createChoiceButton2: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton2(key) {
    return createChoiceButton(key, game.world.centerX - 350, game.world.centerY + 50);
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
   * createDateDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createDateDialogue(key) {
    if (!spriteDate) {
      spriteDate = game.add.sprite(game.world.centerX + 150, game.world.centerY - 200, 'datePic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createFriendDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createFriendDialogue(key) {
    if (!spriteFriend) {
      spriteFriend = game.add.sprite(game.world.centerX - 350, game.world.centerY - 200, 'friendPic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createNarrative: [asset key] -> void 
   * adds narrative sprite corresponding to asset key to the screen 
  **/

  function createNarrative(key) {
    return game.add.sprite(game.world.centerX - 350, game.world.centerY + 100, key);
  }

  /**
   * displayNext: void -> void
   * function iterates through dialogueTree and checks 'type' tag in order to display friend/date dialogue or choice buttons.
   */
  function displayNext() {

    if (progress >= dialogueTree.length) {
     // game.state.start('tbd');
    }

    if (dateDialogue) {
      dateDialogue.destroy();
    }
    
    if (friendDialogue) {
      friendDialogue.destroy();
    }

    if (narrative) {
      narrative.destroy();
    }

    if (progress >= dialogueTree.length) {
      transitionToNextState();
    }
    else if (dialogueTree[progress].type == 'choice') {

      //checking for correct player choice dialogue buttons
      switch(dialogueTree[progress].msg) {

        case 0:
          key1 = 'choice1a';
          key2 = 'choice1b';
          console.log('c1');
          break;

        case 1:
          key1 = 'choice2a';
          key2 = 'choice2b';
          console.log('c2');
          break;

        case 2:
          key1 = 'choice3a';
          key2 = 'choice3b';
          console.log('c3');
          break;

        case 3:
          key1 = 'choice4a';
          key2 = 'choice4b';
          console.log('c4');
          break;

        case 4:
          key1 = 'choice5a';
          key2 = 'choice5b';
          console.log('c5');
          break;

        default:
          console.log('error in switch');
      }

      // Destroying buttons to clean up references, like removing event listeners
      if (choiceButton1) {
        choiceButton1.destroy();
      }

      if (choiceButton2) {
        choiceButton2.destroy();
      }

      choiceButton1 = createChoiceButton1(key1);
      choiceButton1.inputEnabled = true;
      choiceButton1.events.onInputUp.add(onChoiceSelected, {selected: 1});
      choiceButton1.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton1}));
      choiceButton1.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton1}));

      choiceButton2 = createChoiceButton2(key2);
      choiceButton2.inputEnabled = true;
      choiceButton2.events.onInputUp.add(onChoiceSelected, {selected: 2});
      choiceButton2.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton2}));
      choiceButton2.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton2}));
    }
    else if (dialogueTree[progress].type == 'date') {
      dateDialogue = createDateDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else if (dialogueTree[progress].type == 'friend') {
      friendDialogue = createFriendDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else if (dialogueTree[progress].type == 'narrative') {
      narrative = createNarrative(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }

    else {
      console.log('unable to match type');
    }

    // Progress the dialogue tree
    progress++;
  }

  /**
   * onChoiceSelected: void -> void
   * clears the screen of all buttons and/or dialogue, resets all to null, and then displays the next dialogue
   */
  function onChoiceSelected() {

    if (dateDialogue) {
      dateDialogue.destroy();
    }
    
    if (friendDialogue) {
      friendDialogue.destroy();
    }

    if (narrative) {
      narrative.destroy();
    }

    if (choiceButton1) {
      choiceButton1.destroy();
    }

    if (choiceButton2) {
      choiceButton2.destroy();
    }

    dateDialogue = null;
    friendDialogue = null;
    choiceButton1 = null;
    choiceButton2 = null;
    narrative = null;

    // Display the next dialogue
    displayNext();
  }

  /**
   * Begin transition to the next state with a fade out.
   */
  function transitionToNextState() {
    var properties = {alpha: 0};
    var fadeOutDuration = 1500;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 1000;
    var repeat = false;
    var yoyo = false;

    game.add.tween(spriteBackground).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteDate).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteFriend).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    // 250ms buffer to avoid flicker problem
    setTimeout(startNextState, fadeOutDuration + delay - 250);
  }

  /**
   * Add and start next state. Starting a new state automatically shuts down the current one.
   */
  function startNextState() {
    game.state.add('at-mini-game', new AtDanceGame());
    game.state.start('at-mini-game');
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

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

  // Time when dancing starts
  var timeStart;

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
      couple.anchor.setTo(0.5, 0.5);
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
    player.anchor.setTo(0.5,0.5);
    game.physics.arcade.enable(player);
    player.body.allowGravity = false;
    player.body.collideWorldBounds = true;
    player.body.bounce.setTo(200,200);
    player.body.velocity.setTo(0,0);

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
    // mouse following
    game.physics.arcade.moveToPointer(player, 250);
    if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y)) {
      player.body.velocity.setTo(0, 0);
    }
    player.angle += 5;
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
    else if (this.type == 'table') {
      GLOBALS.numTablesCollided++;
    }
    else if (this.type == 'enemy') {
      GLOBALS.numEnemiesCollided++;
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

    timeStart = (new Date()).getTime();
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
    var timeEnd;
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

    // End timer
    timeEnd = (new Date()).getTime();
    GLOBALS.timeDancing = timeEnd - timeStart;
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
function BystanderIntervention() {

  var DEFAULT_DIALOGUE_DISPLAY_TIME = 3000;
  var DEFAULT_NARRATIVE_DISPLAY_TIME = 5000;
  
  var dialogueTree = [
    {type: 'narrative', msg: 'narrative1', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative2', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative3', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative4', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'narrative', msg: 'narrative5', duration: DEFAULT_NARRATIVE_DISPLAY_TIME},
    {type: 'tyrell', msg: 'tyrell1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'luis', msg: 'luis1', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'luis', msg: 'luis2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'tyrell', msg: 'tyrell2', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'luis', msg: 'luis3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'tyrell', msg: 'tyrell3', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'luis', msg: 'luis4', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 0},
    {type: 'tyrell', msg: 'tyrell4', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'tyrell', msg: 'tyrell5', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'choice', msg: 1},
    {type: 'luis', msg: 'luis5', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'luis', msg: 'luis6', duration: DEFAULT_DIALOGUE_DISPLAY_TIME},
    {type: 'tyrell', msg: 'tyrell6', duration: DEFAULT_DIALOGUE_DISPLAY_TIME}
    ];

  var progress;
  var background;

  // These are the actual sprites and buttons that will be created and
  // destroyed as the dialogue progresses.
  var choiceButton1;
  var choiceButton2;
  var luisDialogue;
  var tyrellDialogue;
  var spriteLuis;
  var spriteTyrell;
  var narrative;

  function init() {
    progress = 0;

    choiceButton1 = null;
    choiceButton2 = null;
    dateDialogue = null;
    friendDialogue = null;
  }

  function preload() {

    //background
    game.load.image('background', 'assets/Backgrounds/post-prom-bkgrd.png');

    //narrative assets
    game.load.image('narrative1', 'assets/bystander-intervention/PP_narrative1.png');
    game.load.image('narrative2', 'assets/bystander-intervention/PP_narrative2.png');
    game.load.image('narrative3', 'assets/bystander-intervention/PP_narrative3.png');
    game.load.image('narrative4', 'assets/bystander-intervention/PP_narrative4.png');
    game.load.image('narrative5', 'assets/bystander-intervention/PP_narrative5.png');

    //player assets
    game.load.image('choice1a', 'assets/bystander-intervention/BI_choice1a.png');
    game.load.image('choice1b', 'assets/bystander-intervention/BI_choice1b.png');
    game.load.image('choice2a', 'assets/bystander-intervention/BI_choice2a.png');
    game.load.image('choice2b', 'assets/bystander-intervention/BI_choice2b.png');

    //luis assets
    game.load.image('luisPic', 'assets/luis.png');
    game.load.image('luis1', 'assets/bystander-intervention/BI_luis1.png');
    game.load.image('luis2', 'assets/bystander-intervention/BI_luis2.png');
    game.load.image('luis3', 'assets/bystander-intervention/BI_luis3.png');
    game.load.image('luis4', 'assets/bystander-intervention/BI_luis4.png');
    game.load.image('luis5', 'assets/bystander-intervention/BI_luis5.png');
    game.load.image('luis6', 'assets/bystander-intervention/BI_luis6.png');

    //tyrell assets
    game.load.image('tyrellPic', 'assets/tyrell.png');
    game.load.image('tyrell1', 'assets/bystander-intervention/BI_tyrell1.png');
    game.load.image('tyrell2', 'assets/bystander-intervention/BI_tyrell2.png');
    game.load.image('tyrell3', 'assets/bystander-intervention/BI_tyrell3.png');
    game.load.image('tyrell4', 'assets/bystander-intervention/BI_tyrell4.png');
    game.load.image('tyrell5', 'assets/bystander-intervention/BI_tyrell5.png');
    game.load.image('tyrell6', 'assets/bystander-intervention/BI_tyrell6.png');
  }

  function create() {
    var bg;
    var properties;
    var fadeInDuration;
    var ease;
    var autoStart;
    var delay;
    var repeat;
    var yoyo;

    background = game.add.tileSprite(0, 0, 800, 600, 'background');

    background.alpha = 0;

    properties = {alpha: 1};
    fadeInDuration = 2000;
    ease = Phaser.Easing.Linear.None;
    autoStart = true;
    delay = 0;
    repeat = 0;
    yoyo = false;
    game.add.tween(background).to(properties, fadeInDuration, ease, autoStart, delay, repeat, yoyo);

    setTimeout(displayNext, fadeInDuration);
  }

  function update() {}

  /**
   * createChoiceButton: [asset key] int int -> void
   * adds a button to the current state at the given position, using the asset key as the image
  **/

  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, null, null, 2, 1, 0);
  }

  /**
   * createChoiceButton1: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton1(key) {
    return createChoiceButton(key, game.world.centerX + 50, game.world.centerY + 50);
  }

  /**
   * createChoiceButton2: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createChoiceButton2(key) {
    return createChoiceButton(key, game.world.centerX - 350, game.world.centerY + 50);
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
   * createLuisDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
   */
  function createLuisDialogue(key) {
    if (!spriteLuis) {
      spriteLuis = game.add.sprite(game.world.centerX + 150, game.world.centerY - 200, 'luisPic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createTyrellDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
   */
  function createTyrellDialogue(key) {
    if (!spriteTyrell) {
      spriteTyrell = game.add.sprite(game.world.centerX - 350, game.world.centerY - 200, 'tyrellPic');
    }

    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createNarrative: [asset key] -> void 
   * adds narrative sprite corresponding to asset key to the screen 
   */
  function createNarrative(key) {
    return game.add.sprite(game.world.centerX - 350, game.world.centerY + 100, key);
  }

  /**
   * displayNext: void -> void
   * function iterates through dialogueTree and checks 'type' tag in order to display friend/date dialogue or choice buttons.
   */
  function displayNext() {
    if (tyrellDialogue) {
      tyrellDialogue.destroy();
    }
    
    if (luisDialogue) {
      luisDialogue.destroy();
    }

    if (narrative) {
      narrative.destroy();
    }

    if (progress >= dialogueTree.length) { 
      transitionToNextState();
      return;
    }

    console.log(progress);

    if (dialogueTree[progress].type == 'choice') {

      //checking for correct player choice dialogue buttons
      switch(dialogueTree[progress].msg) {

        case 0:
          key1 = 'choice1a';
          key2 = 'choice1b';
          console.log('c1');
          break;

        case 1:
          key1 = 'choice2a';
          key2 = 'choice2b';
          console.log('c2');
          break;

        default:
          console.log('error in switch');
      }

      // Destroying buttons to clean up references, like removing event listeners
      if (choiceButton1) {
        choiceButton1.destroy();
      }

      if (choiceButton2) {
        choiceButton2.destroy();
      }

      choiceButton1 = createChoiceButton1(key1);
      choiceButton1.inputEnabled = true;
      choiceButton1.events.onInputUp.add(onChoiceSelected, {selected: 1});
      choiceButton1.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton1}));
      choiceButton1.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton1}));

      choiceButton2 = createChoiceButton2(key2);
      choiceButton2.inputEnabled = true;
      choiceButton2.events.onInputUp.add(onChoiceSelected, {selected: 2});
      choiceButton2.events.onInputOver.add(increaseButtonSize.bind({button: choiceButton2}));
      choiceButton2.events.onInputOut.add(decreaseButtonSize.bind({button: choiceButton2}));
    }
    else if (dialogueTree[progress].type == 'narrative') {
      narrative = createNarrative(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
      console.log('narrative');
    }
    else if (dialogueTree[progress].type == 'luis') {
      luisDialogue = createLuisDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else if (dialogueTree[progress].type == 'tyrell') {
      tyrellDialogue = createTyrellDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, dialogueTree[progress].duration);
    }
    else {
      console.log('unable to match type');
    }

    // Progress the dialogue tree
    progress++;
  }

  /**
   * onChoiceSelected: void -> void
   * clears the screen of all buttons and/or dialogue, resets all to null, and then displays the next dialogue
   */
  function onChoiceSelected() {
    if (choiceButton1) {
      choiceButton1.destroy();
    }

    if (choiceButton2) {
      choiceButton2.destroy();
    }

    luisDialogue = null;
    tyrellDialogue = null;
    choiceButton1 = null;
    choiceButton2 = null;
    narrative = null;

    // Display the next dialogue
    displayNext();
  }

  /**
   * Begin transition to the next state with a fade out.
   */
  function transitionToNextState() {
    var properties = {alpha: 0};
    var fadeOutDuration = 1500;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 1000;
    var repeat = false;
    var yoyo = false;

    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteLuis).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    game.add.tween(spriteTyrell).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    // 250ms buffer to fix flicker problem
    setTimeout(startNextState, fadeOutDuration + delay - 250);
  }

  /**
   * Add and start next state. Starting a new state automatically shuts down the current one.
   */
  function startNextState() {
    game.state.add('end-screen', new EndScreen());
    game.state.start('end-screen');
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

function EndScreen() {

  var factTree = [
    {type: 'fact', msg: 'fact0'},
    {type: 'fact', msg: 'fact1'},
    {type: 'fact', msg: 'fact2'},
    {type: 'fact', msg: 'fact3'},
    {type: 'fact', msg: 'fact4'}
  ];

  var button;
  var progress;
  var curFact;
  var curKey;

  function init() {

    progress = 0;
    curFact = null;
    curKey = 'fact0';

  }

  function preload() {

    game.load.image('fact0', 'assets/end-screen/ES_fact0.png');
    game.load.image('fact1', 'assets/end-screen/ES_fact1.png');
    game.load.image('fact2', 'assets/end-screen/ES_fact2.png');
    game.load.image('fact3', 'assets/end-screen/ES_fact3.png');
    game.load.image('fact4', 'assets/end-screen/ES_fact4.png');

    // @TODO change this asset to a "GET INVOLVED" button or something similar
    game.load.image('button', 'assets/end-screen/ES_cta.png');
  }

  function create() {
    setTimeout(displayNext, 1000);
  }

  function update() {}

  function createFact() {
    curFact = game.add.sprite(0, game.world.centerY - game.cache.getImage(curKey).height/2, curKey);
    curFact.alpha = 0;
  }

  function displayNext() {
    var delay = 4000;
    var animation;

    animation = game.add.tween(curFact).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    animation.yoyo(true, delay);

    if (progress >= factTree.length) {
      setTimeout(showButton, 5000);
      setTimeout(showDanceStats, 8000);
    }
    else {
      //progress to next
      curKey = factTree[progress].msg;

      curFact = null;
      curFact = game.add.sprite(0, game.world.centerY - game.cache.getImage(curKey).height/2, curKey);
      curFact.alpha = 0;

      progress++;

      setTimeout(displayNext, 1000 + delay);
    }
  }

  /**
   * Display some stats on how the dance scene went.
   */
  function showDanceStats() {
    var statMsg;
    var style;
    var text;
    var timeDancing;
    var strTimeDancing;
    var numCollisions;

    timeDancing = new Date(GLOBALS.timeDancing);
    strTimeDancing = timeDancing.getMinutes() + ':';
    if (timeDancing.getSeconds() == 0) {
      strTimeDancing += '00';
    }
    else if (timeDancing.getSeconds() < 10) {
      strTimeDancing += '0' + timeDancing.getSeconds();
    }
    else {
      strTimeDancing += timeDancing.getSeconds();
    }

    numCollisions = GLOBALS.numEnemiesCollided + GLOBALS.numTablesCollided;

    statMsg = 'Time Spent Dancing: ' + strTimeDancing + '\n'
        + 'Tables & dancers hit: ' + numCollisions;

    style = {
      'font-family': '"Proxima Nova", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
      'font-size': '18px',
      'fill': '#fff'
    };

    // Display text on the canvas
    text = game.add.text(game.world.centerX, game.world.centerY + 150, statMsg, style);
    text.anchor.set(0.5);
    text.alpha = 0;

    // Animate alpha channel
    game.add.tween(text).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
  }

  /**
   * Show button to scroll to the register form.
   */
  function showButton() {
    button = game.add.button(game.world.centerX - 300, game.world.centerY - 50, 'button', null, null, 2, 1, 0);
    button.alpha = 0;
    button.inputEnabled = true;
    button.events.onInputUp.add(onButtonClick);
    button.events.onInputOver.add(increaseButtonSize.bind({button: button}));
    button.events.onInputOut.add(decreaseButtonSize.bind({button: button}));

    game.add.tween(button).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);

    // Fade in the #register-container
    $('#register-container').fadeIn('slow');
  }

  /**
   * Callback when button is clicked.
   */
  function onButtonClick() {
    $('html, body').animate({
      scrollTop: $('#register-container').offset().top
    }, 1000);
    $('#first_name').focus();
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

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('end-screen', new EndScreen());
// game.state.start('end-screen');