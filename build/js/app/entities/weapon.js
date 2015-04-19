define([
  'phaser',
  'app/entities/bullet'
], function(
  Phaser,
  Bullet
) {
  'use strict';
  var Weapon = {};

  ////////////////////////////////////////////////////
  //  A single bullet is fired in front of the ship //
  ////////////////////////////////////////////////////

  Weapon.Cannon = function(game) {
    Phaser.Group.call(this, game, game.world, 'Cannon', false, true, Phaser.Physics.ARCADE);
    this.offsetX = 20;
    this.offsetY = -15;
    this.nextFire = 0;
    this.bulletSpeed = 600;
    this.fireDelay = 100;

    for (var i = 0; i < 64; i++) {
      this.add(new Bullet(game, 'bullet5'), true);
    }

    return this;
  };

  Weapon.Cannon.prototype = Object.create(Phaser.Group.prototype);
  Weapon.Cannon.prototype.constructor = Weapon.Cannon;

  Weapon.Cannon.prototype.fire = function(source) {
    if (this.game.time.now < this.nextFire) {
      return;
    }

    var x = source.x + this.offsetX;
    var y = source.y + this.offsetY;

    // Get the first dead bullet and fire it
    this.getFirstExists(false).fire(x, y, 0, this.bulletSpeed, 0, 0);

    this.nextFire = this.game.time.now + this.fireDelay;
  };

  return Weapon;
});