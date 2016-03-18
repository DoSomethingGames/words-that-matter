define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function TransitionSequence() {
  }
  TransitionSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return TransitionSequence;
});