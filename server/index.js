'use strict';

const Hapi = require('@hapi/hapi');
const config = require('config');


const start = async () => {

    try {

        const server = Hapi.server(config.server.api);

        await server.register([

            { plugin: require('@hapi/good'), options: { reporters: config.reporters } },
            { plugin: require('./plugins/vote/infrastructure'), options: config.vote }

        ]);

        await server.start();

        const publicInfo = `vote-ab-server environment ${process.env.NODE_ENV}: ${server.info.uri}/api`;

        server.log('info', publicInfo);

        server.route({
            method: 'GET',
            path: '/api',
            config: { auth: false },
            handler: (request, h) => h.response(`${publicInfo}\n`)
        });

    } catch (err) {
        console.log('error', err);
    }

};


start();