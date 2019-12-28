const mongoose = require('mongoose');
const queueDB = require('../main').queueDB;
const { MatchState } = require('./enums');
const TeamSchema = require('./Schemas/TeamSchema');
const autoIncrement = require('mongoose-auto-increment');

MatchSchema = new mongoose.Schema({
    matchID: { type: Number, required: true },
    teamA: TeamSchema,
    teamB: TeamSchema,
    state: {
        type: String,
        enum: MatchState,
        default: 'Started'
    },
    gameMode: String,
    scoreTeamA: { type: Number, default: 0 },
    scoreTeamB: { type: Number, default: 0 },
    winner: { type: Number, default: -1 },
    roomNumber: { type: String, default: 'Undefined' }
});

MatchSchema.plugin(autoIncrement.plugin, { model: 'Match', field: 'matchID' })
module.exports = queueDB.model('Match', MatchSchema);