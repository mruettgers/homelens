import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Clock from '../cards/Clock';
import Placeholder from '../cards/Placeholder';
import Calendar from '../cards/Calendar';
import PlayingNow from '../cards/PlayingNow';
import CCTV from '../cards/CCTV';
import Weather from '../cards/Weather';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        padding: 24,
        userSelect: 'none',
        opacity: 0.9,
    },

});


class Home extends React.Component<WithStyles<typeof styles>> {

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    <Grid item xs>
                        <Weather />
                    </Grid>
                    <Grid item xs>
                        <Clock />
                    </Grid>
                    <Grid item xs>
                        <PlayingNow />
                    </Grid>
                    <Grid item xs>
                        <Calendar />
                    </Grid>
                    <Grid item xs>
                        <CCTV />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid><Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid><Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid><Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid><Grid item xs>
                        <Placeholder />
                    </Grid>
                    <Grid item xs>
                        <Placeholder />
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Home);