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
    game.load.image('vs1-house-01', 'assets/vs1-house-01.jpg');
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
      bg2.tilePosition.x = -274;  // -144. idk. I'm just gonna comment out these other values here in case someone wants to give these a try instead.
      bg2.tilePosition.y = -154;  // -162
      bg2.tileScale.x = 0.65;     // 0.584
      bg2.tileScale.y = 0.65;     // 0.584
      bg2.alpha = 0;

      t2 = game.add.tween(bg2).to({alpha: 1}, 500, 'Linear', true);
      t2.start();
    }, 2000);

    setTimeout(function() {
      var bg3;
      var t3;

      bg3 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
      bg3.tilePosition.x = -484;  // -290
      bg3.tilePosition.y = -354;  // -282
      bg3.tileScale.x = 0.83;     // 0.83
      bg3.tileScale.y = 0.83;     // 0.83
      bg3.alpha = 0;

      t3 = game.add.tween(bg3).to({alpha: 1}, 500, 'Linear', true);
      t3.start();
    }, 4000);

    setTimeout(function() {
      var bg4;
      var t4;
      
      bg4 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-background');
      bg4.tilePosition.x = -818;  // -516
      bg4.tilePosition.y = -596;  // -412
      bg4.tileScale.x = 1.24;     // 1.24
      bg4.tileScale.y = 1.24;     // 1.24
      bg4.alpha = 0;

      t4 = game.add.tween(bg4).to({alpha: 1}, 500, 'Linear', true);
      t4.start();
    }, 6000);

    setTimeout(function() {
      var bg5;
      var t5;
      
      bg5 = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, 'vs1-house-01');
      bg5.scale.setTo(0.5, 0.5);
      bg5.alpha = 0;

      t5 = game.add.tween(bg5).to({alpha: 1}, 1000, 'Linear', true);
      t5.start();

      t5.onComplete.add(onComplete.bind(self));
    }, 9000);
  };

  function onComplete() {
    this.end();
  }

  return VS1Sq02Transition;

});