define([
  'scenes/BaseScene'
],
function(BaseScene) {
  'use strict';

  var TAG = 'scene-1';

  /**
   * Constructor. Scene1 inherits BaseScene.
   */
  function Scene1() {}
  Scene1.prototype = Object.create(BaseScene.prototype);

  Scene1.prototype.create = function() {
    game.add.text(50, 50, 'SCENE 1', {fill: '#fff'});
  };

  /**
   * Module API exposed through requirejs.
   */
  return {
    start: function() {
      game.state.add(TAG, new Scene1());
      game.state.start(TAG);
    }
  };
});