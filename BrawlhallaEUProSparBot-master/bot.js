const dotenv = require('dotenv');
const Discord = require('discord.js');

const commands = require('./commands');
const channels = require('./channels');
const roles = require('./roles');

dotenv.config();

const database = process.env.PRO_SPAR_DB_URL;
let system;

require('./main').connect(database)
    .then(sys => {
        system = sys;
        console.log('> Database Connection Sucessful');
        discordClient.login(process.env.PRO_SPAR_BOT_TOKEN);
    })
    .catch(console.error);

const discordClient = new Discord.Client();

discordClient.on('ready', () => {
    console.log(`> Logged in as '${discordClient.user.tag}'`);
    discordClient.user.setPresence({ game: { name: 'Rank X' }, status: 'idle' });
});

discordClient.on('message', msg => {
    const args = msg.content.split(' ');
    let command = '';
    for (let i = 0; i < commands.length; i++) {
        if (commands[i].aliases.includes(args[0].toLowerCase())) {
            command = commands[i].command;
        }
    }

    let author_name = msg.author.username;
    let author_id = msg.author.id;
    let channel = msg.channel;

    switch (command) {
        case 'register':
            if (isInChannel(msg, 'commands'))
                system.register(author_id, author_name, channel);
            break;
        case 'queue':
            let gamemode = '';
            if (isInChannel(msg, 'standard-1v1'))
                gamemode = '1v1';
            else if (isInChannel(msg, 'standard-2v2'))
                gamemode = '2v2';
            else if (isInChannel(msg, 'rank-x-1v1'))
                gamemode = 'X1v1';
            else if (isInChannel(msg, 'rank-x-2v2'))
                gamemode = 'X2v2';
            else
                return;
            if (gamemode !== '')
                system.beginQueue(author_id, gamemode, channel);
            break;
        case 'leavequeue':
            system.endQueue(author_id, channel);
            break;
        case 'report':
            system.getPlayerCurrentMatch(author_id)
                .then(match => {
                    system.reportMatch(match, args[1], args[2], false, channel);
                })
                .catch(console.error);
            break;
        case 'confirm':
            system.getPlayerCurrentMatch(author_id)
                .then(match => {
                    system.confirmMatch(match, true, false, channel);
                })
                .catch(console.error);
            break;
        case 'deny':
            system.getPlayerCurrentMatch(author_id)
                .then(match => {
                    system.confirmMatch(match, false, false, channel);
                })
                .catch(console.error);
            break;
        case 'match':
            system.getMatch(args[1], channel);
            break;
        case 'stats':
            system.displayStats(msg.mentions.members[0], channel);
            break;
        case 'leaderboard':
            system.displayLeaderboard(args[1], args[2], channel);
            break;
        case 'forcereport':
            if (hasRole(msg.member, 'Overseer'))
                //TODO: Get Match
                system.reportMatch(author_id, args[1], args[2], true, channel);
            break;
        case 'forceconfirm':
            if (hasRole(msg.member, 'Overseer'))
                system.forceConfirm(args[1]);
            break;
        case 'promoteRX1v1':
            if (hasRole(msg.member, 'Overseer'))
                system.promoteRX1v1(msg.mentions.members, channel);
            break;
        case 'promoteRX2v2':
            if (hasRole(msg.member, 'Overseer'))
                system.promoteRX1v1(msg.mentions.members, channel);
            break;
        case 'demoteRX1v1':
            if (hasRole(msg.member, 'Overseer'))
                system.promoteRX1v1(msg.mentions.members, channel);
            break;
        case 'demoteRX2v2':
            if (hasRole(msg.member, 'Overseer'))
                system.promoteRX1v1(msg.mentions.members, channel);
            break;
        default:
            // console.log('> Message / Unknown Command');
            break;
    }
});

const hasRole = (member, role) => {
    return member.roles.has(roles[role]);
}

const isInChannel = (msg, channel) => {
    return msg.channel.id === channels[channel];
}