(function() {
    'use strict';

    requirejs.config({
        baseUrl: 'js/',

        paths: {
            phaser: 'lib/phaser/phaser'
        },

        shim: {
            'phaser': {
                exports: 'Phaser'
            }
        }
    });

    require(['phaser', 'app/app'], function(Phaser, App) {
        var app = new App();
        app.start();
    });
}());