
const axios = require('axios');
require('dotenv').config();

const getPlanetExtendedService = async (payload) => {

    const {date,year, month,hours,minutes,seconds, latitude, longitude, timezone} = payload
    console.log("Navasma data : ",date,year, month,hours,minutes,seconds, latitude, longitude, timezone);
    console.log(payload);
    try{
        const response = await axios.post(
            "https://json.freeastrologyapi.com/planets/extended",{
            "year": year,
            "month": month,
            "date": date,
            "hours": hours,
            "minutes":minutes,
            "seconds":seconds,
            "latitude": latitude,
            "longitude": longitude,
            "timezone": timezone,
            "settings": {
        "observation_point": "topocentric", /*  topocentric / geocentric */
        "ayanamsha": "lahiri", /* lahiri / sayana */
        "language": "en"
        }
        },{
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": process.env.ASTROAPIKEY
                }   
            }

        );
         return response.data.output;

        
    }catch (error) {
        console.error("Astrology API error:", error.message);
        throw error;
    }


};

module.exports = { getPlanetExtendedService };
