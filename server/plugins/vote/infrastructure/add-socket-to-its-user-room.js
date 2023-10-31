'use strict';

const AddSocketToItsUserRoom = ({ server, voteAbDoneCommand, updateResultsCommand }) => {

    const exec = async socket => {

        try {

            server.log(['info', 'add-socket-to-its-user-room'], `clientId: ${socket.handshake.query.clientId}`);
            server.app.voteStateStorage.connectedUsers++;

            updateResultsCommand.exec();

            socket.on('vote-ab-done', msg => voteAbDoneCommand.exec({ msg, clientId: socket.handshake.query.clientId }));

            socket.on('disconnect', () => {
                server.log(['info', 'add-socket-to-its-user-room'], `clientId: ${socket.handshake.query.clientId} disconnected`);
                server.app.voteStateStorage.connectedUsers--;
            });

        } catch (err) {
            server.log(['error', 'add-socket-to-its-user-room'], `${err.message}`);
        }
    }

    return {
        exec
    }
}

module.exports = AddSocketToItsUserRoom;