import { ReportService } from './report.service';
import { ConfigService } from 'config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CurrencyService {

    
    private allowedCurrencies: [string];
    private criteria: {};
    private currenciesData = {
        timestamp: Date.now(),
        base: 'USD',
        rates: {},
    };
    constructor(private config: ConfigService, private reportService: ReportService) {
        this.allowedCurrencies = config.get('currencies');
        this.allowedCurrencies.forEach( (value: string) => {
            this.currenciesData.rates[value] = 0;
        });
        this.criteria = config.get('criteria');
    }

    getAllRates() {
        return this.currenciesData;
    }

    private filterObjectByKeys(objectList: {}, keys: [string]) {
        return Object.keys(objectList).filter(key => keys.indexOf(key) !== -1).reduce((obj, key) => {
            obj[key] = objectList[key];
            return obj;
        }, {});
    }

    getSpecificRates(currencies: [string]) {
        return Object.assign({}, this.currenciesData, {
            rates: this.filterObjectByKeys(this.getAllRates().rates, currencies),
        });
    }

    getRate(currency: string) {
        return this.currenciesData.rates[currency];
    }

    setRate(currency: string, rate: number): boolean {
        if (this.allowedCurrencies.indexOf(currency) !== -1) {
            const timestamp = Date.now();
            const diff = rate - this.currenciesData.rates[currency];
            // if change/difference is >= criteria => LOG!
            if ( diff >= this.criteria[currency]){
                this.reportService.logData(timestamp, this.currenciesData.base, currency, diff);
            }
            this.currenciesData.rates[currency] = rate;
            this.currenciesData.timestamp = Date.now();
            return true;
        }else{
            return false;
        }
    }
}
