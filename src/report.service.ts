import { ConfigService } from 'config.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportService {
    logData(timeStamp: number, base: string, currency: string, change: number) {
        // tslint:disable-next-line:no-console
        const info = `${timeStamp} ${base} ${currency} ${change}`;
        console.log(info);
    }
}
