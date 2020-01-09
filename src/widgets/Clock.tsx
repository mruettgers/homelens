import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import moment from 'moment'; 

const styles = (theme: Theme) => createStyles({
    root: {
    },
    clock:{
    } 
});


class Clock extends React.Component<WithStyles<typeof styles>> {

    state = {
        now: moment()    
    }

    constructor(props: WithStyles<typeof styles>) {
        super(props);
        setInterval(() => this.setState({now: moment()}),1000);
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
               <h2></h2>{this.state.now.format('HH:mm')}
            </div>
        );
    }
}


export default withStyles(styles)(Clock);