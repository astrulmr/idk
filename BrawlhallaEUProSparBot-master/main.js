const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

module.exports = {
    connect: (database) => {
        return new Promise((resolve, reject) => {
            mongoose.createConnection(database, { useNewUrlParser: true, useUnifiedTopology: true })
                .then((connection) => {
                    autoIncrement.initialize(connection);
                    module.exports.queueDB = connection;
                    resolve({
                        register: require('./functions/register'),
                        beginQueue: require('./functions/beginQueue'),
                        endQueue: require('./functions/endQueue'),
                        reportMatch: require('./functions/reportMatch'),
                        confirmMatch: require('./functions/confirmMatch'),
                        getPlayerCurrentMatch: require('./functions/util/getPlayerCurrentMatch')
                        // displayStats: require('./functions/displayStats'),
                        // displayLeaderboard: require('./functions/displayLeaderboard'),
                    });
                }).catch(reject);
        });
    }
}