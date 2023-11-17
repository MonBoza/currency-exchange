import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyAPI';

// Business Logic
async function getExchangeRate(USD, selectedCurrencies) {
    const response = await CurrencyExchange.getExchangeRate(USD, selectedCurrencies);
    if (response instanceof Error) {
        console.log('Selected Currencies:', selectedCurrencies);

        printError(response, USD);
    } else {
        printElements(USD, selectedCurrencies, response.conversion_rates);
        console.log('Selected Currencies:', selectedCurrencies);
        
    }
}

// UI

function printElements(USD, selectedCurrencies, rates) {
    const convertedAmounts = selectedCurrencies.map(currency => USD * rates[currency]);
    const displayResults = document.getElementById("displayResults");
    console.log(displayResults);
    displayResults.innerHTML = "";
    const usdAmount = document.createElement("p");
    usdAmount.textContent = `USD Amount $${USD}`;
    displayResults.appendChild(usdAmount);
    for (let i = 0; i < selectedCurrencies.length; i++) {
        const listItem = document.createElement("li");
        listItem.textContent = `${selectedCurrencies[i]}: ${convertedAmounts[i]}`;
        displayResults.appendChild(listItem);
    }
}

function printError(error, USD) {
    document.querySelector('#showResponse').innerHTML =`There was an error accessing the currency exchange rate for ${USD} ${error}.`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const USD = parseFloat(document.querySelector('#USD').value);
    const selectedCurrencies = Array.from(document.querySelectorAll("input[name='currency']:checked")).map(checkbox => checkbox.value);
    getExchangeRate(USD, selectedCurrencies);
}


window.addEventListener("load", function () {
    document.querySelector('#exchangeForm').addEventListener('submit', handleFormSubmission);
});