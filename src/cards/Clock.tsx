import React, { PropsWithChildren } from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ClockStore from '../stores/ClockStore';
import { observer } from 'mobx-react';

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

    store: ClockStore
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
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {this.store.now.format('dddd')}
                    </Typography>
                    <Typography variant="h1" component="h2">
                        {this.store.now.format('HH:mm:ss')}
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        {this.store.now.format('YYYY-MM-DD')}
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}


export default withStyles(styles)(Clock);