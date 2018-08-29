import { ConfigModule } from 'config-module/config.module';
import { Module } from '@nestjs/common';
import { RateController } from './rate.controller';
import { RateService } from './rate.service';
import { ReportService } from 'report.service';

@Module({
  imports: [ConfigModule],
  controllers: [RateController],
  providers: [RateService, ReportService],
})
export class RateModule {}
