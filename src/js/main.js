var game;

(function() {
  'use strict';

  requirejs.config({
    baseUrl: 'js/',
    paths: {
      phaser: 'lib/phaser'
    },
    shim: {
      'phaser': {
        exports: 'Phaser'
      }
    }
  });

  require(['phaser'], function(Phaser) {

    game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

    requirejs([
        './scenes/start/startscreen'
      ], function() {

        var startscreen = require('./scenes/start/startscreen');
        startscreen.setup();

        game.state.start(startscreen.getName());

      });

  });
}());