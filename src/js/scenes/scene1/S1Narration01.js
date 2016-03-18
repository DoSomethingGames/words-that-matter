define([
  'sequences/NarrationSequence'
],
function(NarrationSequence) {
  'use strict';

  function S1Narration01() {
    this.current = null;
    this.buttonNext = null;
    this.order = [];
    this.currentOrderPos = 0;
  }

  S1Narration01.prototype = Object.create(NarrationSequence.prototype);

  S1Narration01.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);

    game.load.image('narrative1', 'assets/getting-ready/GR_narrative1.png');
    game.load.image('narrative2', 'assets/getting-ready/GR_narrative2.png');
    game.load.image('narrative3', 'assets/getting-ready/GR_narrative3.png');

    this.order = [
      'narrative1',
      'narrative2',
      'narrative3'
    ];
  };

  S1Narration01.prototype.onCreate = function() {
    NarrationSequence.prototype.onCreate.call(this);

    this.buttonNext = game.add.text(game.world.centerX, game.world.height - 100, 'NEXT', {fill: '#aaa'});
    this.buttonNext.inputEnabled = true;
    this.buttonNext.events.onInputDown.add(onNextDown, this);
    this.buttonNext.events.onInputUp.add(onNextClicked, this);
  };

  S1Narration01.prototype.onUpdate = function() {
    NarrationSequence.prototype.onUpdate.call(this);

    if (this.current === null) {
      this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    }
  };

  function onNextDown(item) {
    item.fill = '#fff';
  }

  function onNextClicked(item) {
    this.current.destroy();
    this.currentOrderPos++;
    this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
  }

  return S1Narration01;
});