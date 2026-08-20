const searchLocation = async (query, country = "IN") => {
    const response = await fetch(
        "https://api.freeastroapi.com/api/v2/geo/search?" +
        new URLSearchParams({
            q: query,
            country,
            limit: "5",
        }),
        {
            method: "GET",
            headers: {
                "x-api-key": process.env.FREE_ASTRO_API_KEY,
            },
        }
    );

    if (!response.ok) {
        const error = await response.text();

        throw new Error(
            `Location search failed: ${error}`
        );
    }

    const data = await response.json();

    return data;
};

module.exports = {
    searchLocation,
};