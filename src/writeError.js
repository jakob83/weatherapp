const errorP = document.querySelector('.error-msg');

function removeError() {
    errorP.innerText = '';
}
function writeError(error) {
    errorP.innerText = error;
}
export { removeError, writeError };
