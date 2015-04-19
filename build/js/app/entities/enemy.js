define([
  'phaser',
  'app/entities/weapon'
], function(
  Phaser,
  Weapon
) {
  'use strict';

  var Enemy = function(game, x, y, sprite, dx, dy) {
    this.game = game;

    // Create the enemy
    Phaser.Sprite.call(this, game, x, y, sprite);

    this.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;

    //  Enemy velocity
    this.body.velocity.setTo(dx, dy);

    //  This makes the game world bounce-able
    this.body.collideWorldBounds = true;

    //  This sets the image bounce energy for the horizontal 
    //  and vertical vectors. "1" is 100% energy return
    this.body.bounce.set(1);

    this.animations.add('fly');
    this.animations.play('fly', 15, true);

    game.add.existing(this);
  };

  Enemy.prototype = Object.create(Phaser.Sprite.prototype);
  Enemy.prototype.constructor = Enemy;

  Enemy.prototype.update = function() {};

  return Enemy;
});