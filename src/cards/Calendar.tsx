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
        fontSize: 14
    },
    highlight: {
        color: theme.palette.info.dark
    }
});

class Calendar extends React.Component<WithStyles<typeof styles>> {

    render() {
        const { classes } = this.props;

        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Tomorrow
                    </Typography>
                    <Typography className={classes.highlight} variant="h5" component="h2">
                        Gelbe Tonne
                    </Typography>
                    <br/>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Thursday
                    </Typography>
                    <Typography  variant="h5" component="h2">
                        Restmüll
                    </Typography>
                </CardContent>
            </Card>
        );
    }
}


export default withStyles(styles)(Calendar);