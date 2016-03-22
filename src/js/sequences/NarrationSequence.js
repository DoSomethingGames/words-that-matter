define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function NarrationSequence(scene) {
    BaseSceneSequence.call(this, scene);
  }
  NarrationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return NarrationSequence;
});