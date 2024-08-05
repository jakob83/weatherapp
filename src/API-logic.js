async function fetchData(location) {
    try {
        const request = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=K2P6BZW4ZVHGB3PFD3HXLMC64&contentType=json`,
        );
        if (!request.ok) {
            throw new Error('Please put in a City');
        }
        const data = await request.json();
        return data;
    } catch (error) {
        console.log(error);
        return error;
    }
}
function processData(data) {
    const days = data.days
        .slice(1)
        .map(({ tempmin, tempmax, icon, datetime }) => {
            return { tempmin, tempmax, icon, datetime };
        });
    return {
        temp: data.currentConditions.temp,
        tempmin: data.days[0].tempmin,
        tempmax: data.days[0].tempmax,
        feelslike: data.currentConditions.feelslike,
        humidity: data.currentConditions.humidity,
        windspeed: data.currentConditions.windspeed,
        sunrise: data.currentConditions.sunrise,
        sunset: data.currentConditions.sunset,
        locArray: data.resolvedAddress.replace(' ', '').split(','),
        days,
        icon: data.currentConditions.icon,
        description: data.currentConditions.conditions,
        snowdepth: data.currentConditions.snowdepth,
    };
}

async function getData(loc) {
    let data = await fetchData(loc);
    if (!data) {
        console.log(`no data: ${data}`);
        return null;
    }
    data = processData(data);
    console.log(data);
    return data;
}
export default getData;
