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
    var delay = 2000;
    var repeat = false;
    var yoyo = false;

    startButton.kill();

    game.add.tween(background).to(properties, fadeOutDuration, ease, autoStart, delay, repeat, yoyo);
    setTimeout(startNextState, fadeOutDuration + delay);
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
