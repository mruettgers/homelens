import React, { PropsWithChildren } from 'react';
import axios from 'axios';
import { StoreContext } from '../contexts';
import ConfigStore from '../stores/ConfigStore';
import { Box, CircularProgress, Container, Grid } from '@material-ui/core';

interface ConfigLoaderProps {
    url: string;
}

interface ConfigLoaderState {
    ready: Boolean
    error: string|null
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
            .catch(e => this.setState({ error: e.message }));
    }

    render() {
        const { url } = this.props;

        if (this.state.ready) {
            // Config has been loaded
            return <React.Fragment>
                {this.props.children}
            </React.Fragment>
        }

        return <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}
        >

            <Grid item xs={3}>
                {
                    this.state.error !== null
                        ? <Box color="error.main">
                            <div>Unable to load configuration from {url}:</div>
                            <div>{this.state.error}</div>
                        </Box>
                        : <CircularProgress />
                }
            </Grid>

        </Grid>

    }
}

export default ConfigLoader;