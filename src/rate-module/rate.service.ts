import { ReportService } from 'report.service';
import { ConfigService } from 'config-module/config.service';
import { Injectable } from '@nestjs/common';
import { RATE_HANDLER } from './rateHandler';
import axios from 'axios';

// tslint:disable-next-line:no-var-requires
const CronJob = require('cron').CronJob;

@Injectable()
export class RateService {

    private allowedCurrencies: [string];
    private criteria: {};

    constructor(private config: ConfigService, private reportService: ReportService) {
        /**
         * Getting Data From Config. i.e Allowed Currencies and Criteria
         */
        this.allowedCurrencies = config.get('currencies');
        this.criteria = config.get('criteria');

        // Set the rates
        this.updateRates(RATE_HANDLER.getBaseCurrency(), this.allowedCurrencies);
        // Set Rates After every 5 seconds using CronJob
        this.startCronJob();
    }

    /**
     * CronJob to update the rates after every 5 seconds
     */
    startCronJob() {
        const dailyJob = new CronJob({
            cronTime: '*/5 * * * * *',
            onTick: () => {
                this.updateRates(RATE_HANDLER.getBaseCurrency(), this.allowedCurrencies);
            },
        });
        dailyJob.start();
    }

    /**
     * Update rate list from API (link: https://min-api.cryptocompare.com/data/price)
     * @param base base currency to get the data in.
     * @param listOfCurrencies List of currencies to get the data for
     */
    updateRates(base, listOfCurrencies) {
        const time = Date.now();
        // Axios for API calling to get the currencies data.
        axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${base}&tsyms=${listOfCurrencies.join(',')}`)
        .then( (response) => {
            // tslint:disable-next-line:no-console
            console.log(response.data, `time: ${time}`);
            this.setRates(response.data, time);
        })
        .catch( (error) => {
            // tslint:disable-next-line:no-console
            console.log(error);
        });
    }

    /**
     * GET all the Rates
     */
    getAllRates() {
        return RATE_HANDLER.getAllRates();
    }

    /**
     * GET rates of specific currencies
     * @param currencies array of list of currencies
     */
    getSpecificRates(currencies: [string]) {
        return RATE_HANDLER.getSpecificRates(currencies);
    }

    /**
     * Set Rates using newRateList
     * @param newRateList
     * @param time (timestamp)
     */
    setRates(newRateList, time) {
        const currencyData = RATE_HANDLER.getAllRates();
        const oldRateList = currencyData.rates;

        // Go through each currency
        Object.keys(newRateList).forEach(currency => {
            const newRate = newRateList[currency];
            const oldRate = oldRateList[currency];
            // if change/difference btw newRate and oldRate is >= criteria  ======> LOG!
            if ( (newRate -  oldRate) >= this.criteria[currency]) {
                this.reportService.logData(time, currencyData.base, currency, (newRate - oldRate));
            }
            RATE_HANDLER.setRate(currency, newRate, time);
        });
    }
}
