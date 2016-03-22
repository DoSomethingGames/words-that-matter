define([
  'sequences/NarrationSequence'
],
function(NarrationSequence) {
  'use strict';

  function S1Sq01Narration(scene) {
    NarrationSequence.call(this, scene);

    this.current = null;
    this.buttonNext = null;
    this.order = [];
    this.currentOrderPos = 0;
  }

  S1Sq01Narration.prototype = Object.create(NarrationSequence.prototype);

  S1Sq01Narration.prototype.onPreload = function() {
    NarrationSequence.prototype.onPreload.call(this);

    game.load.image('s1sq01-n01', 'assets/getting-ready/GR_narrative1.png');
    game.load.image('s1sq01-n02', 'assets/getting-ready/GR_narrative2.png');
    game.load.image('s1sq01-n03', 'assets/getting-ready/GR_narrative3.png');

    this.order = [
      's1sq01-n01',
      's1sq01-n02',
      's1sq01-n03'
    ];
  };

  S1Sq01Narration.prototype.start = function() {
    NarrationSequence.prototype.onCreate.call(this);

    this.buttonNext = game.add.text(game.world.centerX, game.world.height - 100, 'NEXT', {fill: '#fff'});
    this.buttonNext.inputEnabled = true;
    this.buttonNext.events.onInputDown.add(onNextDown, this);
    this.buttonNext.events.onInputUp.add(onNextClicked, this);
  }

  S1Sq01Narration.prototype.onUpdate = function() {
    NarrationSequence.prototype.onUpdate.call(this);

    if (this.current === null) {
      this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    }

  };

  S1Sq01Narration.prototype.end = function() {
    NarrationSequence.prototype.end.call(this);

    this.buttonNext.destroy();
  };

  function onNextDown(item) {
    item.fill = '#fff';
  }

  function onNextClicked(item) {
    this.current.destroy();
    this.currentOrderPos++;
    if (this.currentOrderPos < this.order.length) {
      this.current = game.add.sprite(100, 100, this.order[this.currentOrderPos]);
    }
    else {
      this.end();
    }
  }

  return S1Sq01Narration;
});