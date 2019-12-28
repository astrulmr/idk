const eloCalculator = require('./util/eloCalculator');

module.exports = (match, confirm, force, channel) => {
    if (match.state === 'Started')
        channel.send("Match score hasn't been reported yet. Type !report [score_team_A] [score_team_B] to report the scores");
    if ((match.state === 'Confirmed' || match.state === 'Canceled') && !force)
        channel.send("Match score has already been confirmed. If there's an issue, tag an overseer.");
    else {
        if (confirm) {
            match.state = 'Confirmed';
            match.save()
                .then(_ => {
                    let playerPromises = [];
                    const teams = [match.teamA, match.teamB];
                    for (let j = 0; j < 2; j++) {
                        const team = teams[j];
                        for (let i = 0; i < team.players.length; i++) {
                            playerPromises.push(new Promise((resolve, reject) => {
                                players[i].match = null;
                                players[i].state = `Idle`;

                                const oldRating = players[i].ratings[match.gamemode].ratings[players[i].ratings[match.gamemode].ratings.length - 1];

                                players[i].ratings[match.gamemode] = {
                                    // TODO: Softcode K-Factor
                                    ratings: [...ratings, (match.winner < 0 || match.winner > 1)
                                        ? oldRating
                                        : eloCalculator.newRating(32, oldRating, team[1 - j].teamRating, j === match.winner ? 1 : 0)],
                                    games: 1,
                                    wins: wins + j === match.winner ? 1 : 0,
                                    losses: losses + j === 1 - match.winner ? 1 : 0,
                                    draws: draws + match.winner > 1 ? 1 : 0,
                                    cancels: cancels + match.winner < 0 ? 1 : 0
                                }

                                players[i]
                                    .save()
                                    .then(_ => {
                                        resolve();
                                    })
                                    .catch(console.error);
                            }))
                        }
                    }
                    Promise.all(playerPromises)
                        .then(_ => {
                            // TODO: Match Resolve Embed
                            channel.send(`Match has been successfully confirmed`);
                        })
                        .catch(console.error);
                })
        }
        else {
            match.state = 'Started';
            match
                .save()
                .then(_ => {
                    channel.send('Match has been denied, please report the correct results, or ask an overseer');
                })
        }
    }
}