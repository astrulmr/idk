const getPlayerEmbed = require('./util/getPlayerEmbed');

module.exports = (match, scoreTeamA, scoreTeamB, force, channel) => {
    console.log(match);
    if (!match) {
        channel.send("Not in a match!");
    }
    else if (match.state === 'Reported' && !force) {
        channel.send("Match result not confirmed!");
    }
    else if (match.state !== 'Started' && !force)
        channel.send("Not in a match!");
    else {

        if (isNaN(scoreTeamA) || isNaN(scoreTeamB)) {
            channel.send('Bad score format.');
        }
        else {

            scoreTeamA = parseInt(scoreTeamA);
            scoreTeamB = parseInt(scoreTeamB);

            let winner = -1;
            if (scoreTeamA < 0 && scoreTeamB < 0)
                winner = -1;
            else if (scoreTeamB < scoreTeamA)
                winner = 0;
            else if (scoreTeamA < scoreTeamB)
                winner = 1;
            else if (scoreTeamA === scoreTeamB)
                winner = 2;

            match.scoreTeamA = scoreTeamA;
            match.scoreTeamB = scoreTeamB;
            match.winner = winner;
            match.state = "Reported";

            match
                .save()
                .then(_ => {
                    channel.send({ embed: getPlayerEmbed(match, true) });
                })
        }
    }
}