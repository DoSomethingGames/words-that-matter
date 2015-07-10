function AtProm() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var choiceButton1, choiceButton2, dateDialogue, friendDialogue, narrative;
  
  var dialogueTree = [
    {type: 'narrative', msg: 'narrative1', delay: -1, duration: -1},
    {type: 'narrative', msg: 'narrative2', delay: -1, duration: -1},
    {type: 'narrative', msg: 'narrative3', delay: -1, duration: -1},
    {type: 'narrative', msg: 'narrative4', delay: -1, duration: -1},
    {type: 'choice', msg: 0, delay: -1, duration: -1}, 
    {type: 'date', msg: 'date1', delay: -1, duration: -1},
    {type: 'choice', msg: 1, delay: -1, duration: -1}, 
    {type: 'friend', msg: 'friend1', delay: -1, duration: -1},
    {type: 'friend', msg: 'friend2', delay: -1, duration: -1}, 
    {type: 'date', msg: 'date2', delay: -1, duration: -1},  
    {type: 'date', msg: 'date3', delay: -1, duration: -1},
    {type: 'choice', msg: 2, delay: -1, duration: -1},
    {type: 'friend', msg: 'friend3', delay: -1, duration: -1},
    {type: 'date', msg: 'date4', delay: -1, duration: -1},
    {type: 'choice', msg: 3, delay: -1, duration: -1},
    {type: 'date', msg: 'date5', delay: -1, duration: -1},
    {type: 'choice', msg: 4, delay: -1, duration: -1}
    ];

  var progress;
  var DIALOGUE_DISPLAY_TIME = 2000;
  var NARRATIVE_DISPLAY_TIME = 3000;

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

    console.log('in create');

    //game.stage.backgroundColor = 'background';
    game.add.tileSprite(0, 0, 800, 600, 'background');

    //game.add.sprite(game.world.centerX - 350, game.world.centerY - 200, 'friendPic');
    //game.add.sprite(game.world.centerX + 150, game.world.centerY - 200, 'datePic');

    displayNext();
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
    else if (dialogueTree[progress].type == 'narrative') {
      narrative = createNarrative(dialogueTree[progress].msg);
      setTimeout(displayNext, NARRATIVE_DISPLAY_TIME);
      console.log('narrative');
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

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}
