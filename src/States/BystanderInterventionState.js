function BystanderIntervention() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var choiceButton1, choiceButton2, dateDialogue, friendDialogue;
  
  var dialogueTree = [
    {type: 'luis', msg: 'luis1'},
    {type: 'tyrell', msg: 'tyrell1'},
    {type: 'luis', msg: 'luis2'},
    {type: 'tyrell', msg: 'tyrell2'},
    {type: 'luis', msg: 'luis3'},
    {type: 'tyrell', msg: 'tyrell3'},
    {type: 'luis', msg: 'luis4'},
    {type: 'choice', msg: 0},
    {type: 'tyrell', msg: 'tyrell4'},
    {type: 'luis', msg: 'luis5'},
    {type: 'choice', msg: 1},
    {type: 'tyrell', msg: 'tyrell5'},
    {type: 'luis', msg: 'luis6'},
    {type: 'tyrell', msg: 'tyrell6'}
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
    game.load.image('background', 'assets/Backgrounds/post-prom-bkgrd.png');

    //player assets
    game.load.image('choice1a', 'assets/bystander-intervention/BI_choice1a.png');
    game.load.image('choice1b', 'assets/bystander-intervention/BI_choice1b.png');
    game.load.image('choice2a', 'assets/bystander-intervention/BI_choice2a.png');
    game.load.image('choice2b', 'assets/bystander-intervention/BI_choice2b.png');

    //luis assets
    game.load.image('luisPic', 'assets/luisCrop.png');
    game.load.image('luis1', 'assets/bystander-intervention/BI_luis1.png');
    game.load.image('luis2', 'assets/bystander-intervention/BI_luis2.png');
    game.load.image('luis3', 'assets/bystander-intervention/BI_luis3.png');
    game.load.image('luis4', 'assets/bystander-intervention/BI_luis4.png');
    game.load.image('luis5', 'assets/bystander-intervention/BI_luis5.png');
    game.load.image('luis6', 'assets/bystander-intervention/BI_luis6.png');

    //tyrell assets
    game.load.image('tyrellPic', 'assets/tyrellCrop.png');
    game.load.image('tyrell1', 'assets/bystander-intervention/BI_tyrell1.png');
    game.load.image('tyrell2', 'assets/bystander-intervention/BI_tyrell2.png');
    game.load.image('tyrell3', 'assets/bystander-intervention/BI_tyrell3.png');
    game.load.image('tyrell4', 'assets/bystander-intervention/BI_tyrell4.png');
    game.load.image('tyrell5', 'assets/bystander-intervention/BI_tyrell5.png');
    game.load.image('tyrell6', 'assets/bystander-intervention/BI_tyrell6.png');
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

    if (progress >= dialogueTree.length) {  //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ ISSUE!! @@@@@@@@@@@ -> progressing after loop
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
    //game.state.add('at-prom', new AtProm());
    //game.state.start('at-prom');

    //@@@@@@@ INSERT END CREDITS HERE

  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('bystander-intervention', new BystanderIntervention());
game.state.start('bystander-intervention');
