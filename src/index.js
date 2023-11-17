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

function printElements(response, USD) {
    document.querySelector('#displayResults').innerText = `The exchange rate for ${USD} :`;
    const resultsContainer = document.querySelector('#displayResults');
    const conversionRates =response.conversion_rates;
    const selectedCurrencies = ['AUD','CAD','EUR','GBP','MXN','JPY']
    selectedCurrencies.forEach(currency => {
        const listItem = document.createElement("li");
        listItem.textContent = `${currency}: ${conversionRates[currency]}`;
        console.log(`${currency}`);
        resultsContainer.appendChild(listItem);
    });
    // for(const currency in conversionRates) {
    //     const listItem = document.createElement("li");
    //     listItem.textContent = `${currency}: ${conversionRates[currency]}`;
    //     console.log(`${currency}`)
    //     resultsContainer.appendChild(listItem);
    // }
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