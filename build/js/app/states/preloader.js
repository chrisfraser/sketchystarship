define([], function() {
  'use strict';

  function Preloader() {
    this.asset = null;
    this.ready = false;
  }

  Preloader.prototype = {

    preload: function() {
      this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');

      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      this.load.setPreloadSprite(this.asset);

      this.loadResources();
    },

    loadResources: function() {
      this.load.spritesheet('ship', 'assets/ship.png', 100, 49);
      this.load.spritesheet('enemy', 'assets/enemy.png', 55, 75);
      this.load.spritesheet('explosion', 'assets/explosion.png', 75, 75);
      this.load.image('back', 'assets/back.png');
      this.load.bitmapFont('minecraftia', 'assets/minecraftia.png', 'assets/minecraftia.xml');

      for (var i = 1; i <= 11; i++) {
        this.load.image('bullet' + i, 'assets/bullet' + i + '.png');
      }

    },

    create: function() {
      this.asset.cropEnabled = false;
    },

    update: function() {
      if (!!this.ready) {
        this.game.state.start('menu');
      }
    },

    onLoadComplete: function() {
      this.ready = true;
    }
  };

  return Preloader;
});