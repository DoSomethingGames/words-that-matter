define([
  'scenes/BaseScene',
  'sequences/DelaySequence',
  'util/SpriteUtils'
],
function(
  BaseScene,
  DelaySequence,
  SpriteUtils
) {
  'use strict';

  var TAG = 'vertical1-scene';

  function Vertical1Scene() {
    BaseScene.call(this);

    this.sequences = [
      new DelaySequence(this, 2000)
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