/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import './index.css';
import getData from './API-logic';
import writeToUI from './writeToUI';

const locationInput = document.querySelector('#locationInput');
const inputSearchBtn = document.querySelector('#inputSearchBtn');

inputSearchBtn.onclick = async () => {
    const data = await getData(locationInput.value);
    writeToUI(data);
};

getData('Rome').then(writeToUI);
