import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
    root: {
    },
});


class Music extends React.Component<WithStyles<typeof styles>> {

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                Music
            </div>
        );
    }
}


export default withStyles(styles)(Music);