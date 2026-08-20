// const { generateDailyPrediction } = require("../services/dailyPredict");

// const {getNavamsaDetails } = require("../controllers/navamasyaChart")
// const { getPlanetExtendedDetails } = require("../controllers/planetExtendedServiceController")

// const getTodayPredict = async (req, res) => {
//     try {

//         const navamasyaData =  await getNavamsaDetails(req);
//         const planetExtendedData = await getPlanetExtendedDetails(req);
//         const response =  generateDailyPrediction(navamasyaData,planetExtendedData);
//         return response;
//     } catch (error) {
//         console.error(error.response?.data || error.message);

//         res.status(500).json({
//             message: "Failed to fetch Todays details"
//         });
//     }
// };

// module.exports = {
//     getTodayPredict
// };

const AstrologyProfile = require("../models/AstroProfile");
const { createAstrologyPayload } = require("../utils/createAstrologyPayload");
const { getNavamsaService } = require("../services/navamsaService");
const { getPlanetExtendedService } = require("../services/planetExtendedService");
const { generateDailyPrediction } = require("../services/dailyPredict");
const { saveDailyPrediction } = require("../services/saveDailyPrediction");


const getTodayPredict = async (req, res) => {

    try {

        // 1. Identify user
        // const { userId } = req.body;
        const userId = req.user.userId;

        if(!userId){
            return res.status(404).json({
                message: "Unauthorized user"
            })
        }

        // 2. Get astrology profile
        const profile =
            await AstrologyProfile.findOne({ userId });

        if (!profile) {
            return res.status(404).json({
                message: "Astrology profile not found"
            });
        }

        return res.status(200).json({
            message: "working",
            userId: userId,
            profile: profile
        })

        // // Convert DB data → API payload
        // const payload = createAstrologyPayload(profile);

        // //  Call astrology services
        // const navamasyaData = await getNavamsaService(payload);

        // const planetExtendedData = await getPlanetExtendedService(payload);

        // // Generate prediction
        // const response =
        //     await generateDailyPrediction(
        //         navamasyaData,
        //         planetExtendedData
        //     );

        // // Save response
        // const savedPrediction = await saveDailyPrediction(
        //     userId,
        //     response
        // );

        // // Return result
        // return res.status(200).json({
        //     message:"Daily prediction generated"
        // });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to fetch today's details"
        });
    }
};

module.exports = {
    getTodayPredict
};