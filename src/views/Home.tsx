import React from 'react';
import { withStyles, createStyles, Theme, WithStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CameraIcon from '@material-ui/icons/Videocam';
import MusicIcon from '@material-ui/icons/MusicNote';
import IconButton from '@material-ui/core/IconButton';
import { Link } from "react-router-dom";
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

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
                    <Grid item xs>
                        <Card className={classes.card}>
                                <Link to="/entertain/music">
                            <CardActionArea>
                                <Link to="/entertain/music">
                                    <Typography variant="h2" component="h2">
                                        <MusicIcon />
                                    </Typography>
                                </Link>
                                <CardContent>
                                    <Typography variant="h2" component="h2">
                                        Lizard
                            </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                        across all continents except Antarctica
                            </Typography>
                                </CardContent>
                            </CardActionArea>
                            <CardActions>
                                <Button size="small" color="primary">
                                    Share
                            </Button>
                                <Button size="small" color="primary">
                                    Learn More
                            </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                    <Grid item xs>
                        <Paper className={classes.paper}>
                            <Link to="/cctv/door">
                                <CameraIcon />
                            </Link>
                        </Paper>
                    </Grid>
                </Grid>
            </div>
        )
    }
}


export default withStyles(styles)(Home);