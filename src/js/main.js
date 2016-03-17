var game;

(function() {
  'use strict';

  game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

  requirejs.config({
    baseUrl: 'js/',
  });

  requirejs([
      './scenes/start/startscreen'
    ], function() {

      var startscreen = require('./scenes/start/startscreen');
      startscreen.setup();

      game.state.start(startscreen.getName());
    });
}());