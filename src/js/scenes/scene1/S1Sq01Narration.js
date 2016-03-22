define([
  'sequences/NarrationSequence'
],
function(NarrationSequence) {
  'use strict';

  function S1Sq01Narration(scene) {
    NarrationSequence.call(this, scene);
  }

  S1Sq01Narration.prototype = Object.create(NarrationSequence.prototype);

  S1Sq01Narration.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);

    game.load.image('s1sq01-n01', 'assets/getting-ready/GR_narrative1.png');
    game.load.image('s1sq01-n02', 'assets/getting-ready/GR_narrative2.png');
    game.load.image('s1sq01-n03', 'assets/getting-ready/GR_narrative3.png');

    this.order = [
      's1sq01-n01',
      's1sq01-n02',
      's1sq01-n03'
    ];
  };

  return S1Sq01Narration;
});