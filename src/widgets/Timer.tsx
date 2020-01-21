import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

export class IncreaseTimerEvent extends Event {
    public remaining: number
    constructor(remaining: number) {
        super('increase_timer');
        this.remaining = remaining;
    }
}


const styles = (theme: Theme) => createStyles({
    root: {
        userSelect: 'none',
        position: 'fixed',
        opacity: 0.8,
        left: 40,
        bottom: 40,
        zIndex: 2000,
        width: 80,
        height: 80,
        borderRadius: '50%',
        borderWidth: 2,
        borderColor: theme.palette.text.primary,
        border: '2px solid white',
        textAlign: 'center',
        verticalAlign: 'middle',
        lineHeight: '80px',
        fontSize: 16,
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.primary.dark
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