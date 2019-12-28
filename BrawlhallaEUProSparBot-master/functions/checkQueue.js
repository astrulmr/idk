const Player = require('../models/Player');
const beginMatch = require('./beginMatch');

module.exports = (gamemode, channel) => {
    Player.find({ state: `In${gamemode}Queue` })
        .then(players => {
            if (gamemode.includes('1v1') && players.length >= 2)
                beginMatch(gamemode, players.filter((_, i) => i < 2), channel);
            else if (gamemode.includes('2v2') && players.length >= 4)
                beginMatch(gamemode, players.filter((_, i) => i < 4), channel);
        })
}