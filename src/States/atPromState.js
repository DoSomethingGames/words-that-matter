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
