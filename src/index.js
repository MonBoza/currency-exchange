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
        printError(response, keyword);
    }
}

// UI

function printElements(response, USD) {
    document.querySelector('displayResults').innerText = `The exchange rate for ${USD}`
} 