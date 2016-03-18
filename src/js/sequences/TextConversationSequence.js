define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function TextConversationSequence() {
  }
  TextConversationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return TextConversationSequence;
});