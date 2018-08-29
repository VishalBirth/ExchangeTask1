import { ConfigModule } from 'config.module';
import { Module } from '@nestjs/common';
import { RateController } from 'rates.controller';
import { CurrencyService } from 'currency.service';
import { ReportService } from './report.service';

@Module({
  imports: [ConfigModule],
  controllers: [RateController],
  providers: [CurrencyService, ReportService],
})
export class RateModule {}
