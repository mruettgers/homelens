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
        userSelect: 'none'
    }
});

interface TimerProps extends PropsWithChildren<WithStyles<typeof styles>> {
    remaining: number,
    onIncreaseTimer?: (ev: IncreaseTimerEvent) => void
}

class Timer extends React.Component<TimerProps> {

    constructor(props: TimerProps) {
        super(props);
    }

    render() {
        const { classes, remaining, onIncreaseTimer } = this.props;
        if (remaining <= 0) {
            return null;
        }
        return (
            <div className={classes.root} onClick={e => (onIncreaseTimer && onIncreaseTimer(new IncreaseTimerEvent(remaining)))}>
                {remaining > 0 ? Math.round(remaining / 1000) : 0}
                {/*remaining > 60 ? Math.ceil(remaining/60) + ' min' : remaining + ' sec'*/}
            </div>
        );
    }
}


export default withStyles(styles)(Timer);