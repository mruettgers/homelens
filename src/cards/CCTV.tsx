import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
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

class CCTV extends React.Component<WithStyles<typeof styles>> {

    render() {
        const { classes } = this.props;
        
        return (
            <Card className={classes.root}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        CCTV
                    </Typography>
                    <Typography variant="h5" component="h2">
                        Card content
                    </Typography>
                </CardContent>
                <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
            </Card>
        );
    }
}


export default withStyles(styles)(CCTV);