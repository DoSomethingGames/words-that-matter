define([
  'scenes/BaseScene',
  'scenes/vertical1/VS1Sq01Narration',
  'scenes/vertical1/VS1Sq02Transition',
  'scenes/vertical1/VS1Sq03Narration',
  'sequences/DelaySequence',
  'util/SpriteUtils'
],
function(
  BaseScene,
  VS1Sq01Narration,
  VS1Sq02Transition,
  VS1Sq03Narration,
  DelaySequence,
  SpriteUtils
) {
  'use strict';

  var TAG = 'vertical1-scene';

  function Vertical1Scene() {
    BaseScene.call(this);

    this.sequences = [
      new DelaySequence(this, 2000),
      new VS1Sq01Narration(this),
      new VS1Sq02Transition(this),
      new VS1Sq03Narration(this),
    ];
  }
  Vertical1Scene.prototype = Object.create(BaseScene.prototype);
  Vertical1Scene.prototype.tag = TAG;

  Vertical1Scene.prototype.preload = function() {
    BaseScene.prototype.preload.call(this);

    game.load.image('vs1-background', 'assets/backgrounds/vs1-background.jpg');
  };

  Vertical1Scene.prototype.create = function() {
    SpriteUtils.addBackground('vs1-background');

    BaseScene.prototype.create.call(this);
  };

  return {
    start: function() {
      game.state.add(TAG, new Vertical1Scene());
      game.state.start(TAG);
    }
  };
});