import { getData, getCurrentData } from './API-logic';
import writeToUI from './writeToUI';

let currentUnit = 'C';

async function toggleUnit() {
    const loc = getCurrentData().locArray.join();
    if (currentUnit === 'C') {
        currentUnit = 'F';

        const dataUS = await getData(loc, 'us');
        writeToUI(dataUS);
        return;
    }
    currentUnit = 'C';

    const dataMetric = await getData(loc);
    writeToUI(dataMetric);
}
function getCurrentUnit() {
    return currentUnit;
}
export { toggleUnit, getCurrentUnit };
