/* eslint-disable no-param-reassign */
import clearDay from './icons/clear-day.svg';
import clearNight from './icons/clear-night.svg';
import rain from './icons/rain.svg';
import snow from './icons/snow.svg';
import sleet from './icons/sleet.svg';
import wind from './icons/wind.svg';
import partlyCloudlyDay from './icons/partly-cloudy-day.svg';
import partlyCloudlyNight from './icons/partly-cloudy-night.svg';
import thunderstorm from './icons/thunderstorm.svg';
import tornado from './icons/tornado.svg';
import cloudy from './icons/cloudy.svg';
import fog from './icons/fog.svg';
import hail from './icons/hail.svg';
import { getCurrentUnit } from './toggleUnit';

const { isTomorrow } = require('date-fns');

const iconOptions = [
    { name: 'clear-day', url: clearDay },
    { name: 'clear-night', url: clearNight },
    { name: 'rain', url: rain },
    { name: 'snow', url: snow },
    { name: 'sleet', url: sleet },
    { name: 'wind', url: wind },
    { name: 'fog', url: fog },
    { name: 'cloudy', url: cloudy },
    { name: 'partly-cloudy-day', url: partlyCloudlyDay },
    { name: 'partly-cloudy-night', url: partlyCloudlyNight },
    { name: 'hail', url: hail },
    { name: 'thunderstorm', url: thunderstorm },
    { name: 'tornado', url: tornado },
];
function getIconURL(iconName, options) {
    for (let i = 0; i < options.length; i += 1) {
        if (iconName === options[i].name) {
            return options[i].url;
        }
    }
    return options[0].url;
}

function writeOverview(
    { temp, feelslike, locArray },
    { tempP, locExactP, locDescP, feelsLikeP },
    unit,
) {
    tempP.innerText = `${temp}°${unit}`;
    feelsLikeP.innerText = `feels like: ${feelslike}°${unit}`;
    locExactP.innerText = `${locArray[0]}`;
    locDescP.innerText = `${locArray[1] || ''}, ${locArray[2] || ''}`;
}
function writeStats(
    { humidity, windspeed, sunrise, sunset, snowdepth },
    { humidityP, windspeedP, sunriseP, sunsetP, snowP },
) {
    humidityP.innerText = `${humidity}%`;
    windspeedP.innerText = `${windspeed}KmH`;
    snowP.innerText = `${snowdepth}cm`;
    if (!sunrise || !sunset) {
        sunriseP.innerText = 'not available';
        sunsetP.innerText = 'not available';
    } else {
        sunriseP.innerText = sunrise.split(':').slice(0, 2).join(':');
        sunsetP.innerText = sunset.split(':').slice(0, 2).join(':');
    }
}
function writeForecast(data, { dayElements }, unit) {
    for (let i = 0; i < dayElements.length; i += 1) {
        const dayElement = dayElements[i];
        const minElement = dayElement.querySelector('.min');
        const maxElement = dayElement.querySelector('.max');
        const imgElement = dayElement.querySelector('img');
        const dateElement = dayElement.querySelector('.date');
        const url = getIconURL(data.days[i].icon, iconOptions);
        const minTemp = data.days[i].tempmin;
        minElement.innerText = `${minTemp}°${unit}`;
        const maxTemp = data.days[i].tempmax;
        maxElement.innerText = `${maxTemp}°${unit}`;
        imgElement.src = url;
        dateElement.innerText = isTomorrow(data.days[i].datetime)
            ? 'Tomorrow'
            : data.days[i].datetime;
    }
}

function writeToUI(data) {
    if (!data) return;
    const iconElement = document.querySelector('.overview img');
    const url = getIconURL(data.icon, iconOptions);
    iconElement.src = url;
    const paragraphs = {
        tempP: document.querySelector('#temp'),
        locExactP: document.querySelector('.location .exact'),
        locDescP: document.querySelector('.location .description'),
        feelsLikeP: document.querySelector('#feelsLike'),
        humidityP: document.querySelector('.stats .humidity'),
        windspeedP: document.querySelector('.stats .windspeed'),
        snowP: document.querySelector('.stats .snow'),
        sunriseP: document.querySelector('.stats .sunrise'),
        sunsetP: document.querySelector('.stats .sunset'),
        dayElements: Array.from(
            document.querySelectorAll('.forecast .days .day-cont'),
        ),
    };
    writeOverview(data, paragraphs, getCurrentUnit());
    writeStats(data, paragraphs);
    writeForecast(data, paragraphs, getCurrentUnit());
}

export default writeToUI;
