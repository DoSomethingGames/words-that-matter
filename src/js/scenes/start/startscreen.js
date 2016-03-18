define(function() {
  var TAG = 'start-screen';
  /**
   * @todo comment me
   */
  function StartScreen() {

    function init() {
      console.log('StartScreen.init()');
    }

    function preload() {
      console.log('StartScreen.preload()');
    }

    function create() {
      console.log('StartScreen.create()');
      game.add.text(50, 50, 'WORDS THAT MATTER', {fill: '#fff'});
    }

    function update() {
    }

    return {
      init: init,
      preload: preload,
      create: create,
      update: update
    };
  }

  /**
   * @todo comment me
   */
  return {
    getName: function() {
      return TAG;
    },

    setup: function() {
      game.state.add(TAG, new StartScreen());
    }
  };
});