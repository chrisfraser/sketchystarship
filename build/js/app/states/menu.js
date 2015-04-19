define([
  'phaser'
], function(
  Phaser
) {
  'use strict';

  function Menu() {
    this.titleTxt = null;
    this.startTxt = null;
  }

  Menu.prototype = {

    create: function() {

      this.stage.backgroundColor = '#222';

      var x = this.game.width / 2,
        y = this.game.height / 2 - 80;


      this.titleTxt = this.add.bitmapText(x, y, 'minecraftia', 'Sketchy Starship', 50);
      this.titleTxt.align = 'center';
      this.titleTxt.x = this.game.width / 2 - this.titleTxt.textWidth / 2;

      y = y + this.titleTxt.height + 15;
      this.startTxt = this.add.bitmapText(x, y, 'minecraftia', 'START');
      this.startTxt.align = 'center';
      this.startTxt.x = this.game.width / 2 - this.startTxt.textWidth / 2;

      this.input.onDown.add(this.start, this);
      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    },

    update: function() {
      if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
        this.start();
      }

    },

    start: function() {
      this.game.state.start('game', true);
    }
  };

  return Menu;
});