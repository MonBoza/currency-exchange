export default class ConversionExchange {
    static async getConversion(baseAmount, targetCode) {
        try {
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/USD/${targetCode}/${baseAmount}`);
            const jsonResponse = await response.json();
            if (!response.ok) {
                const errorMessage = `${response.status} ${response.statusText} ${jsonResponse.message}`;
                throw new Error(errorMessage);
            }
            return jsonResponse;
        } catch (error) {
            return error;
        }
    }
}


