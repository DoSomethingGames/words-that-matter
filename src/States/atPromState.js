var dialogueGroup = game.add.group();

function AtProm() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var button1, button2, dateDialogue, friendDialogue;

  // This is a way to move linearly through the dialogue
  //var dialogueTree = [0, 'date', 'friend', 1, 'date', 'friend', 'date', 2, 'friend', 'date', 3, 'date', 4];
  
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
    {type: 'choice', msg: 0, delay: -1, duration: -1},
    {type: 'date', msg: 'date5', delay: -1, duration: -1},
    {type: 'choice', msg: 4, delay: -1, duration: -1}
    ];

  var count;
  var DIALOGUE_DISPLAY_TIME = 4000;
  var dialogueGroup = game.add.group();

  function init() {}

  function preload() {

    //player assets
    game.load.image('choice1a', 'assets/AP_choice1a.jpg');
    game.load.image('choice1b', 'assets/AP_choice1b.jpg');
    game.load.image('choice2a', 'assets/AP_choice2a.jpg');
    game.load.image('choice2b', 'assets/AP_choice2b.jpg');
    game.load.image('choice3a', 'assets/AP_choice3a.jpg');
    game.load.image('choice3b', 'assets/AP_choice3b.jpg');
    game.load.image('choice4a', 'assets/AP_choice4a.jpg');
    game.load.image('choice4b', 'assets/AP_choice4b.jpg');
    game.load.image('choice5a', 'assets/AP_choice5a.jpg');
    game.load.image('choice5b', 'assets/AP_choice5b.jpg');

    //date assets
    game.load.image('date1', 'assets/AP_date1.jpg');
    game.load.image('date2', 'assets/AP_date2.jpg');
    game.load.image('date3', 'assets/AP_date3.jpg');
    game.load.image('date4', 'assets/AP_date4.jpg');
    game.load.image('date5', 'assets/AP_date5.jpg');

    //friend assets
    game.load.image('friend1', 'assets/AP_friend1.jpg');
    game.load.image('friend2', 'assets/AP_friend2.jpg');
    game.load.image('friend3', 'assets/AP_friend3.jpg');

  }

  console.log('loaded assets');

  function create() {

    console.log('in create');

    game.stage.backgroundColor = '#182d3b';
    
    // These represent the two player choices, and are stand-ins throughout the progression
    var key1, key2;


    

    for (count = 0; count < dialogueTree.length; count++) {
      console.log(count); 
      displayNext();
    }

    /* ## (x,y) for various assets
     * player choice button1(game.world.centerX + 50, game.world.centerY + 50)
     * player choice button2(game.world.centerX - 350, game.world.centerY + 50)
     */

 /* function displayNext() {
    // destroy any existing dialogue sprite that's currently open

    if (dialogueTree[progress] typeof === 'number') {
      // create buttons and show choices for dialogue progress 0

      // set listener for button clicks
      choiceButton1.onInputUp(onChoiceUp, {button: choiceButton1});
      choiceButton2.onInputUp(onChoiceUp, {button: choiceButton2});
    }
    else if (dialogueTree[progress] == 'date') {
      // show date dialogue

      // move onto next dialogue after some set time
      setTimeout(displayNext, DATE_DIALOGUE_DISPLAY_TIME);

      // Note: if we wanted dialogue to overlap at some points, we could set different logic for when dialogue
      // gets destroyed and when it gets created
    }
    else if (dialogueTree[progress] == 'friend') {
      // show friend dialogue

      // move onto next dialogue after some set time
      setTimeout(displayNext, FRIEND_DIALOGUE_DISPLAY_TIME);
    }

    progress++;
    }

    function onChoiceUp() {
    // determine which button just got clicked by checking this.button
    // log the selection

    // progress to the next dialog item
    displayNext();
    }

*/    
  }

  function update() {}


  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, displayNext, null, 2, 1, 0);
  }

  function createChoiceButton1(key) {
    return createChoiceButton(key, game.world.centerX + 50, game.world.centerY + 50);
  }

  function createChoiceButton2(key) {
    return createChoiceButton(key, game.world.centerX - 350, game.world.centerY + 50);
  }

  function killButton(button) {
      button.destroy();
  }

  function killAllButton() {
      killButton(button1);
      killButton(button2);
  }

  function createDateDialogue(key) {
    return game.add.sprite(game.world.centerX -350, game.world.centerY - 200, key);
  }

  function createFriendDialogue(key) {
    return game.add.sprite(game.world.centerX + 50, game.world.centerY - 200, key);
  }

/*  function checkOtherDialogue() {
    if (dialogueTree[count] == 'date') {
      dateDialogue = createDateDialogue(dialogueTree[count].msg);
      otherDialogue.add(dateDialogue);
      setTimeout(dateDialogue.destroy(), timeDelay);

      console.log('date');

    } else if (dialogueTree[count] == 'friend') {
        friendDialogue = createFriendDialogue(dialogueTree[count].msg);
        otherDialogue.add(friendDialogue);
        setTimeout(friendDialogue.destroy, timeDelay);

        console.log('friend');
    } else {
        console.log('error in checkOtherDialogue');
    }
  }*/

  function displayNext() {

    //clears screen
    
    dialogueGroup.destroy();

      //for (count = 0; count < dialogueTree.length; count++) {
        if (dialogueTree[count].type == 'choice') {
          
          //checking for correct player choice dialogue buttons
          switch(dialogueTree[count].msg) {

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

          button1 = createChoiceButton1(key1);
          dialogueGroup.add(button1);
          button1.inputEnabled = true;
          button1.events.onInputUp.add(displayNext);

          button2 = createChoiceButton2(key2);
          dialogueGroup.add(button2);
          button2.inputEnabled = true;
          button2.events.onInputUp.add(displayNext);


        } else if (dialogueTree[count].type == 'date') {
          dateDialogue = createDateDialogue(dialogueTree[count].msg);
          dialogueGroup.add(dateDialogue);
          setTimeout(displayNext, DIALOGUE_DISPLAY_TIME);
          console.log('date');
        
        } else if (dialogueTree[count].type == 'friend') {
          friendDialogue = createFriendDialogue(dialogueTree[count].msg);
          dialogueGroup.add(friendDialogue);
          setTimeout(displayNext, DIALOGUE_DISPLAY_TIME);
          console.log('friend');
        
        } else {
          console.log('unable to match type');
        }
      }
    //}

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('at-prom', new AtProm());
game.state.start('at-prom');
