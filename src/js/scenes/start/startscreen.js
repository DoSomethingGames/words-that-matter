define([
  'scenes/BaseScene',
  'scenes/scene1/scene1'
],
function(BaseScene, Scene1) {
  'use strict';

  var TAG = 'start-screen';

  /**
   * Constructor. StartScene inherits BaseScene.
   */
  function StartScene() {
    BaseScene.call(this);

    this.setNextScene(Scene1);
  }
  StartScene.prototype = Object.create(BaseScene.prototype);
  StartScene.prototype.tag = TAG;

  StartScene.prototype.create = function() {
    var text = game.add.text(50, 50, 'WORDS THAT MATTER', {fill: '#fff'});
    text.inputEnabled = true;
    text.events.onInputDown.add(onInputDown, this);
    text.events.onInputUp.add(onStartClicked, this);
  };

  function onInputDown(item) {
    item.fill = '#0ff';
  }

  function onStartClicked(item) {
    this.end();
  }

  /**
   * Module API exposed through requirejs.
   */
  return {
    start: function() {
      game.state.add(TAG, new StartScene());
      game.state.start(TAG);
    }
  };
});