import React, { PropsWithChildren } from 'react';
import axios from 'axios';
import { StoreContext } from '../contexts';
import ConfigStore from '../stores/ConfigStore';

interface ConfigLoaderProps {
    url: string;
}

interface ConfigLoaderState {
    ready: Boolean
    error: Error | null
}
class ConfigLoader extends React.Component<ConfigLoaderProps> {

    static contextType = StoreContext;

    configStore: ConfigStore;

    state: ConfigLoaderState = {
        ready: false,
        error: null
    };

    constructor(props: PropsWithChildren<ConfigLoaderProps>, context: React.ContextType<typeof StoreContext>) {
        super(props)
        this.configStore = context.configStore;
        this.loadConfig();
    }

    loadConfig() {
        const { url } = this.props;
        axios
            .get(url)
            .then(response => {
                this.configStore.load(response.data);
                this.setState({ ready: true });
            })
            .catch(e => this.setState({ error: e }));
    }

    render() {
        const { url } = this.props;

        if (this.state.error) {
            return <div>
                <div>Unable to load configuration: {url}</div>
                <div>{this.state.error.message}</div>
            </div>
        }

        if (this.state.ready) {
            // Config has been loaded
            return <React.Fragment>
                {this.props.children}
            </React.Fragment>
        }

        return <div>
            <div>Konfiguration wird geladen...</div>
        </div>
    }
}

export default ConfigLoader;