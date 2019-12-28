const getPlayerCurrentMatch = require('./util/getPlayerCurrentMatch');

module.exports = (discordID, roomNumber, channel) => {
    getPlayerCurrentMatch(discordID)
        .then(match => {
            if (match.state !== 'Started')
                channel.send("Couldn't update the room number, the match has already ended");
            else {
                match.roomNumber = roomNumber;
                match
                    .save()
                    .then(_ => {
                        channel.send(`Updated Room to ${roomNumber}`);
                    })
            }
        })
}