import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConversionExchange from './services/API-helper';

async function getConversion(baseAmount, targetCode) {
    const response = await ConversionExchange.getConversion(baseAmount, targetCode);
    if (response) {
        printElements(response, baseAmount, targetCode);
    } else {
        printError(response, baseAmount, targetCode);
    }
}

// UI Logic

function printElements(response, baseAmount, targetCode) {
    const displayResults = document.querySelector('#displayResults');
    if (response && response.hasOwnProperty('conversion_result')) {
        displayResults.innerHTML = `The exchange rate for $${baseAmount} USD to ${targetCode} is $${response["conversion_result"]}`;
    } else {
        printError('Invalid response', baseAmount, targetCode);
    }
}

function printError(error, baseAmount, targetCode) {
    document.querySelector('#showResponse').innerHTML = `There was an error accessing the currency exchange rate for ${baseAmount} ${targetCode} ${error}.`;
}

function handleFormSubmission(event) {
    event.preventDefault();

    const checkedRadioButton = document.querySelector("input[name='targetCode']:checked");

    if (checkedRadioButton) {
        const targetCode = checkedRadioButton.value;
        const baseAmount = parseFloat(document.querySelector('#baseAmount').value);
        getConversion(baseAmount, targetCode);
    } else {
        const showResponse = document.querySelector('#results-container');
        showResponse.innerHTML = 'Please select a currency.';
    }
}


window.addEventListener("load", function () {
    document.querySelector('#exchangeForm').addEventListener('submit', handleFormSubmission);
});