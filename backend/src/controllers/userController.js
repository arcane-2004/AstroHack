const userModel = require("../models/user")
const { createUser } = require("../services/userService");
const { createAstrologyProfile, } = require("../services/astroProfileService");
const { getGeoDetails } = require("../services/geoLocationService");
const { generateToken } = require("../utils/jwt")

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
            birthPlace.timezone = data.timezone_offset;

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

        // Generate token
        const token = generateToken(user._id.toString());

        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User created successfully",
            token,
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

const loginUser = async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({
            email,
        });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        if (user.passwordHash !== password) {
            return res.status(401).json({
                message: "Invalid password",
            });
        }

        const token = generateToken(user._id.toString())
        res.cookie("token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            message: "Login Successful",
            token,
            user
        })
    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Login failed",
        });
    }
}

module.exports = {
    createUserWithAstrologyProfile,
    loginUser
};