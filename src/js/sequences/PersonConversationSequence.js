define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function PersonConversationSequence(scene) {
    BaseSceneSequence.call(this, scene);
  }
  PersonConversationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return PersonConversationSequence;
});