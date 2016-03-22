define([
  'sequences/BaseSceneSequence',
],
function(BaseSceneSequence) {
  'use strict';

  var TAG = 'base-scene';

  /**
   * Parent class all scenes should inherit. Provides base functionality
   * for all scenes and basic structure for Phaser states.
   *
   * Extends Phaser.State. So this and primarily it's child classes are what
   * should be added to the game StateManager and started.
   *
   * ie:
   *
   *   game.state.add('scene-name', new ChildOfBaseScene());
   *   game.state.start('scene-name');
   *
   */
  function BaseScene() {
    this.nextScene;
    this.tag = TAG;
    this.sequences = [];
    this.currentSequence = 0;
  }

  BaseScene.prototype = Object.create(Phaser.State.prototype);
  BaseScene.prototype.tag = TAG;

  /**
   * First function called when the scene starts up. Called before preload.
   *
   * @see http://phaser.io/docs/2.4.6/Phaser.State.html#init
   */
  BaseScene.prototype.init = function() {
    Phaser.State.prototype.init.call(this);
  };

  /**
   * Normally used to load game assets. Shouldn't create any objects in here.
   *
   * @see http://phaser.io/docs/2.4.6/Phaser.State.html#preload
   */
  BaseScene.prototype.preload = function() {
    Phaser.State.prototype.preload.call(this);

    var i;

    for (i = 0; this.sequences != null && i < this.sequences.length; i++) {
      if (! isBaseSceneSequence(this.sequences[i])) {
        continue;
      }

      this.sequences[i].onPreload();
    }
  };

  /**
   * Called once preload has completed. Safe to create loaded objects in here.
   *
   * http://phaser.io/docs/2.4.6/Phaser.State.html#create
   */
  BaseScene.prototype.create = function() {
    Phaser.State.prototype.create.call(this);

    var i;

    for (i = 0; this.sequences != null && i < this.sequences.length; i++) {
      if (! isBaseSceneSequence(this.sequences[i])) {
        continue;
      }

      this.sequences[i].onCreate();
    }

    // Start the first sequence
    if (this.sequences.length === 0) {
      console.assert('There are no sequences set for scene: %s', this.tag);
    }
    else {
      this.sequences[0].start();
    }
  };

  /**
   * Called during the core game loop after debug, physics, plugins and stage
   * have called their preUpdate methods.
   *
   * @see http://phaser.io/docs/2.4.6/Phaser.State.html#update
   */
  BaseScene.prototype.update = function() {
    Phaser.State.prototype.update.call(this);

    var i;

    for (i = 0; this.sequences != null && i < this.sequences.length; i++) {
      if (! isBaseSceneSequence(this.sequences[i])) {
        continue;
      }

      this.sequences[i].onUpdate();
    }
  };

  /**
   * Sets the next scene to start after this one is complete.
   */
  BaseScene.prototype.setNextScene = function(scene) {
    this.nextScene = scene;
  };

  /**
   * Handle the end of a current sequence. Typically this should just be to
   * move onto the next sequence, or scene if no sequences remain.
   */
  BaseScene.prototype.onCurrentSequenceEnd = function() {
    this.currentSequence++;

    if (this.currentSequence < this.sequences.length) {
      this.sequences[this.currentSequence].start();
    }
    else {
      this.end();
    }
  };

  /**
   * Called when this scene is complete.
   */
  BaseScene.prototype.end = function() {
    if (typeof this.nextScene !== 'undefined') {
      this.nextScene.start();
    }
  };

  /**
   * Helper method to determine if a sequence is an instanceof BaseSceneSequence.
   *
   * @param sequence
   * @return boolean
   */
  function isBaseSceneSequence(sequence) {
    if (sequence instanceof BaseSceneSequence === false) {
      console.assert(typeof sequence + ' is not a BaseSceneSequence');
      return false;
    }
    else {
      return true;
    }
  }

  return BaseScene;
});