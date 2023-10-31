'use strict';

const { Server } = require('socket.io');
const AddSocketToItsUserRoom = require('./add-socket-to-its-user-room');
const VoteAbDoneCommand = require('../application/vote-ab-done-command')
const UpdateResultsCommand = require('../application/update-results-command')
const Joi = require('joi');

exports.plugin = {
    pkg: require('../package.json'),

    register: (server, options) => {

        const updateResultsCommand = UpdateResultsCommand({ server });
        const voteAbDoneCommand = VoteAbDoneCommand({ server, updateResultsCommand });


        // an in memory state storage.
        server.app.voteStateStorage = {
            connectedUsers: 0,
            currentSlide: 'default',
            votes: {
                'default': {}
            }
        };



        // api vote routes:
        server.route({
            method: 'GET',
            path: '/results',
            config: {
                auth: false,
                validate: {
                    query: Joi.object({
                        page: Joi.string().trim().allow('', null).optional()
                    })
                },
            },
            handler: ({ server, query }) => {

                const currentSlide = query.page ? query.page : 'default';
                server.app.voteStateStorage.currentSlide = currentSlide;
                server.app.voteStateStorage.votes[currentSlide] = {};

                const info = `reset slide to: ${currentSlide}`
                server.log(['info', 'server.app.voteStateStorage'], info);

                const sockets = server.plugins.vote.sockets;

                sockets.emit('vote-ab-reset', { resuls: {}, currentSlide });

                updateResultsCommand.exec();

                return info;
            }
        });


        server.ext('onPreStart', async () => {

            const socketIoServerOptions = { ...options.server };
            const io = new Server(server.listener, socketIoServerOptions);

            io.on('connection', socket => AddSocketToItsUserRoom({ server, voteAbDoneCommand, updateResultsCommand }).exec(socket));

            server.expose('sockets', io.sockets);

        });
    }
}