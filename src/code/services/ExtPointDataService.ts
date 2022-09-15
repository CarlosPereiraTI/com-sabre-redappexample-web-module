import { AbstractService } from 'sabre-ngv-app/app/services/impl/AbstractService';


export class ExtPointDataService extends AbstractService {
    static SERVICE_NAME = 'com-sabre-redappexample-web-module-ExtPointDataService';

    private data: string;

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }
}