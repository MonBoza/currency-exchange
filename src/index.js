import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyAPI';

// Business Logic
async function getExchangeRate(USD, selectedCurrencies) {
    const response = await CurrencyExchange.getExchangeRate(USD);
    if (response) {
        printElements(response, USD);
    } else {
        printError(response, USD);
    }
}

// UI

function printElements(response, USD) {
    document.querySelector('#displayResults').innerText = `The exchange rate for ${USD} :`;
    const resultsContainer = document.querySelector('#displayResults');
    const conversionRatesArray = response.conversion_rates;
    console.log(response[8])
    conversionRatesArray.forEach(entry => {
        const [currency, rate] = entry
        const listItems = document.createElement("li");
        listItems.textContent =  `${currency}: ${rate}`
        resultsContainer.appendChild(listItems);
    });
} 

function printError(error, USD) {
    document.querySelector('#showResponse').innerHTML =`There was an error accessing the currency exchange rate for ${USD} ${error}.`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const USD = document.querySelector('#USD').value;
    const selectedCurrencies = Array.from(document.querySelectorAll("input[name='currency']:checked")).map(checkbox => checkbox.value);
    document.querySelectorAll("input[name='currency']:checked");
    getExchangeRate(USD, selectedCurrencies);

}
window.addEventListener("load", function () {
    document.querySelector('#exchangeForm').addEventListener('submit', handleFormSubmission);
});