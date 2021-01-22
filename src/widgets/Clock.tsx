import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import { observer } from 'mobx-react';
import { StoreContext } from '../contexts';

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

    static contextType = StoreContext;

    state: ClockState = {
        showDate: false
    }

    render() {
        const { classes } = this.props;

        const {clockStore: store} = this.context;

        if (store.now) {
            return null;
        }

        return (
            <div className={classes.root}>
                <span onClick={() => this.setState({ showDate: !this.state.showDate })}>
                    {
                        this.state.showDate
                            ? store.now.format('YYYY-MM-DD')
                            : store.now.format('HH:mm')
                    }
                </span>
            </div>
        );
    }
}


export default withStyles(styles)(Clock);