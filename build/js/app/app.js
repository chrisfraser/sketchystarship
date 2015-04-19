define([
  'phaser',
  'app/states/boot',
  'app/states/preloader',
  'app/states/menu',
  'app/states/game'
], function(
  Phaser,
  Boot,
  Preloader,
  Menu,
  Game
) {
  'use strict';

  function App() {}

  App.prototype = {
    start: function() {
      var game = new Phaser.Game(640, 480, Phaser.AUTO, 'sketchystarship');

      game.state.add('boot', Boot);
      game.state.add('preloader', Preloader);
      game.state.add('menu', Menu);
      game.state.add('game', Game);

      game.state.start('boot');
    }
  };

  return App;
});