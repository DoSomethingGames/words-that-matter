define([
  'sequences/BaseSceneSequence',
  'util/SpriteUtils'
],
function(
  BaseSceneSequence,
  SpriteUtils
) {
  'use strict'

  function NarrationSequence(scene) {
    BaseSceneSequence.call(this, scene);

    // The "Next" button for progressing through the narrative
    this.buttonNext = null;

    // Array of string names for narrative sprites. In order they should be displayed
    this.steps = [];

    // Text currently drawn to the screen
    this.currentText = null;

    // Index of the currently displayed text
    this.currentIndex = -1;

    // Opaque background drawn underneath the text
    this.topBarBackground = null;
  }
  NarrationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  /**
   * Override this method in child classes to add any custom images needed for
   * the sequence and add to the `order` array.
   *
   * ex:
   *
   *   game.load.image('sprite1-name', 'path/to/sprite1.png');
   *   game.load.image('sprite2-name', 'path/to/sprite2.png');
   *   this.order = ['sprite1-name', 'sprite2-name'];
   *
   */
  NarrationSequence.prototype.onPreload = function() {
    BaseSceneSequence.prototype.onPreload.call(this);
  };

  NarrationSequence.prototype.onCreate = function() {
    BaseSceneSequence.prototype.onCreate.call(this);
  }

  /**
   * Called in the scene's update loop.
   */
  NarrationSequence.prototype.onUpdate = function() {
    BaseSceneSequence.prototype.onUpdate.call(this);

    // if (this.current === null) {
    //   this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    // }
  };

  /**
   * Start the sequence.
   */
  NarrationSequence.prototype.start = function() {
    BaseSceneSequence.prototype.start.call(this);

    this.currentIndex = 0;
    this.handleStep(this.currentIndex);
  };

  /**
   * End the sequence.
   */
  NarrationSequence.prototype.end = function() {
    BaseSceneSequence.prototype.end.call(this);

    this.buttonNext.destroy();
  };

  NarrationSequence.prototype.handleStep = function(index) {
    var step;

    if (index > this.steps.length) {
      this.end();
      return;
    }

    if (this.steps.length == 0 || index < 0) {
      this.drawNext();
      return;
    }

    step = this.steps[index];

    if (step.type === 'text') {
      this.drawText(step.value);
    }
    else if (step.type === 'background') {
      this.drawBackground(step.value);
    }
  }

  /**
   * Updates the background image in the scene.
   *
   * @todo add a delay and fade option so background can animate in before the next text
   */
  NarrationSequence.prototype.drawBackground = function(bg) {
    SpriteUtils.addBackground(bg);

    this.currentIndex++;
    this.handleStep(this.currentIndex);
  }

  /**
   * Draws text to the top of the screen.
   */
  NarrationSequence.prototype.drawText = function(text) {
    if (this.topBarBackground) {
      this.topBarBackground.destroy();
    }

    this.topBarBackground = game.add.graphics(0, 0);
    this.topBarBackground.beginFill(0x2d2d3c);
    this.topBarBackground.drawRect(0, 0, game.world.width, 120);
    this.topBarBackground.endFill();

    if (this.currentText) {
      this.currentText.destroy();
    }

    // @todo animate text onto the screen
    this.currentText = game.add.text(
      game.world.centerX,
      60,
      text,
      {fill: '#fff', align: 'center'});
    this.currentText.anchor.set(0.5);

    // @todo Listen for keyboard events or polish up this next button for progressing interaction
    this.drawNext();
  }

  /**
   * Draws the "Next" button to progress the narrative.
   */
  NarrationSequence.prototype.drawNext = function() {
    if (this.buttonNext) {
      this.buttonNext.destroy();
    }

    this.buttonNext = game.add.text(game.world.centerX, game.world.height - 100, 'NEXT', {fill: '#fff'});
    this.buttonNext.inputEnabled = true;
    this.buttonNext.events.onInputDown.add(onNextDown, this);
    this.buttonNext.events.onInputUp.add(onNextClicked, this);
  }

  /**
   * Event handler when "Next" button is pressed down.
   */
  function onNextDown(item) {
    item.fill = '#aaa';
  }

  /**
   * Event handler when "Next" button is clicked (input up event).
   */
  function onNextClicked(item) {
    this.currentIndex++;
    this.handleStep(this.currentIndex);
  }

  return NarrationSequence;
});