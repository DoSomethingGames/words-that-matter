var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');

// Variables for tracking and displaying dance game stats
var GLOBALS = {
  numEnemiesCollided: 0,
  numTablesCollided: 0,
  timeDancing: 0
};

var registerSubmit = function() {
  var fname;
  var phone;

  fname = $('#first_name').val();
  phone = $('#phone').val();

  console.log('@TODO: register user on northstar');
};