/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './index.css';
import { getData } from './API-logic';
import writeToUI from './writeToUI';
import { toggleUnit } from './toggleUnit';

const locationInput = document.querySelector('#locationInput');
const inputSearchBtn = document.querySelector('#inputSearchBtn');
const togglUnitBtn = document.querySelector('.unit');

getData('Rome').then(writeToUI);

togglUnitBtn.onclick = (e) => {
    toggleUnit();
    const unit = e.target.innerText;
    if (unit === 'F') {
        e.target.innerText = 'C';
        return;
    }
    e.target.innerText = 'F';
};

inputSearchBtn.onclick = async () => {
    const data = await getData(locationInput.value);
    writeToUI(data);
};

fetch(
    'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Rome?unitGroup=metric&key=K2P6BZW4ZVHGB3PFD3HXLMC64&contentType=json&unitGroup=us',
)
    .then((data) => data.json())
    .then((data) => console.log(data));
