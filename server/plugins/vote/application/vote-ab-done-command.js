'use strict';


function VoteAbDoneCommand({ server, updateResultsCommand }) {

    const exec = ({ clientId, msg }) => {

        const currentSlide = server.app.voteStateStorage.currentSlide;

        server.app.voteStateStorage.votes = server.app.voteStateStorage.votes || {};
        server.app.voteStateStorage.votes[currentSlide] = server.app.voteStateStorage.votes[currentSlide] || {};

        server.app.voteStateStorage.votes[currentSlide][clientId] = msg;

        server.log(['info', 'add-socket-to-its-user-room'], `vote-ab-done: user => ${clientId} voted => ${msg} slide => ${currentSlide}`);

        updateResultsCommand.exec();
    }

    return {
        exec
    }

}

module.exports = VoteAbDoneCommand;