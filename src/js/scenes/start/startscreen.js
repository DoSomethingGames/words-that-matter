define([
  'scenes/BaseScene',
  'scenes/vertical1/scene'
],
function(BaseScene, theNextScene) {
  'use strict';

  var TAG = 'start-screen';

  /**
   * Constructor. StartScene inherits BaseScene.
   */
  function StartScene() {
    BaseScene.call(this);

    this.setNextScene(theNextScene);
  }
  StartScene.prototype = Object.create(BaseScene.prototype);
  StartScene.prototype.tag = TAG;

  StartScene.prototype.preload = function() {
    BaseScene.prototype.preload.call(this);

    game.load.image('icon-fullscreen', 'assets/icon-fullscreen.png');
  };

  StartScene.prototype.create = function() {
    BaseScene.prototype.create.call(this);

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    var text = game.add.text(50, 50, 'WORDS THAT MATTER', {fill: '#fff'});
    text.inputEnabled = true;
    text.events.onInputDown.add(onInputDown, this);
    text.events.onInputUp.add(onStartClicked, this);

    var icFullscreen = game.add.sprite(game.world.width - 64, game.world.height - 64, 'icon-fullscreen');
    icFullscreen.anchor.set(0.5, 0.5);
    icFullscreen.width = 64;
    icFullscreen.height = 64;
    icFullscreen.inputEnabled = true;
    icFullscreen.events.onInputOver.add(onFullscreenBtnOver, this);
    icFullscreen.events.onInputOut.add(onFullscreenBtnOut, this);
    icFullscreen.events.onInputUp.add(onFullscreenBtnUp, this);
  };

  function onInputDown(item) {
    item.fill = '#0ff';
  }

  function onStartClicked(item) {
    this.end();
  }

  function onFullscreenBtnOver(sprite) {
    var tween = game.add.tween(sprite).to({width: 72, height: 72}, 150, 'Linear');
    tween.start();
  }

  function onFullscreenBtnOut(sprite) {
    var tween = game.add.tween(sprite).to({width: 64, height: 64}, 150, 'Linear');
    tween.start();
  }

  function onFullscreenBtnUp(sprite) {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen();
    }
    else {
      game.scale.startFullScreen(false);
    }
  };

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