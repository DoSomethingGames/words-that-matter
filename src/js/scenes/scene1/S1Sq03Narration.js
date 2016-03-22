define([
  'sequences/NarrationSequence'
],
function(NarrationSequence) {
  'use strict';

  function S1Sq03Narration(scene) {
    NarrationSequence.call(this, scene);
  }

  S1Sq03Narration.prototype = Object.create(NarrationSequence.prototype);

  S1Sq03Narration.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);

    game.load.image('s1sq03-n01', 'assets/getting-ready/GR_date1.png');
    game.load.image('s1sq03-n02', 'assets/getting-ready/GR_date2.png');
    game.load.image('s1sq03-n03', 'assets/getting-ready/GR_date3.png');

    this.order = [
      's1sq03-n01',
      's1sq03-n02',
      's1sq03-n03'
    ];
  };

  return S1Sq03Narration;
});