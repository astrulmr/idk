const mongoose = require('mongoose');
const { GameMode } = require('../enums');

RatingSchema = new mongoose.Schema({
    gamemode: {
        type: String,
        enum: GameMode,
        default: '1v1'
    },
    ratings: [Number],
    games: Number,
    wins: Number,
    losses: Number
});

module.exports = RatingSchema;