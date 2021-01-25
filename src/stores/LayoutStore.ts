import { computed, reaction } from 'mobx';
import ConfigStore from './ConfigStore';
import Store from './Store';

export default class LayoutStore extends Store {

    private backgroundIndex = 0;
    private backgroundTimer?: NodeJS.Timeout;
    configStore: ConfigStore;

    constructor(configStore: ConfigStore) {
        super();
        this.configStore = configStore;

        this.initBackgroundRotation();
        reaction(() => this.configStore.layout.background.rotationInterval, () => {
            this.initBackgroundRotation();
        })
        reaction(() => this.configStore.layout.backgrounds, () => {
            this.initBackgroundRotation();
        })
    }

    initBackgroundRotation() {
        const { layout: config } = this.configStore;

        // Clear existing timer
        if (this.backgroundTimer) {
            clearInterval(this.backgroundTimer);
            this.backgroundTimer = undefined;
        }

        // Reset index
        this.backgroundIndex = 0;

        // No timer needed when interval = 0 or not at least 2 background images given
        if (config.background.rotationInterval === 0 || config.backgrounds.length <= 1) {
            return;
        }

        // Create timer
        this.backgroundTimer = setInterval(
            () => {
                this.backgroundIndex = ((this.backgroundIndex + 1) % config.backgrounds.length);
            },
            config.background.rotationInterval * 1000
        );
    }


    @computed get background() {
        const { layout: config } = this.configStore;
        if (config.backgrounds.length === 0 || !config.backgrounds[this.backgroundIndex]) {
            return 'none';
        }
        return 'url(' + config.backgrounds[this.backgroundIndex] + ')';
    }

}