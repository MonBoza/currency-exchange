export default class ConversionExchange {
    static getConversion(baseAmount, baseCode, targetCode) {

        const apiUrl = `https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${baseCode}/${targetCode}/${baseAmount}`;

        return fetch(apiUrl)
            .then(function(response) {
                if(!response.ok) {
                    return response.json()
                        .then(function(jsonResponse) {
                            throw new Error(`Error: ${jsonResponse.result}`);
                        });
                }
                return response.json();
            });
    }
}

