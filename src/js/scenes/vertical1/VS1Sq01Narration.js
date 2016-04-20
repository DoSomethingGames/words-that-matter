define([
  'sequences/NarrationSequence'
],
function(NarrationSequence) {
  'use strict';

  function VS1Sq01Narration(scene) {
    NarrationSequence.call(this, scene);
  }

  VS1Sq01Narration.prototype = Object.create(NarrationSequence.prototype);

  VS1Sq01Narration.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);
  };

  return VS1Sq01Narration;
});