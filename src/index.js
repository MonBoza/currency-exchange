import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyExchange from './currencyAPI';

// Business Logic
async function getExchangeRate(USD) {
    const response = await CurrencyExchange.getExchangeRate(USD);
    if (response) {
        printElements(response, USD);
    } else {
        printError(response, USD);
    }
}

// UI

function printElements(response, USD) {
    document.querySelector('displayResults').innerText = `The exchange rate for ${USD} :`;
    const resultsContainer = document.querySelectorAll('displayResults');
    response.forEach(function (currency){
        const listItem = document.createElement("li");
        listItem.textContent = `${currency.conversion_Rates}`;
        resultsContainer.appendChild(listItem);
    });
} 

function printError(error, USD) {
    document.querySelector('#showResponse').innerText =`There was an error accessing the currency exchange rate for ${USD} ${error}.`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const USD = document.querySelector('USD').value;
    document.querySelectorAll('form-check-input').value;
    getExchangeRate(USD);

}
window.addEventListener("load", function () {
    document.querySelectorAll('form').addEventListener('submit', handleFormSubmission);
});