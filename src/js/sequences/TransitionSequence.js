define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function TransitionSequence(scene) {
    BaseSceneSequence.call(this, scene);
  }
  TransitionSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return TransitionSequence;
});