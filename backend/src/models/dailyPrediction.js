const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        score: {
            type: Number,
            required: true,
            min: 0,
            max: 100,
        },

        rating: {
            type: String,
            required: true,
        },
    },
    { _id: false }
);

const dailyPredictionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        overall: {
            type: categorySchema,
            required: true,
        },

        career: {
            type: categorySchema,
            required: true,
        },

        love: {
            type: categorySchema,
            required: true,
        },

        money: {
            type: categorySchema,
            required: true,
        },

        health: {
            type: categorySchema,
            required: true,
        },

        summary: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

// One prediction per user per day
dailyPredictionSchema.index(
    { userId: 1, date: 1 },
    { unique: true }
);

const DailyPrediction =
    mongoose.models.DailyPrediction ||
    mongoose.model("DailyPrediction", dailyPredictionSchema);

module.exports = DailyPrediction;