define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function DelaySequence(scene, delay) {
    BaseSceneSequence.call(this, scene);

    this.delay = delay;
  }
  DelaySequence.prototype = Object.create(BaseSceneSequence.prototype);

  DelaySequence.prototype.start = function() {
    BaseSceneSequence.prototype.start.call(this);

    setTimeout(this.end.bind(this), this.delay);
  };

  DelaySequence.prototype.end = function() {
    BaseSceneSequence.prototype.end.call(this);

    console.log('delay end');
  };

  return DelaySequence;
});