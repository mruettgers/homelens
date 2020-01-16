import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        padding: 20,
        userSelect: 'none',
    },
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
});


class Home extends React.Component<WithStyles<typeof styles>> {

    render() {

        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={3}>
                    {/*<Grid item xs>  
                    A                      
                    </Grid>
                    <Grid item xs>    
                    B                    
                    </Grid>
                    <Grid item xs>
                        C
                    </Grid>*/}
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Home);