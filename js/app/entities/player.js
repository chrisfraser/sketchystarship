define(["phaser","app/entities/weapon"],function(e,t){"use strict";var n=function(n,r,i,s,o){this.game=n,this.speed=o,this.weapons=[],this.currentWeapon=null,this.currentWeaponIndex=0,this.weaponName=null,this.weapons.push(new t.Cannon(n)),this.weaponName=n.add.bitmapText(8,430,"minecraftia","",24),this.weaponName.tint=2241348,this.setWeapon(0),e.Sprite.call(this,n,r,i,s),this.anchor.setTo(.5,.5),n.physics.arcade.enable(this),this.body.collideWorldBounds=!0,this.animations.add("fly"),this.animations.play("fly",15,!0),this.cursors=n.input.keyboard.createCursorKeys(),n.add.existing(this)};return n.prototype=Object.create(e.Sprite.prototype),n.prototype.constructor=n,n.prototype.update=function(){this.body.velocity.set(0),this.cursors.left.isDown?this.body.velocity.x=-this.speed:this.cursors.right.isDown&&(this.body.velocity.x=this.speed),this.cursors.up.isDown?this.body.velocity.y=-this.speed:this.cursors.down.isDown&&(this.body.velocity.y=this.speed),this.alive&&this.game.input.keyboard.isDown(e.Keyboard.SPACEBAR)&&this.currentWeapon.fire(this)},n.prototype.setWeapon=function(e){this.currentWeapon&&(this.currentWeapon.visible=!1,this.currentWeapon.callAll("reset",null,0,0),this.currentWeapon.setAll("exists",!1)),this.currentWeaponIndex=e,this.currentWeapon=this.weapons[e],this.currentWeapon.visible=!0,this.weaponName.text=this.currentWeapon.name},n});