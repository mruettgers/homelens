import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import PowerOffIcon from '@material-ui/icons/PowerSettingsNew';
import CameraIcon from '@material-ui/icons/Videocam';
import axios from 'axios';
import { Container } from '@material-ui/core';
import Cam from './components/Cam';
import { Route } from 'react-router';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    opacity: 0.8,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    userSelect: 'none',
  },
}));

const App: React.FC = () => {
  const classes = useStyles();

  const handleCameraClick = () => {
    console.log('Cam');
  }

  const title = 'Home';

  return (
    <div className="App">
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           {title}
          </Typography>
          <IconButton onClick={handleCameraClick}>
            <CameraIcon />
          </IconButton>
          <IconButton onClick={() => document.location.reload()}>
            <RefreshIcon />
          </IconButton>
          <IconButton onClick={() => axios.get('http://127.0.0.1:42424/screen_OFF').then()}>
            <PowerOffIcon />
          </IconButton>
        </Toolbar>
        <Container>
          <Route path="/cctv/door" component={Cam} />
        </Container>
      </AppBar>
    </div>
  );
}

export default App;
