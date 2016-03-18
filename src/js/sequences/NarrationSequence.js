define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function NarrationSequence() {
  }
  NarrationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return NarrationSequence;
});