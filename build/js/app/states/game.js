define([
  'phaser',
  'app/entities/weapon',
  'app/entities/player',
  'app/entities/enemy'
], function(
  Phaser,
  Weapon,
  Player,
  Enemy
) {
  'use strict';

  function Game() {
    this.player = null;
    this.enemy = null;
    this.enemies = null;
    this.cursors = null;
    this.speed = 300;
  }

  Game.prototype = {

    init: function() {
      this.game.renderer.renderSession.roundPixels = true;
      this.physics.startSystem(Phaser.Physics.ARCADE);
    },

    create: function() {
      this.setupBackground();

      this.player = new Player(this.game, 64, 200, 'ship', this.speed);

      this.createEnemy();

      //  Cursor keys to fly + space to fire
      this.cursors = this.input.keyboard.createCursorKeys();

      this.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

      this.input.keyboard.addKeyCapture([Phaser.Keyboard.ESC]);
    },

    update: function() {
      this.checkCollisions();
      this.processInput();
    },

    setupBackground: function() {
      this.stage.backgroundColor = '#DDDDDD';
      this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'back');
      this.background.autoScroll(-40, 0);
    },


    createEnemy: function() {
      // Create the enemy
      this.enemy = new Enemy(this.game, 400, 200, 'enemy', 200, 250);
    },

    checkCollisions: function() {

      this.physics.arcade.overlap(
        this.player.currentWeapon, this.enemy, this.enemyHit, null, this
      );

      this.physics.arcade.overlap(
        this.player, this.enemy, this.playerHit, null, this
      );
    },

    processInput: function() {
      if (this.input.keyboard.isDown(Phaser.Keyboard.ESC)) {
        this.exit();
      }
    },

    enemyHit: function(bullet, enemy) {
      bullet.kill();
      enemy.kill();

      var explosion = this.add.sprite(enemy.x, enemy.y, 'explosion');
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('boom');
      explosion.play('boom', 15, false, true);

      this.win = this.add.bitmapText(190, 200, 'minecraftia', 'You Win!', 50);

      this.add.bitmapText(160, 280, 'minecraftia', '(Press escape to restart)', 20).tint = 0x223344;
    },

    playerHit: function(player, enemy) {
      player.kill();

      var explosion = this.add.sprite(player.x, player.y, 'explosion');
      explosion.anchor.setTo(0.5, 0.5);
      explosion.animations.add('boom');
      explosion.play('boom', 15, false, true);

      this.loose = this.add.bitmapText(190, 200, 'minecraftia', 'You Lose!', 50).tint = 0xFF3344;

      this.add.bitmapText(160, 280, 'minecraftia', '(Press escape to restart)', 20).tint = 0x223344;
    },

    // Exit to Menu
    exit: function() {
      this.weapons = [];
      this.game.state.start('menu', true);
    }

  };

  return Game;
});