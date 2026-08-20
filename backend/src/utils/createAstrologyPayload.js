const createAstrologyPayload = (profile) => {

    const date = new Date(profile.dateOfBirth);

    const [hours, minutes] =
        profile.timeOfBirth.split(":").map(Number);

    return {
        year: date.getUTCFullYear(),
        month: date.getUTCMonth() + 1,
        date: date.getUTCDate(),

        hours,
        minutes,
        seconds: 0,

        latitude: profile.birthPlace.latitude,
        longitude: profile.birthPlace.longitude,
        timezone: profile.birthPlace.timezone,

        settings: {
            observation_point: "topocentric",
            ayanamsha: "lahiri",
            language: "en"
        }
    };
};

module.exports = {
    createAstrologyPayload
};