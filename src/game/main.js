var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game');
console.log('game made');

//for more global(?) control of the game states, maybe consider refactoring to include a StateManager?
game.state.add('at-mini-game', new AtDanceGame());
game.state.start('at-mini-game');

console.log('im aive andy ;)');
