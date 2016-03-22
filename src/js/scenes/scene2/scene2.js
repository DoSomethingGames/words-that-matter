define([
  'scenes/BaseScene'
],
function(
  BaseScene
) {
  'use strict';

  var TAG = 'scene-2';

  function Scene2() {
    BaseScene.call(this);
  }

  Scene2.prototype = Object.create(BaseScene.prototype);
  Scene2.prototype.tag = TAG;

  Scene2.prototype.create = function() {
    BaseScene.prototype.create.call(this);

    game.add.text(50, 50, 'SCENE 2', {fill: '#fff'});
  };

  return {
    start: function() {
      game.state.add(TAG, new Scene2());
      game.state.start(TAG);
    }
  }
});