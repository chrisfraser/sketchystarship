define([
  'phaser',
  'app/entities/weapon'
], function(
  Phaser,
  Weapon
) {
  'use strict';

  var Player = function(game, x, y, sprite, speed) {
    this.game = game;
    this.speed = speed;
    this.weapons = [];
    this.currentWeapon = null;
    this.currentWeaponIndex = 0;
    this.weaponName = null;

    // Create weapons
    this.weapons.push(new Weapon.Cannon(game));

    this.weaponName = game.add.bitmapText(8, 430, 'minecraftia', '', 24);
    this.weaponName.tint = 0x223344;
    this.setWeapon(0);

    //  We call the Phaser.Sprite passing in the game reference
    Phaser.Sprite.call(this, game, x, y, sprite);

    this.anchor.setTo(0.5, 0.5);

    game.physics.arcade.enable(this);

    this.body.collideWorldBounds = true;

    this.animations.add('fly');
    this.animations.play('fly', 15, true);

    this.cursors = game.input.keyboard.createCursorKeys();

    game.add.existing(this);
  };

  Player.prototype = Object.create(Phaser.Sprite.prototype);
  Player.prototype.constructor = Player;

  Player.prototype.update = function() {
    this.body.velocity.set(0);

    if (this.cursors.left.isDown) {
      this.body.velocity.x = -this.speed;
    } else if (this.cursors.right.isDown) {
      this.body.velocity.x = this.speed;
    }

    if (this.cursors.up.isDown) {
      this.body.velocity.y = -this.speed;
    } else if (this.cursors.down.isDown) {
      this.body.velocity.y = this.speed;
    }

    // If the player is alive and spacebar is pressed
    if (this.alive && this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
      this.currentWeapon.fire(this);
    }
  };

  Player.prototype.setWeapon = function(weaponIndex) {
    if (this.currentWeapon) {
      this.currentWeapon.visible = false;
      this.currentWeapon.callAll('reset', null, 0, 0);
      this.currentWeapon.setAll('exists', false);
    }
    //  Activate the new one
    this.currentWeaponIndex = weaponIndex;
    this.currentWeapon = this.weapons[weaponIndex];

    this.currentWeapon.visible = true;

    this.weaponName.text = this.currentWeapon.name;
  };

  return Player;
});