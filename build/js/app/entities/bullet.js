define([
	'phaser'
], function(
	Phaser
) {
	'use strict';

	//  Our core Bullet class
	//  This is a simple Sprite object that we set a few properties on
	//  It is fired by all of the Weapon classes
	var Bullet = function(game, key) {
		// Call base sprite
		Phaser.Sprite.call(this, game, 0, 0, key);

		// Set scaling to nearest, this disables smoothing
		this.texture.baseTexture.scaleMode = PIXI.scaleModes.NEAREST;

		this.anchor.set(0.5);

		// Check if the bullet is out of bounds and kill it if it is
		this.checkWorldBounds = true;
		this.outOfBoundsKill = true;

		// Set default exists to false, bullets are pre-created
		this.exists = false;

		this.tracking = false;
		this.scaleSpeed = 0;
	};

	Bullet.prototype = Object.create(Phaser.Sprite.prototype);
	Bullet.prototype.constructor = Bullet;

	Bullet.prototype.fire = function(x, y, angle, speed, gx, gy) {
		gx = gx || 0;
		gy = gy || 0;

		this.reset(x, y);
		this.scale.set(1);

		this.game.physics.arcade.velocityFromAngle(angle, speed, this.body.velocity);

		this.angle = angle;

		this.body.gravity.set(gx, gy);
	};

	Bullet.prototype.update = function() {
		if (this.tracking) {
			this.rotation = Math.atan2(this.body.velocity.y, this.body.velocity.x);
		}

		if (this.scaleSpeed > 0) {
			this.scale.x += this.scaleSpeed;
			this.scale.y += this.scaleSpeed;
		}
	};


	return Bullet;
});