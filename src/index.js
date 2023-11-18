import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import ConversionExchange from './services/API-helper';

async function getConversion(baseAmount, baseCode, targetCode) {
    const response = await ConversionExchange.getConversion(baseAmount, baseCode, targetCode);
    if (response) {
        printElements(response, baseAmount, baseCode, targetCode);
    } else {
        printError(response, baseAmount, baseCode, targetCode);
    }
}



function printElements(response) {
    document.getElementById('baseAmount').value = response["conversion_result"];
    const displayResults = document.getElementById("displayResults");
    console.log(displayResults);
    displayResults.innerHTML = "";
    const listItems = document.createElement("li");
    const usdAmount = document.createElement("p");
    usdAmount.textContent = `USD Amount $${baseAmount}`;
    listItems.textContent =`${baseAmount}: ${targetCode}`;
    displayResults.appendChild(listItems);
}

function printError(error, baseAmount, targetCode) {
    document.querySelector('#showResponse').innerHTML =`There was an error accessing the currency exchange rate for ${baseAmount} ${targetCode} ${error}.`;
}

function handleFormSubmission(event) {
    event.preventDefault();
    const targetCode = document.querySelectorAll("input[name='targetCode']:checked");
    const baseAmount = parseFloat(document.querySelector('#baseAmount').value);
    getConversion( baseAmount, targetCode);
}

window.addEventListener("load", function () {
    document.querySelector('#exchangeForm').addEventListener('submit', handleFormSubmission);
});