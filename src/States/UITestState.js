function UITestState{

  var background;
  var uiText;

  function init() {

  }

  function preload() {
    //background
    game.load.image('background', 'assets/Backgrounds/AP_bkgrd.png');
    //text bubble
    game.load.image('text', 'assets/uiText.png');
  }

  function create() {
    background = game.add.tileSprite(0, 0, 800, 600, 'background');
    uiText = game.add.sprite(0, 400, 800, 200, 'text');

  }

  function update() {

  }

}