const Player = require('../models/Player');
const Queue = require('../models/Schemas/QueueSchema');

module.exports = (discordID, channel) => {
    endQueue(discordID)
        .then(msg => channel.send(msg)
            .catch(console.error))
        .catch(console.error);
}

const endQueue = (discordID) => {
    return new Promise((resolve, reject) => {
        Player.findOne({ discordID })
            .then(player => {
                if (!player)
                    resolve('Not Registered!');
                else if (!player.state.includes('Queue')) {
                    resolve('Not In Queue!');
                }
                else {
                    player.state = 'Idle';
                    player.queues[player.queues.length - 1].state = 'Canceled';

                    player.save()
                        .then(_ => resolve('Queue Stopped!'))
                        .catch(console.error);
                }
            })
            .catch(console.error);
    })
}