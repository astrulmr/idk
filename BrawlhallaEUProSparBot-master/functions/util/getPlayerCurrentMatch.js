const Player = require('../../models/Player');
const Match = require('../../models/Match');

module.exports = (discordID) => {
    return new Promise((resolve, reject) => {
        Player.findOne({ discordID })
            .then(player => {
                console.log(player);
                if (!player)
                    resolve(null);
                else if (player.state.includes('Match')) {
                    Match.findById(player.match)
                        .then(resolve)
                        .catch(console.error);
                }
                else
                    resolve(null);
            })
    })
}