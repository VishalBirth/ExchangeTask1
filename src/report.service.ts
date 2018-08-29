import { ConfigService } from 'config-module/config.service';
import { Injectable } from '@nestjs/common';

const fs = require('fs');

@Injectable()
export class ReportService {
    logData(timeStamp: number, base: string, currency: string, change: number) {
        // tslint:disable-next-line:no-console
        const info = `${timeStamp} ${base} ${currency} ${change}\n`;
        // tslint:disable-next-line:no-console
        console.log(info);

        fs.appendFile('./report.log', info, (err) => {
            if (err) {
                return console.log(err);
            }

            console.log("The file was saved!");
        });
    }
}
