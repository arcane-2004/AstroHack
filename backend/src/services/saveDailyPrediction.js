const DailyPrediction = require("../models/dailyPrediction");

const saveDailyPrediction = async (userId, prediction) => {
    const date = new Date().toISOString().split("T")[0];

    const dailyPrediction = await DailyPrediction.findOneAndUpdate(
        {
            userId,
            date,
        },
        {
            userId,
            date,

            overall: prediction.overall,
            career: prediction.career,
            love: prediction.love,
            money: prediction.money,
            health: prediction.health,

            summary: prediction.summary,
        },
        {
            new: true,
            upsert: true,
        }
    );

    return dailyPrediction;
};

module.exports = {
    saveDailyPrediction,
};