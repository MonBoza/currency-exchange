import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConversionExchange from './services/API-helper';

async function getConversion(baseAmount, targetCode) {
    const response = await ConversionExchange.getConversion(baseAmount, targetCode);
    if (response instanceof Error) {
        if(response.status !== 200) {
            printError(`HTTP Status Code: ${response.status}`, baseAmount, targetCode);  
        } else {
            printError(response.message, baseAmount, targetCode);
        } 
    }else {
        printElements(response, baseAmount, targetCode); 
    }
}



// UI Logic

function printElements(response, baseAmount, targetCode) {
    const displayResults = document.querySelector('#displayResults');
    if(displayResults) {
        if (response && typeof response.conversion_result === 'number') {
            displayResults.innerHTML = `The exchange amount for $${baseAmount} USD to ${targetCode} is $${response["conversion_result"]}`;
            displayResults.classList.add('show');
        } else {
            printError('Invalid response', baseAmount, targetCode);
        }
    } else { 
        console.error('Element with ID "displayResults" not found in the found in the DOM.');
    }
}

function printError(error, baseAmount, targetCode) {
    const showResponse = document.querySelector('#showResponse').innerHTML = `There was an error accessing the currency exchange rate for ${baseAmount} ${targetCode} ${error}.`;
    // trouble shooting if showResponse is null before trying to set innerHTML
    if (showResponse) {
        showResponse.innerHTML = `There was an error accessing the current exchange rate for ${baseAmount} ${targetCode} ${error}.`;
    } else {
        const errorMessageDiv = document.createElement('div');
        errorMessageDiv.id = 'showResponse';
        errorMessageDiv.innerHTML = `There was an error accessing the current exchange rate for ${baseAmount} ${targetCode} ${error}.`;
        const container = document.querySelector('#results-container');
        container.appendChild(errorMessageDiv);
    }
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