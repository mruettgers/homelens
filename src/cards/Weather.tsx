import React from 'react';
import { createStyles, Theme, WithStyles, Typography, withStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles
import 'react-open-weather/lib/css/ReactWeather.css';
import 'weather-icons/css/weather-icons.css';
import { observer } from 'mobx-react';
import { StoreContext } from '../contexts';

const styles = (theme: Theme) => createStyles({
    root: {
        minWidth: 275,
        '& .rw-main': {
            background: 'none',
            color: theme.palette.text.primary,
            '& .rw-today > *': {
                color: theme.palette.text.primary,
            }
        },
        '& .desc i.wicon, i.wicon': {
            color: theme.palette.primary.main
        }
    },
});

@observer
class Weather extends React.Component<WithStyles<typeof styles>> {

    static contextType = StoreContext;

    render() {
        const {configStore: config} = this.context;
        const { classes } = this.props;
        return (
            
            <Card className={classes.root}>
                <CardContent>
                    {config.weather.openWeather.apiKey
                        ?
                        <ReactWeather
                            forecast="5days"
                            apikey={config.weather.openWeather.apiKey}
                            type="city"
                            city="Simmerath"
                            lang="de"
                        />
                        :
                        <Typography variant="h2" component="h2">
                            OpenWeather API key is missing.
                        </Typography>
                    }
                </CardContent>
            </Card>
        );
    }
}

Weather.contextType = StoreContext;

export default withStyles(styles)(Weather);