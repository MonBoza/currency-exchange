export default class CurrencyExchange {
    static async getExchangeRate(USD, selectedCurrencies) {
        try {
            const currenciesSelected = selectedCurrencies.join(",");
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD=${USD}&targets=${currenciesSelected}`);
            const jsonResponse = await response.json();

            if (response.ok) {
                if (jsonResponse.result === 'success') {
                    return jsonResponse;
                } else {
                    const errorMessage = `API request was not successful: ${jsonResponse.result} - ${jsonResponse['error-type']}`;
                    throw new Error(errorMessage);
                }
            } else {
                const errorMessage = `${response.status} ${response.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error) {
            return error;
        }
    }
}