import React from 'react';
import { withStyles, createStyles, Theme, WithStyles, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import ReactWeather from 'react-open-weather';
//Optional include of the default css styles
import 'react-open-weather/lib/css/ReactWeather.css';
import 'weather-icons/css/weather-icons.css';
import WeatherStore from '../stores/WeatherStore';
import { observer } from 'mobx-react';

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

const store = new WeatherStore();

@observer
class Weather extends React.Component<WithStyles<typeof styles>> {

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardContent>
                    {store.openWeatherAPIKey
                        ?
                        <ReactWeather
                            forecast="5days"
                            apikey={store.openWeatherAPIKey}
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


export default withStyles(styles)(Weather);