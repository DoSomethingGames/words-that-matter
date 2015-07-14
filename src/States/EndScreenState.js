function EndScreen() {

  var factTree = [
    {type: 'fact', msg: 'fact0'},
    {type: 'fact', msg: 'fact1'},
    {type: 'fact', msg: 'fact2'},
    {type: 'fact', msg: 'fact3'},
    {type: 'fact', msg: 'fact4'}
  ];

  var progress;
  var curFact;
  var curKey;

  function init() {

    progress = 0;
    curFact = null;
    curKey = 'fact0';

  }

  function preload() {

    game.load.image('fact0', 'assets/end-screen/ES_fact0.png');
    game.load.image('fact1', 'assets/end-screen/ES_fact1.png');
    game.load.image('fact2', 'assets/end-screen/ES_fact2.png');
    game.load.image('fact3', 'assets/end-screen/ES_fact3.png');
    game.load.image('fact4', 'assets/end-screen/ES_fact4.png');

  }

  function create() {
    setTimeout(displayNext, 1000);
  }

  function update() {}

  function createFact() {
    curFact = game.add.sprite(0, game.world.centerY - game.cache.getImage(curKey).height/2, curKey);
    curFact.alpha = 0;
  }

  function displayNext() {
    var delay = 3000;
    var animation = game.add.tween(curFact).to( { alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
    animation.yoyo(true, delay);

    //progress to next
    curKey = factTree[progress].msg;

    if (progress >= factTree.length) {
      ///////////////*** GO TO 1 in 3 CAMPAIGN OR CTL PLUG ***///////////////////////
    } else {
      progress++;
    }
    curFact = null;
    curFact = game.add.sprite(0, game.world.centerY - game.cache.getImage(curKey).height/2, curKey);
    curFact.alpha = 0;

    setTimeout(displayNext, 2000 + delay);
  }

  return {
      init: init,
      preload: preload,
      create: create,
      update: update
  }
}

game.state.add('end-screen', new EndScreen());
game.state.start('end-screen');