export default class CurrencyExchange {
    static async getExchangeRate(USD, selectedCurrencies){
        try {
            const currenciesSelected = selectedCurrencies.join(",");
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD?targets=${currenciesSelected}`);
            const jsonResponse = await response.json();
            
            if(!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
                throw new Error(errorMessage);
            }
            return jsonResponse.conversion_rates;
        } catch(error) {
            return error;
        }
    }
}