import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import moment, { Moment } from 'moment-timezone';

const styles = (theme: Theme) => createStyles({
    root: {
        userSelect: 'none'
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
            <div className={classes.root} onClick={() => this.setState({showDate: !this.state.showDate})}>
                {
                    this.state.showDate
                        ? this.state.now.format('YYYY-MM-DD')
                        : this.state.now.format('HH:mm')
                }
            </div>
        );
    }
}


export default withStyles(styles)(Clock);