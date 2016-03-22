define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function TextConversationSequence(scene) {
    BaseSceneSequence.call(this, scene);
  }
  TextConversationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return TextConversationSequence;
});