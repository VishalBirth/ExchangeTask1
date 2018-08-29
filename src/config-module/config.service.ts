import * as fs from 'fs';

export class ConfigService {
    private readonly envConfig: {};

    constructor(filePath: string) {
        const data = fs.readFileSync(filePath, 'utf8');
        this.envConfig = JSON.parse(data);
    }

    get(key: string) {
        return this.envConfig[key];
    }
}