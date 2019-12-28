const Player = require('../models/Player');
const checkQueue = require('./checkQueue');

module.exports = (discordID, gamemode, channel) => {
    Player.findOne({ discordID })
        .then(player => {
            if (!player)
                channel.send('Not Registered!');
            else if (['In1v1Queue', 'In2v2Queue', 'InX1v1Queue', 'InX2v2Queue'].includes(player.state))
                channel.send('Already In Queue!');
            else if (['In1v1Match', 'In2v2Match', 'InX1v1Match', 'InX2v2Match'].includes(player.state))
                channel.send('Still In A Match!');
            else if (player.state === 'Idle') {
                console.log('Idle->Queue')
                player.state = `In${gamemode}Queue`;
                player.queues.push({
                    gamemode,
                    state: 'Active'
                });
                player.save()
                    .then(_ => {
                        checkQueue(gamemode, channel);
                        channel.send('Successfully Queuing!');
                    })
            }
        })
        .catch(console.error);
}