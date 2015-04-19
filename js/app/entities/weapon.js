define(["phaser","app/entities/bullet"],function(e,t){"use strict";var n={};return n.Cannon=function(n){e.Group.call(this,n,n.world,"Cannon",!1,!0,e.Physics.ARCADE),this.offsetX=20,this.offsetY=-15,this.nextFire=0,this.bulletSpeed=600,this.fireDelay=100;for(var r=0;r<64;r++)this.add(new t(n,"bullet5"),!0);return this},n.Cannon.prototype=Object.create(e.Group.prototype),n.Cannon.prototype.constructor=n.Cannon,n.Cannon.prototype.fire=function(e){if(this.game.time.now<this.nextFire)return;var t=e.x+this.offsetX,n=e.y+this.offsetY;this.getFirstExists(!1).fire(t,n,0,this.bulletSpeed,0,0),this.nextFire=this.game.time.now+this.fireDelay},n});