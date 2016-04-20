define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function NarrationSequence(scene) {
    BaseSceneSequence.call(this, scene);

    // The "Next" button for progressing through the narrative
    this.buttonNext = null;

    // Array of string names for narrative sprites. In order they should be displayed
    this.order = [];

    // Current sprite displayed
    this.current = null;

    // Index of currently displayed sprite
    this.currentOrderPos = 0;
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

  /**
   * Called in the scene's update loop.
   */
  NarrationSequence.prototype.onUpdate = function() {
    BaseSceneSequence.prototype.onUpdate.call(this);

    if (this.current === null) {
      this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    }
  };

  /**
   * Start the sequence.
   */
  NarrationSequence.prototype.start = function() {
    BaseSceneSequence.prototype.start.call(this);

    this.buttonNext = game.add.text(game.world.centerX, game.world.height - 100, 'NEXT', {fill: '#fff'});
    this.buttonNext.inputEnabled = true;
    this.buttonNext.events.onInputDown.add(onNextDown, this);
    this.buttonNext.events.onInputUp.add(onNextClicked, this);
  };

  /**
   * End the sequence.
   */
  NarrationSequence.prototype.end = function() {
    BaseSceneSequence.prototype.end.call(this);

    this.buttonNext.destroy();
  };

  /**
   * Event handler when "Next" button is pressed down.
   */
  function onNextDown(item) {
    item.fill = '#fff';
  }

  /**
   * Event handler when "Next" button is clicked (input up event).
   */
  function onNextClicked(item) {
    // Cleanup the current sprite
    this.current.destroy();

    // Move to the next position
    this.currentOrderPos++;

    // Display the next sprite, or end the sequence if we're done
    if (this.currentOrderPos < this.order.length) {
      this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    }
    else {
      this.end();
    }
  }

  return NarrationSequence;
});