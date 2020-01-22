import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) => createStyles({
    root: {
        minWidth: 275,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
    },
});

class PlayingNow extends React.Component<WithStyles<typeof styles>> {

    render() {
        const { classes } = this.props;
        
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Playing now
                    </Typography>
                    <Typography variant="h5" component="h2">
                        I've been looking for freedom
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        David Hasseldoff
                    </Typography>

                </CardContent>
            </Card>
        );
    }
}


export default withStyles(styles)(PlayingNow);