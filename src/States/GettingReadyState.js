function GettingReady() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var choiceButton1, choiceButton2, dateDialogue, friendDialogue;
  
  var dialogueTree = [
    {type: 'friend', msg: 'friend1', delay: -1, duration: -1},
    {type: 'date', msg: 'date1', delay: -1, duration: -1},
    {type: 'date', msg: 'date2', delay: -1, duration: -1},
    {type: 'friend', msg: 'friend2', delay: -1, duration: -1},
    {type: 'friend', msg: 'friend3', delay: -1, duration: -1},
    {type: 'date', msg: 'date3', delay: -1, duration: -1},
    {type: 'choice', msg: 0, delay: -1, duration: -1}, 
    ];

  var progress;
  var background;
  var DIALOGUE_DISPLAY_TIME = 2000;

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
    //game.load.image('friend4', 'assets/getting-ready/GR_friend4.png');

  }

  console.log('loaded assets');

  function create() {
    var bg;
    var properties;
    var fadeInDuration;
    var ease;
    var autoStart;
    var delay;
    var repeat;
    var yoyo;

    console.log('in create');

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
    game.add.sprite(game.world.centerX + 150, game.world.centerY - 200, 'datePic');
    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
  }

  /**
   * createFriendDialogue: [asset key] -> void
   * adds a button to the current state, using the asset key as the image
  **/

  function createFriendDialogue(key) {
    game.add.sprite(game.world.centerX - 350, game.world.centerY - 200, 'friendPic');
    return game.add.sprite(game.world.centerX - 150, game.world.centerY - 250, key);
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
      setTimeout(displayNext, DIALOGUE_DISPLAY_TIME);
      console.log('date');
    }
    else if (dialogueTree[progress].type == 'friend') {
      friendDialogue = createFriendDialogue(dialogueTree[progress].msg);
      setTimeout(displayNext, DIALOGUE_DISPLAY_TIME);
      console.log('friend');
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

    // if (dateDialogue) {
    //   dateDialogue.destroy();
    // }
    
    // if (friendDialogue) {
    //   friendDialogue.destroy();
    // }

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
    var fadeOutDuration = 2000;
    var ease = Phaser.Easing.Linear.None;
    var autoStart = true;
    var delay = 2000;
    var repeat = false;
    var yoyo = false;

    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    setTimeout(startNextState, fadeOutDuration + delay);
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
//game.state.start('getting-ready');
