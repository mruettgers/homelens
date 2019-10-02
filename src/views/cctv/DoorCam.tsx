import React from 'react';
import { Link, withStyles, createStyles, Theme } from '@material-ui/core';
import { WithStyles } from '@material-ui/styles/withStyles';

const styles = (theme: Theme) => createStyles({
    root: {
        position: 'relative'
    },
    primary: {
        width: '100%'
    },
    secondary: {
        border: '1px solid black',
        width: '25%',
        position: 'absolute',
        right: '30px',
        bottom: '94px'
    }
});

interface DoorCamProps extends WithStyles<typeof styles> {
}

class DoorCam extends React.Component<DoorCamProps> {

    state = {
        ts: 0,
        primary: 0
    }

    private streams = [
        'http://frontdoor1.live.cctv.home',
        'http://frontyard1.live.cctv.home',
    ];

    private imageRefs = {
        primary: React.createRef<HTMLImageElement>(),
        secondary: React.createRef<HTMLImageElement>()
    }

    componentDidMount() {
        this.setState({ ts: Date.now() });
    }

    componentWillUnmount() {
        this.unloadStreams();
    }

    render() {
        const { primary } = this.state;

        const secondary = (primary + 1) % this.streams.length;
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <img
                    className={classes.primary}
                    src={this.getStreamUrl(primary)}
                    alt=""
                    ref={this.imageRefs.primary}
                />
                <Link onClick={() => this.setState({ primary: secondary, ts: Date.now() })}>
                    <img
                        className={classes.secondary}
                        src={this.getStreamUrl(secondary)}
                        alt=""
                        ref={this.imageRefs.secondary}
                        />
                </Link>
            </div>
        );
    }

    getStreamUrl(index: number) {
        return this.streams[index] + '?ts=' + this.state.ts;
    }

    unloadStreams() {
        [this.imageRefs.primary, this.imageRefs.secondary].forEach((ref) => {
            if (ref.current) {
                ref.current.src = '';
            }
        })
    }
}


export default withStyles(styles)(DoorCam);