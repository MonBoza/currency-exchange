import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyAPI';

// Business Logic
async function getExchangeRate(USD, selectedCurrencies) {
    const response = await CurrencyExchange.getExchangeRate(USD);
    if (response) {
        printElements(response, USD, selectedCurrencies);
    } else {
        printError(response, USD);
    }
}

// UI

function printElements(response, USD, selectedCurrencies) {
    const displayResults = document.getElementById("displayResults");
    displayResults.innerHTML = "";
    const usdAmount = document.createElement("p");
    usdAmount.textContent = `USD Amount $${USD}`;
    displayResults.appendChild(usdAmount);
    for(const currency in response.conversion_rates) {
        if (selectedCurrencies.includes(currency)){
            const exchangeRate = response.conversion_rates[currency];
            const listItem = document.createElement("li");
            listItem.textContent =`${currency}: ${exchangeRate}`;
            displayResults.appendChild(listItem);
        }
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