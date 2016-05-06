define([
  'sequences/NarrationSequence',
  'util/SpriteUtils'
],
function(
  NarrationSequence,
  SpriteUtils
) {
  'use strict';

  function VS1Sq03Narration(scene) {
    NarrationSequence.call(this, scene);

    this.steps = [
      {type: "background", value: "vs1-house-01"},
      {type: "text", value: "The door burst open."},
      {type: "background", value: "vs1-house-02"},
      {type: "text", value: "Alex is standing there, smiling, draped in a floor-length gown."},
      {type: "text", value: "Over the skirt are streamers of fabric in all different shades\nof blue and green - handsewn on, of course."},
      {type: "background", value: "vs1-house-03"},
      {type: "text", value: "Alex has on dark green lipstick and lots - and really, a lot - of eyeshadow."}
    ];
  }

  VS1Sq03Narration.prototype = Object.create(NarrationSequence.prototype);

  VS1Sq03Narration.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);

    game.load.image('vs1-house-01', 'assets/vs1-house-01.jpg');
    game.load.image('vs1-house-02', 'assets/vs1-house-02.jpg');
    game.load.image('vs1-house-03', 'assets/vs1-house-03.jpg');
  };

  VS1Sq03Narration.prototype.onUpdate = function() {
    NarrationSequence.prototype.onUpdate.call(this);
  };

  VS1Sq03Narration.prototype.start = function() {
    // SpriteUtils.addBackground('vs1-house-01');

    NarrationSequence.prototype.start.call(this);
  };

  VS1Sq03Narration.prototype.end = function() {
    NarrationSequence.prototype.end.call(this);
  };

  return VS1Sq03Narration;
});