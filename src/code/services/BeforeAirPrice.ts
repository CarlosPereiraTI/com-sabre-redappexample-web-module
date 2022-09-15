// imports
import { BeforeAirPriceExtension } from 'sabre-ngv-extensionPoints/extensions/BeforeAirPriceExtension';
import { CommandMessageAirPriceRq, ExtPointBeforeAirPriceRqDataResult }  from 'sabre-ngv-pos-cdm/airpricing';
import { getService } from '../Context';
import { ExtPointDataService } from './ExtPointDataService';


export class BeforeAirPrice extends BeforeAirPriceExtension {
    // The service name should be the same on manifest.json and followed by "-classname"
    static SERVICE_NAME = 'com-sabre-redappexample-web-module-BeforeAirPrice';

    async onBeforeAirPrice(rq: CommandMessageAirPriceRq): Promise<ExtPointBeforeAirPriceRqDataResult> {
        // console.log(rq);
        getService(ExtPointDataService).setData(JSON.stringify(rq));
        
        return {
            Status: 'CONTINUE',
            Data: rq
        };
    }
}