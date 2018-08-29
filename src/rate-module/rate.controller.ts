import { Get, Controller, Param, Patch, Body } from '@nestjs/common';
import { RateService } from './rate.service';


@Controller('rates')
export class RateController {
    constructor(private readonly currencyService: RateService) {}

    @Get()
    getAllRates() {
        return this.currencyService.getAllRates();
    }

    @Get('/:currencies')
    getRates(@Param() params) {
        const currencies = params.currencies.split(',');
        return this.currencyService.getSpecificRates(currencies);
    }
}
