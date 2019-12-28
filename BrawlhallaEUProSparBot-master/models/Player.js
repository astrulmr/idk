const mongoose = require('mongoose');
const queueDB = require('../main').queueDB;
const { PlayerState } = require('./enums');
const QueueSchema = require('./Schemas/QueueSchema');
const RatingSchema = require('./Schemas/RatingSchema');

PlayerSchema = new mongoose.Schema({
    name: String,
    discordID: String,
    state: {
        type: String,
        enum: PlayerState,
        default: 'Idle'
    },
    queues: [QueueSchema],
    match: mongoose.Schema.Types.ObjectId,
    ratings: {
        type: Object,
        default: {}
    }
});

module.exports = queueDB.model('Player', PlayerSchema);