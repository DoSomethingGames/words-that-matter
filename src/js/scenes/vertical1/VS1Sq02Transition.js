define([
  'sequences/TransitionSequence'
],
function(TransitionSequence) {
  'use strict';

  function VS1Sq02Transition(scene) {
    TransitionSequence.call(this, scene);
  }

  VS1Sq02Transition.prototype = Object.create(TransitionSequence.prototype);

  VS1Sq02Transition.prototype.onPreload = function() {
    game.load.image('s1sq02-table', 'assets/mini-game/ADG_table.png');
  };

  VS1Sq02Transition.prototype.start = function() {
    var self = this;

    // Update scale, position and alpha over time to simulate movement
    var bg1 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
    bg1.tileScale.x = 0.5;
    bg1.tileScale.y = 0.5;

    setTimeout(function() {
      var bg2;
      var t2;

      bg2 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
      bg2.tilePosition.x = -274;
      bg2.tilePosition.y = -154;
      bg2.tileScale.x = 0.65;
      bg2.tileScale.y = 0.65;
      bg2.alpha = 0;

      t2 = game.add.tween(bg2).to({alpha: 1}, 500, 'Linear', true);
      t2.start();
    }, 2000);

    setTimeout(function() {
      var bg3;
      var t3;

      bg3 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
      bg3.tilePosition.x = -484;
      bg3.tilePosition.y = -354;
      bg3.tileScale.x = 0.83;
      bg3.tileScale.y = 0.83;
      bg3.alpha = 0;

      t3 = game.add.tween(bg3).to({alpha: 1}, 500, 'Linear', true);
      t3.start();
    }, 4000);

    setTimeout(function() {
      var bg4;
      var t4;
      
      bg4 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
      bg4.tilePosition.x = -818;
      bg4.tilePosition.y = -596;
      bg4.tileScale.x = 1.24;
      bg4.tileScale.y = 1.24;
      bg4.alpha = 0;

      t4 = game.add.tween(bg4).to({alpha: 1}, 500, 'Linear', true);
      t4.start();

      t4.onComplete.add(onComplete.bind(self));
    }, 6000);
  };

  function onComplete() {
    this.end();
  }

  return VS1Sq02Transition;

});