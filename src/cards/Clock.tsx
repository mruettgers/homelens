import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { observer } from 'mobx-react';
import { StoreContext } from '../contexts';

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
        fontSize: 24,
    },
    pos: {
        marginTop: 12,
        fontSize: 24
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
        const { clockStore: store } = this.context;

        if (!store.now) {
            return null;
        }

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {store.now.format('dddd')}
                    </Typography>
                    <Typography variant="h1" component="h2">
                        {store.now.format('HH:mm:ss')}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {store.now.format('YYYY-MM-DD')}
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}


export default withStyles(styles)(Clock);