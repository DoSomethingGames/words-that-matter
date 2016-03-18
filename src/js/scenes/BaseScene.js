define(function() {
  'use strict';

  /**
   * Parent class all scenes should inherit. Provides base functionality
   * for all scenes and basic structure for Phaser states.
   */
  function BaseScene() {
  }

  BaseScene.prototype.init = function() {
  };

  BaseScene.prototype.preload = function() {
  };

  BaseScene.prototype.create = function() {
  };

  BaseScene.prototype.update = function() {
  };

  return BaseScene;
});