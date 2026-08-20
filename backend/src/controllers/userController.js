const { createUser } = require("../services/userService");
const { createAstrologyProfile, } = require("../services/astroProfileService");
const { getGeoDetails } = require("../services/geoLocationService");

const createUserWithAstrologyProfile = async (req, res) => {
    try {
        const {
            name,
            email,
            passwordHash,
            dateOfBirth,
            timeOfBirth,
            birthPlace,
        } = req.body;

        // Get longitude and latitude
        try {
            const location = birthPlace.city;

            if (!location) {
                return res.status(400).json({
                    message: "Location is required"
                });
            }

            const data = await getGeoDetails(location);

            // Add geo details to birthPlace
            birthPlace.latitude = data.latitude;
            birthPlace.longitude = data.longitude;
            birthPlace.timezone = data.timezone;

        } catch (error) {
            console.error(error.response?.data || error.message);

            res.status(500).json({
                message: "Failed to fetch geo details"
            });
        }

        // Create user
        const user = await createUser({
            name,
            email,
            passwordHash,
        });

        // Create astrology profile
        const profile = await createAstrologyProfile({
            userId: user._id,
            dateOfBirth,
            timeOfBirth,
            birthPlace,
        });

        res.status(201).json({
            message: "User created successfully",
            user,
            profile,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
};

module.exports = {
    createUserWithAstrologyProfile,
};