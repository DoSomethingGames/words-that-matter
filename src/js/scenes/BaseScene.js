define([
  'sequences/BaseSceneSequence',
],
function(BaseSceneSequence) {
  'use strict';

  var TAG = 'base-scene';

  /**
   * Parent class all scenes should inherit. Provides base functionality
   * for all scenes and basic structure for Phaser states.
   */
  function BaseScene() {
    this.nextScene;
    this.tag = TAG;
    this.sequences = [];
    this.currentSequence = 0;
  }

  BaseScene.prototype.tag = TAG;

  BaseScene.prototype.init = function() {
  };

  BaseScene.prototype.preload = function() {
    var i;

    for (i = 0; this.sequences != null && i < this.sequences.length; i++) {
      if (! isBaseSceneSequence(this.sequences[i])) {
        continue;
      }

      this.sequences[i].onPreload();
    }
  };

  BaseScene.prototype.create = function() {
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

  BaseScene.prototype.update = function() {
    var i;

    for (i = 0; this.sequences != null && i < this.sequences.length; i++) {
      if (! isBaseSceneSequence(this.sequences[i])) {
        continue;
      }

      this.sequences[i].onUpdate();
    }
  };

  BaseScene.prototype.setNextScene = function(scene) {
    this.nextScene = scene;
  };

  BaseScene.prototype.onCurrentSequenceEnd = function() {
    this.currentSequence++;

    if (this.currentSequence < this.sequences.length) {
      this.sequences[this.currentSequence].start();
    }
    else {
      this.end();
    }
  };

  BaseScene.prototype.end = function() {
    if (typeof this.nextScene !== 'undefined') {
      this.nextScene.start();
    }
  };

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