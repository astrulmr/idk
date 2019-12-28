module.exports = (match, showScore) => {
    //TODO: CHANGE ELO SYSTEM
    const matchEmbed = {
        color: 0x0099ff,
        title: 'Match',
        description: 'Team A is better seed, and creates the room. type `!room [RoomNumber]` when the room is created.',
        fields: [{
                name: `Team A (${match.teamA.teamRating} Elo)`,
                value: match.teamA.players.map(x => `${x.name} (${x.ratings[match.gamemode].ratings[x.ratings[match.gamemode].rankings - 1]}/${Math.max(...x.rating[match.gamemode].ratings)} Peak)\n`).join(),
                inline: true
            },
            {
                name: `Team B (${match.teamB.teamRating} Elo)`,
                value: match.teamA.players.map(x => `${x.name} (${x.ratings[match.gamemode].ratings[x.ratings[match.gamemode].rankings - 1]}/${Math.max(...x.rating[match.gamemode].ratings)} Peak)\n`).join(),
                inline: true
            }
        ],
        timestamp: new Date(),
        footer: {
            text: 'EU Pro Spar / Rank X Bot'
        },
    };
    if (showScore) {
        matchEmbed.fields.push({
            name: 'Score',
            value: `Team A - ${match.scoreTeamA} / ${match.scoreTeamB} - Team B\nResult: ${(() => {
                switch (match.winner) {
                    case -1:
                        return 'Match Canceled';
                    case 0:
                        return 'Winner: Team A'
                    case 1:
                        return 'Winner: Team B'
                    default:
                        return 'Draw'
                }
            })()}`
        })
    }
    return matchEmbed;
}