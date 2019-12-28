module.exports = {
    GameMode: [
        '1v1',
        '2v2',
        'X1v1',
        'X2v2'
    ],
    PlayerState: [
        'Idle',
        'In1v1Queue',
        'In2v2Queue',
        'InX1v1Queue',
        'InX2v2Queue',
        'In1v1Match',
        'In2v2Match',
        'InX1v1Match',
        'InX2v2Match'
    ],
    QueueState: [
        'Active',
        'Canceled',
        'Successful'
    ],
    MatchState: [
        'Started',
        'Canceled',
        'Reported',
        'Confirmed'
    ]
}