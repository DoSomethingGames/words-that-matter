function AtProm() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var choiceButton1, choiceButton2, dateDialogue, friendDialogue;
  
  var dialogueTree = [
    {type: 'choice', msg: 0, delay: -1, duration: -1}, 
    {type: 'date', msg: 'date1', delay: -1, duration: -1},
    {type: 'friend', msg: 'friend1', delay: -1, duration: -1},
    {type: 'choice', msg: 1, delay: -1, duration: -1},
    {type: 'date', msg: 'date2', delay: -1, duration: -1},
    {type: 'friend', msg: 'friend2', delay: -1, duration: -1},
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

    //player assets
    game.load.image('choice1a', 'assets/AP_choice1a.png');
    game.load.image('choice1b', 'assets/AP_choice1b.png');
    game.load.image('choice2a', 'assets/AP_choice2a.png');
    game.load.image('choice2b', 'assets/AP_choice2b.png');
    game.load.image('choice3a', 'assets/AP_choice3a.png');
    game.load.image('choice3b', 'assets/AP_choice3b.png');
    game.load.image('choice4a', 'assets/AP_choice4a.png');
    game.load.image('choice4b', 'assets/AP_choice4b.png');
    game.load.image('choice5a', 'assets/AP_choice5a.png');
    game.load.image('choice5b', 'assets/AP_choice5b.png');

    //date assets
    game.load.image('date1', 'assets/AP_date1.png');
    game.load.image('date2', 'assets/AP_date2.png');
    game.load.image('date3', 'assets/AP_date3.png');
    game.load.image('date4', 'assets/AP_date4.png');
    game.load.image('date5', 'assets/AP_date5.png');

    //friend assets
    game.load.image('friend1', 'assets/AP_friend1.png');
    game.load.image('friend2', 'assets/AP_friend2.png');
    game.load.image('friend3', 'assets/AP_friend3.png');

  }

  console.log('loaded assets');

  function create() {

    console.log('in create');

    //game.stage.backgroundColor = 'background';
    game.add.tileSprite(0, 0, 800, 600, 'background');

    displayNext();
  }

  function update() {}


  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, null, null, 2, 1, 0);
  }

  function createChoiceButton1(key) {
    return createChoiceButton(key, game.world.centerX + 50, game.world.centerY + 50);
  }

  function createChoiceButton2(key) {
    return createChoiceButton(key, game.world.centerX - 350, game.world.centerY + 50);
  }

  function createDateDialogue(key) {
    return game.add.sprite(game.world.centerX -350, game.world.centerY - 200, key);
  }

  function createFriendDialogue(key) {
    return game.add.sprite(game.world.centerX + 50, game.world.centerY - 200, key);
  }

  /**
   * displayNext: void -> void
   * function iterates through dialogueTree and checks 'type' tag in order to display friend/date dialogue or choice buttons.
   */
  function displayNext() {

    if (progress >= dialogueTree.length) {
     // game.state.start('tbd');
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

      choiceButton1 = createChoiceButton1(key1);
      choiceButton1.inputEnabled = true;
      choiceButton1.events.onInputUp.add(onChoiceSelected, {selected: 1});

      choiceButton2 = createChoiceButton2(key2);
      choiceButton2.inputEnabled = true;
      choiceButton2.events.onInputUp.add(onChoiceSelected, {selected: 2});
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

    if (dateDialogue) {
      dateDialogue.destroy();
    }
    
    if (friendDialogue) {
      friendDialogue.destroy();
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
