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
    game.load.image('button', 'assets/playButton.png');
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
    var delay = 3000;
    var animation;

    animation = game.add.tween(curFact).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    animation.yoyo(true, delay);

    if (progress >= factTree.length) {
      setTimeout(showButton, 5000);
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
   * Show button to scroll to the register form.
   */
  function showButton() {
    button = game.add.button(game.world.centerX - 150, game.world.centerY - 100, 'button', null, null, 2, 1, 0);
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