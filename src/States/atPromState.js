//var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game'); // { preload: preload, create: create });


function atProm() {

  // These are the actual sprites and buttons that will be created and destroyed as the dialogue progresses
  var button1, button2, dateDialogue, friendDialogue;

  // This is a way to move linearly through the dialogue
  var dialogueTree = [0, 'date', 'friend', 1, 'date', 'friend', 'date', 2, 'friend', 'date', 3, 'date', 4];
  var dateDialogueTree = ['date1', 'date2', 'date3', 'date4', 'date5'];
  var friendDialogueTree = ['friend1', 'friend2', 'friend3'];

  var count, dCount, fCount;
  dCount = 0;
  fCount = 0;

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

  function create() {

    game.stage.backgroundColor = '#182d3b';
    
    // These represent the two player choices, and are stand-ins throughout the progression
    var key1, key2;
    var timeDelay = 10000;

    /* ## (x,y) for various assets
     * player choice button1(game.world.centerX + 50, game.world.centerY + 50)
     * player choice button2(game.world.centerX - 350, game.world.centerY + 50)
     */

    for (count = 0; count < dialogueTree.length; count++) {
      if (typeof dialogueTree[count] === 'number') {
        switch(dialogueTree[count]) {

          //console.log('dialogueTree[count]');

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

        //console.log('player choice');

        button1 = createChoiceButton1(key1);
        button1.inputEnabled = true;
        button1.onInputDown = checkOtherDialogue;

        button2 = createChoiceButton2(key2);
        button2.inputEnabled = true;
        button2.onInputDown = checkOtherDialogue;

        console.log('player choice');

        /*
        while (button1 && button2) {
          ;
        }
        */  

      } else {
        checkOtherDialogue();
        //console.log('error in matching dialogueTree');
      }
    }
  }

  function update() {}


  function createChoiceButton(key, x, y) {
    return game.add.button(x, y, key, killAllButton, null, 2, 1, 0);
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

  function checkOtherDialogue() {
    if (dialogueTree[count] == 'date') {
      setTimeout(dateDialogue = createDateDialogue(dateDialogueTree[dCount]), 
        timeDelay);
      dateDialogue.destroy();
      dCount++;
      console.log('date');

    } else if (dialogueTree[count] == 'friend') {
        setTimeout(friendDialogue = createFriendDialogue(friendDialogueTree[fCount]), 
          timeDelay);
        fCount++;
        friendDialogue.destroy();
        console.log('friend');
    } else {
        console.log('error in checkOtherDialogue');
    }
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('at-prom', new atProm());
game.state.start('at-prom');
