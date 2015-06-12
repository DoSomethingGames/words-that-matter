
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {

    //player assets
    game.load.image('choice1a', 'assets/AP_choice1a.jpg');
    game.load.image('choice1b', 'assets/AP_choice1b.jpg');
    game.load.image('choice2a', 'assets/AP_choice2a.jpg');
    game.load.image('choice2b', 'assets/AP_choice2b.jpg');
    game.load.image('choice3a', 'assets/AP_choice3a.jpg');
    game.load.image('choice3b', 'assets/AP_choice3b.jpg');
    game.load.image('choice4a', 'assets/AP_choice4a.jpg');
    game.load.image('choice4b', 'assets/AP_choice4b.jpg');
    game.load.image('choice5a', 'assets/AP_choice5a.jpg');
    game.load.image('choice5b', 'assets/AP_choice5b.jpg');

    //date assets
    game.load.image('date1', 'assets/AP_date1.jpg');
    game.load.image('date2', 'assets/AP_date2.jpg');
    game.load.image('date3', 'assets/AP_date3.jpg');
    game.load.image('date4', 'assets/AP_date4.jpg');
    game.load.image('date5', 'assets/AP_date5.jpg');

    //friend assets
    game.load.image('friend1', 'assets/AP_friend1.jpg');
    game.load.image('friend2', 'assets/AP_friend2.jpg');
    game.load.image('friend3', 'assets/AP_friend3.jpg');

}

var button, button2;

function create() {

    game.stage.backgroundColor = '#182d3b';

    button = game.add.button(game.world.centerX - 300, game.world.centerY - 100, 'choice1a', null, null, 2, 1, 0);
    button2 = game.add.button(game.world.centerX + 100, game.world.centerY - 100, 'choice1b', null, null, 2, 1, 0);

    button.onInputDown.add(killButton(button), this);
    button2.onInputDown.add(killButton(button2), this);


    /* button.onInputOver.add(over, this);
     * button.onInputOut.add(out, this);
     * button.onInputUp.add(up, this);
     */

}

function up() {
    console.log('button up');
}

function over() {
    console.log('button over');
}

function out() {
    console.log('button out');
}

function killButton(button) {
    button.destroy();
}

function actionOnClick() {

    background.visible =! background.visible;

}

function actionOnClick2() {

    background2.visible =! background2.visible;

}
