define([
  'scenes/BaseScene',
  'scenes/scene1/S1Narration01',
],
function(BaseScene, S1Narration01) {
  'use strict';

  var TAG = 'scene-1';

  /**
   * Constructor. Scene1 inherits BaseScene.
   */
  function Scene1() {
    var narration1 = new S1Narration01();

    this.sequences = [
      narration1,
    ];
  }
  Scene1.prototype = Object.create(BaseScene.prototype);

  Scene1.prototype.create = function() {
    BaseScene.prototype.create.call(this);

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