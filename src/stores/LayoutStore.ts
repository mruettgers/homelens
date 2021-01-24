import { computed } from 'mobx';
import ConfigStore from './ConfigStore';
import Store from './Store';

export default class LayoutStore extends Store {

    private backgroundIndex = 0;
    configStore: ConfigStore;

    constructor(configStore: ConfigStore) {
        super();
        this.configStore = configStore;
    }

    @computed get background() {
        if (this.configStore.layout.backgrounds.length === 0 || !this.configStore.layout.backgrounds[this.backgroundIndex]) {
            return 'none';
        }
        return 'url(' + this.configStore.layout.backgrounds[this.backgroundIndex] + ')';
    }

}