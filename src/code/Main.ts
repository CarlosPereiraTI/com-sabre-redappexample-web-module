// Imports
import { Module } from 'sabre-ngv-core/modules/Module';
import { IAreaService } from 'sabre-ngv-app/app/services/impl/IAreaService';
import { getService, registerService } from './Context';
import { BeforeAirPrice } from './services/BeforeAirPrice';
import { ExtPointDataService } from './services/ExtPointDataService';
import { RedAppSidePanelButton } from 'sabre-ngv-redAppSidePanel/models/RedAppSidePanelButton';
import { ExtensionPointService } from 'sabre-ngv-xp/services/ExtensionPointService';
import { RedAppSidePanelConfig } from 'sabre-ngv-xp/configs/RedAppSidePanelConfig';
import { ExtPointDataView } from './views/ExtPointDataView';
import { LayerService } from 'sabre-ngv-core/services/LayerService';



export class Main extends Module {
    init(): void {
        super.init();
        /*
        // initialize your module here

        // console.log("Sample Loaded Correctly");
        
        // Variable declaration and getting services service
        const areaService = getService(IAreaService);

        // show banner
        // https://developer.sabre.com/sdks/travel-agency/sabre-red-360/help_doc?page=iareaservice
        // type BannerType = 'Info' | 'Warning' | 'Success' | 'Error';
        areaService.showBanner('Info', 'Red App Example', 'Red App loaded successfully');
        */

        registerService(BeforeAirPrice);
        registerService(ExtPointDataService);

        this.setupWorkflows();

    }

    // Create button
    private setupWorkflows(): void {
        const config = new RedAppSidePanelConfig ([
            new RedAppSidePanelButton('Show data', '', () => this.showData())
        ]);

        const xp = getService(ExtensionPointService);

        xp.addConfig('redAppSidePanel', config)
    }

    private showData(): void {
        const data = getService(ExtPointDataService).getData() || 'N/A';
        // console.log(data);

        const options = {
            title: 'Extension Point Data',
            actions: [
                {
                    className: 'app.commons.views.Button',
                    caption: 'Close',
                    actionName: 'cancel',
                    type: 'secondary'
                }
            ]
        };

        getService(LayerService).showInModal(
            new ExtPointDataView({model: {value: data}}),
            options,
            {display: 'areaView'}
        );
        
    }
}
