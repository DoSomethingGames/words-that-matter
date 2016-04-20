define([], function() {

  return {
    /**
     * Adds a background sprite. The expectation is that the raw image will be
     * twice the size of the game viewport.
     *
     * @param imageName The name of the image
     */
    addBackground: function(imageName) {
      var bg = game.add.tileSprite(0, 0, game.width * 2, game.height * 2, imageName);
      bg.scale.setTo(0.5, 0.5);
    },
  };

});