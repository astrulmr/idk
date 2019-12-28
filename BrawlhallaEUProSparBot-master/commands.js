module.exports = [
    // --- PLAYER COMMANDS ---
    // Registration
    {
        command: 'register',
        aliases: ['!register', '!reg']
    },

    // Queues
    {
        command: 'queue',
        aliases: ['!queue', '!q']
    },
    {
        command: 'leavequeue',
        aliases: ['!leavequeue', '!leaveq', '!dq', '!lq']
    },

    // Matches
    {
        command: 'report',
        aliases: ['!report', '!r']
    },
    {
        command: 'confirm',
        aliases: ['!confirm']
    },
    {
        command: 'deny',
        aliases: ['!deny']
    },
    {
        command: 'match',
        aliases: ['!match', '!m']
    },

    // Stats
    {
        command: 'stats',
        aliases: ['!stats', '!statistics']
    },
    {
        command: 'leaderboard',
        aliases: ['!leaderboard', '!lead']
    },

    // --- ADMIN COMMANDS ---
    // Matches
    {
        command: 'forcereport',
        aliases: ['!forcereport', '!freport']
    },
    {
        command: 'forceconfirm',
        aliases: ['!forceconfirm', '!fconfirm']
    },

    // Rank X Promotion/Demotion
    {
        command: 'promoteRX1v1',
        aliases: ['!promoteRX1v1', '!promoteRX1']
    },
    {
        command: 'promoteRX2v2',
        aliases: ['!promoteRX2v2', '!promoteRX2']
    },
    {
        command: 'demoteRX1v1',
        aliases: ['!demoteRX1v1', '!demoteRX1']
    },
    {
        command: 'demoteRX2v2',
        aliases: ['!demoteRX2v2', '!demoteRX2']
    },
]