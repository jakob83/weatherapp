// eslint-disable-next-line import/no-named-as-default, import/no-named-as-default-member
import { writeError, removeError } from './writeError';

async function fetchData(location, unit) {
    try {
        const request = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=${unit}&key=K2P6BZW4ZVHGB3PFD3HXLMC64&contentType=json`,
        );
        if (!request.ok) {
            throw new Error('Please put in a valid city name');
        }
        const data = await request.json();
        removeError();
        return data;
    } catch (error) {
        writeError(error);
        return null;
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
let currentData;
function getCurrentData() {
    return currentData;
}
async function getData(loc, unit = 'metric') {
    let data = await fetchData(loc, unit);
    if (!data) {
        console.log(`no data: ${data}`);
        return null;
    }

    data = processData(data);
    console.log(data);
    currentData = data;
    return data;
}
export { getCurrentData, getData };
