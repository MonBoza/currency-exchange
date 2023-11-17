export default class CurrencyExchange {
    static async getExchangeRate(USD) {
        try{
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD=${USD}`);
            const jsonResponse = await response.json();
            if(!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${response.message}`;
                throw new Error(errorMessage);
            }
            return jsonResponse;
        }catch(error) {
            return error;
        }
    }
}