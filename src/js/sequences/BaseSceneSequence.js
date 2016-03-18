define(function() {
  'use strict';

  /**
   * Haven't exactly figured out how this is gonna work, but the intent
   * here is that scenes and the progression through them can be built
   * through a series of sequences. This class acts as the base for
   * those sequencess.
   */
  function BaseSceneSequence() {
    this.next = null;
  }

  BaseSceneSequence.prototype.onPreload = function() {
  }

  BaseSceneSequence.prototype.onCreate = function() {
  }

  BaseSceneSequence.prototype.onUpdate = function() {
  }

  BaseSceneSequence.prototype.setNextSequence = function(sequence) {
    if (sequence instanceof BaseSceneSequence === false) {
      console.error('Cannot set a ' + typeof sequence + ' as a scene Sequence');
      console.trace();
      return;
    }

    this.next = sequence;
  };

  BaseSceneSequence.prototype.start = function() {
  };

  BaseSceneSequence.prototype.goToNext = function() {
  };

  return BaseSceneSequence;
});