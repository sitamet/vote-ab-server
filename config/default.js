'use strict';

// Config always readed.
// All this params are default production.
//
// NOTE: overwrite this production params for
//       NODE_ENV=development, test or playground
//       Using the development.js test.js or playground.js

module.exports = {

    server: {

        'api': {
            host: '0.0.0.0',
            port: process.env.PORT || 8090,

            routes: {
                'cors': {
                    origin: ['*']
                }
            }
        }
    },

    vote: {
        'server': {
            cors: {
                origin: '*',
                methods: ['GET', 'POST']
            },
            transports: ['websocket', 'polling']
        }
    },

    // Log reporting
    reporters: {
        console: [{
            module: '@hapi/good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: '@hapi/good-console'
        }, 'stdout']
    }
};