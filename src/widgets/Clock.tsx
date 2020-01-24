import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import ClockStore from '../stores/ClockStore';

const styles = (theme: Theme) => createStyles({
    root: {
        userSelect: 'none'
    },
    clock: {
    }
});

interface ClockProps extends PropsWithChildren<WithStyles<typeof styles>> {
}

interface ClockState {
    showDate?: Boolean
}

@observer
class Clock extends React.Component<ClockProps> {

    store: ClockStore;
    state: ClockState = {
        showDate: false
    }

    constructor(props: ClockProps) {
        super(props);
        this.store = new ClockStore();
    }

    render() {
        const { classes } = this.props;

        if (!this.store.now) {
            return null;
        }

        return (
            <div className={classes.root}>
                <span onClick={() => this.setState({ showDate: !this.state.showDate })}>
                    {
                        this.state.showDate
                            ? this.store.now.format('YYYY-MM-DD')
                            : this.store.now.format('HH:mm')
                    }
                </span>
            </div>
        );
    }
}


export default withStyles(styles)(Clock);