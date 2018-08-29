import { Get, Controller, Param, Patch, Body } from '@nestjs/common';
import { CurrencyService } from 'currency.service';

@Controller('rates')
export class RateController {
  constructor(private readonly currencyService: CurrencyService) {}

    @Get()
    getAllRates() {
        return this.currencyService.getAllRates();
    }

    @Get('/:currencies')
    getRates(@Param() params) {
        const currencies = params.currencies.split(',');
        return this.currencyService.getSpecificRates(currencies);
    }

    @Patch()
    addRate(@Body() body) {
        Object.keys(body).forEach(key => {
            // Set the value only if Currency is allowed in Config File
            this.currencyService.setRate(key, body[key]);
            // else throw Error If currencies don't exist
        });
        return this.currencyService.getAllRates();
    }

}
