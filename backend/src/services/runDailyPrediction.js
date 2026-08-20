const AstrologyProfile = require("../models/AstrologyProfile");
const {
    generateDailyPrediction,
} = require("../services/predictionService");

const runDailyPredictionJob = async () => {
    try {
        const profiles = await AstrologyProfile.find({});

        console.log(
            `Generating predictions for ${profiles.length} users`
        );

        for (const profile of profiles) {
            await generateDailyPrediction(profile);
        }

        console.log("Daily predictions generated");

    } catch (error) {
        console.error(
            "Daily prediction job failed:",
            error
        );
    }
};

module.exports = {
    runDailyPredictionJob,
};