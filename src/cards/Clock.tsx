import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import moment, { Moment } from 'moment-timezone';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
    },
    clock: {
    }
});

const defaultTimezone = 'Europe/Berlin';

interface ClockProps extends PropsWithChildren<WithStyles<typeof styles>> {
    timezone?: string
}

interface ClockState {
    now?: Moment
    showDate?: Boolean
}

class Clock extends React.Component<ClockProps> {

    state: ClockState = {
        now: undefined,
        showDate: false
    }

    constructor(props: ClockProps) {
        super(props);
        const { timezone = defaultTimezone } = props;
        this.state.now = moment().tz(timezone);
        setInterval(() => this.setState({ now: moment().tz(timezone) }), 1000);
    }

    render() {
        const { classes } = this.props;

        if (!this.state.now) {
            return null;
        }

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.state.now.format('dddd')}
                    </Typography>
                    <Typography variant="h3" component="h2">
                        {this.state.now.format('HH:mm:ss')}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {this.state.now.format('YYYY-MM-DD')}
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}


export default withStyles(styles)(Clock);