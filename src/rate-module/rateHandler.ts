class RateHandler {

    private currenciesData = {
        timestamp: Date.now(),
        base: 'USD',
        rates: {},
    };

    /**
     * GET BASE Currency
     */
    getBaseCurrency() {
        return this.currenciesData.base;
    }

    /**
     * GET All available rates
     */
    getAllRates() {
        return this.currenciesData;
    }

    /**
     * GET rates of specific currencies
     * @param currencies array of list of currencies
     */
    getSpecificRates(currencies: [string]) {
        return Object.assign({}, this.currenciesData, {
            rates: this.filterObjectByKeys(this.currenciesData.rates, currencies),
        });
    }

    /**
     * Set the rate of Specific Currency
     * @param currency name of currency
     * @param rate rate of currency
     */
    setRate(currency: string, rate: number, timestamp=Date.now()) {
        this.currenciesData.rates[currency] = rate;
        this.currenciesData.timestamp = timestamp;
    }

    /**
     * Filter object by list of keys
     * @param objectList json object
     * @param keys array of string
     */
    private filterObjectByKeys(objectList: {}, keys: [string]) {
        return Object.keys(objectList).filter(key => keys.indexOf(key) !== -1).reduce((obj, key) => {
            obj[key] = objectList[key];
            return obj;
        }, {});
    }
}

export const RATE_HANDLER = new RateHandler();