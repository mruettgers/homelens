import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
    },
    clock:{
    } 
});

interface TimerProps extends PropsWithChildren<WithStyles<typeof styles>> {
    remaining: number
}

class Timer extends React.Component<TimerProps> {

    constructor(props: TimerProps) {
        super(props);
    }

    render() {
        const { classes, remaining } = this.props;
        return (
            <div className={classes.root}>
                {remaining}
                {/*remaining > 60 ? Math.ceil(remaining/60) + ' min' : remaining + ' sec'*/}
            </div>
        );
    }
}


export default withStyles(styles)(Timer);