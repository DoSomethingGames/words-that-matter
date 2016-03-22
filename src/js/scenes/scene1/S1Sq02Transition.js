define([
  'sequences/TransitionSequence'
],
function(TransitionSequence) {
  'use strict';

  function S1Sq02Transition(scene) {
    TransitionSequence.call(this, scene);
  }

  S1Sq02Transition.prototype = Object.create(TransitionSequence.prototype);

  S1Sq02Transition.prototype.onPreload = function() {
    game.load.image('s1sq02-table', 'assets/mini-game/ADG_table.png');
  };

  S1Sq02Transition.prototype.start = function() {
    var table = game.add.sprite(100, 100, 's1sq02-table');

    var tween = game.add.tween(table).to({x: 480, y: 200}, 2000, 'Quart.easeOut');
    tween.onComplete.add(onComplete.bind(this));
    tween.start();
  };

  function onComplete() {
    this.end();
  }

  return S1Sq02Transition;

});