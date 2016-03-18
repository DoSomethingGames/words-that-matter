define([
  'sequences/BaseSceneSequence'
],
function(BaseSceneSequence) {
  'use strict'

  function PersonConversationSequence() {
  }
  PersonConversationSequence.prototype = Object.create(BaseSceneSequence.prototype);

  return PersonConversationSequence;
});