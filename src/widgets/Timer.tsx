import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import moment, { Moment } from 'moment';

export class IncreaseTimerEvent extends Event {
    public remaining: number
    constructor(remaining: number) {
        super('increase_timer');
        this.remaining = remaining;
    }
}


const styles = (theme: Theme) => createStyles({
    root: {
        userSelect: 'none'
    },
    minutes: {},
    minutesLabel: {},
    seconds: {},
    secondsLabel: {}
});

interface TimerProps extends PropsWithChildren<WithStyles<typeof styles>> {
    remaining: number,
    onIncreaseTimer?: (ev: IncreaseTimerEvent) => void
}

interface TimerState {
}


class Timer extends React.Component<TimerProps> {

    state: TimerState = {
    }

    constructor(props: TimerProps) {
        super(props);
    }

    render() {
        const { classes, remaining, onIncreaseTimer } = this.props;
        if (remaining <= 0) {
            return null;
        }
        const remainingSecs = Math.round(remaining / 1000);
        const displayMins = Math.floor(remainingSecs / 60);
        const displaySecs = remainingSecs % 60;
        return (
            <div className={classes.root} onClick={e => (onIncreaseTimer && onIncreaseTimer(new IncreaseTimerEvent(remaining)))}>
                <span className={classes.minutes}>{displayMins}<span className={classes.minutesLabel}>m</span></span>&nbsp;
                <span className={classes.seconds}>{displaySecs}<span className={classes.secondsLabel}>s</span></span>
            </div>
        );
    }

}


export default withStyles(styles)(Timer);