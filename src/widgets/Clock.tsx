import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import moment, { Moment } from 'moment-timezone'; 

const styles = (theme: Theme) => createStyles({
    root: {
    },
    clock:{
    } 
});

const defaultTimezone = 'Europe/Berlin';

interface ClockProps extends PropsWithChildren<WithStyles<typeof styles>> {
    timezone?: string
}

interface ClockState {
    now?: Moment
}

class Clock extends React.Component<ClockProps> {
    
    state: ClockState = {
        now: undefined
    }

    constructor(props: ClockProps) {
        super(props);
        const {timezone = defaultTimezone} = props;
        this.state.now = moment().tz(timezone);
        setInterval(() => this.setState({now: moment().tz(timezone)}),1000);
    }

    render() {
        const { classes } = this.props;

        if (!this.state.now) {
            return null;
        }

        return (
            <div className={classes.root}>
               {this.state.now.format('HH:mm')}
            </div>
        );
    }
}


export default withStyles(styles)(Clock);