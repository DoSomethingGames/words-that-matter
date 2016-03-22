define(function() {
  'use strict';

  /**
   * Haven't exactly figured out how this is gonna work, but the intent
   * here is that scenes and the progression through them can be built
   * through a series of sequences. This class acts as the base for
   * those sequencess.
   */
  function BaseSceneSequence(scene) {
    this.scene = scene;
  }

  /**
   * Called in the scene's preload method.
   */
  BaseSceneSequence.prototype.onPreload = function() {
  }

  /**
   * Called in the scene's create method.
   */
  BaseSceneSequence.prototype.onCreate = function() {
  }

  /**
   * Called in the scene's update loop.
   */
  BaseSceneSequence.prototype.onUpdate = function() {
  }

  /**
   * Called to start a sequence.
   */
  BaseSceneSequence.prototype.start = function() {
  };

  /**
   * Called to end a sequence. Override this in child classes
   * to do any custom cleanup.
   */
  BaseSceneSequence.prototype.end = function() {
    this.scene.onCurrentSequenceEnd();
  };

  return BaseSceneSequence;
});