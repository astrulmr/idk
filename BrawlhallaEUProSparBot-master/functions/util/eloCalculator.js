const calculateNewRating =
    (K, rA, rB, sA) =>
        Math.round(rA + K * (sA - calculateExpectedScore(rA, rB)));

const calculateExpectedScore =
    (rA, rB) =>
        1 / (1 + (Math.pow(10, (rB - rA) / 400)));

module.exports.newRating = calculateNewRating;