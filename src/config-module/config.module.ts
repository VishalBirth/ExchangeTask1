import { Module } from '@nestjs/common';
import { ConfigService } from './config.service';
// tslint:disable-next-line:no-var-requires
const path = require('path');

@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`${path.resolve(__dirname)}/config.json`),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}