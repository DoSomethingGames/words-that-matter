define([
  'scenes/BaseScene',
  'scenes/scene1/S1Sq01Narration',
  'scenes/scene1/S1Sq02Transition',
  'scenes/scene2/scene2'
],
function(
  BaseScene,
  S1Sq01Narration,
  S1Sq02Transition,
  Scene2
) {
  'use strict';

  var TAG = 'scene-1';

  /**
   * Constructor. Scene1 inherits BaseScene.
   */
  function Scene1() {
    BaseScene.call(this);

    var sq01 = new S1Sq01Narration(this);
    var sq02 = new S1Sq02Transition(this);

    this.sequences = [
      sq01,
      sq02
    ];

    this.setNextScene(Scene2);
  }
  Scene1.prototype = Object.create(BaseScene.prototype);
  Scene1.prototype.tag = TAG;

  Scene1.prototype.preload = function() {
    BaseScene.prototype.preload.call(this);

    game.load.image('sc1-background', 'assets/backgrounds/sc1-bg-example.png');
  };

  Scene1.prototype.create = function() {
    game.add.tileSprite(0, 0, 800, 600, 'sc1-background');
    game.add.text(50, 50, 'SCENE 1', {fill: '#fff'});

    // I think this needs to go last because otherwise, the background will be
    // drawn over top any sequence stuff called from the superclass.
    BaseScene.prototype.create.call(this);
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