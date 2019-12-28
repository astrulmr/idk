const Player = require('../models/Player');

module.exports = (discordID, name, channel) => {
    register(discordID, name)
        .then(msg => channel.send(msg)
            .catch(console.error))
        .catch(console.error);
}

const register = (discordID, name) => {
    return new Promise((resolve, reject) => {
        Player.findOne({ discordID })
            .then(player => {
                if (player)
                    resolve('Already Registered!');
                else
                    new Player({
                        discordID,
                        name
                    })
                        .save()
                        .then(_ => {
                            resolve('Registration Success!');
                        })
                        .catch(console.error);
            })
            .catch(console.error);
    })
}