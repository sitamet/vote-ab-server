'use strict';


function UpdateResultsCommand({ server }) {

    function exec() {

        const results = countVotesPerSlide(server.app.voteStateStorage.votes)
        const connectedUsers = server.app.voteStateStorage.connectedUsers;
        const currentSlide = server.app.voteStateStorage.currentSlide;

        const sockets = server.plugins.vote.sockets;

        sockets.emit('vote-ab-results', { results, connectedUsers, currentSlide });
    }

    return {
        exec
    };


    function countVotesPerSlide(votes) {
        const result = {};

        Object.entries(votes).forEach(([slide, votes]) => {
            result[slide] = Object.values(votes).reduce((acc, vote) => {
                if (!acc[vote]) {
                    acc[vote] = 0;
                }
                acc[vote]++;
                return acc;
            }, {});
        });

        return result;
    };


}

module.exports = UpdateResultsCommand;