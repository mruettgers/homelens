import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';
import CameraIcon from '@material-ui/icons/Videocam';
import MusicIcon from '@material-ui/icons/MusicNote';
import { Router, Link } from "react-router-dom";
import routes from './routes';
import { createBrowserHistory } from 'history';
import IdleTimer from './components/IdleTimer';
import BackButton from './components/BackButton';
import Clock from './widgets/Clock';
import WebSocketClient, { WebSocketClientEvent } from './components/WebSocketClient';
import { debounce } from 'ts-debounce';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    userSelect: 'none',
  },
  clock: {
    flexGrow: 1,
    textAlign: 'center',
    userSelect: 'none',
  },
}));

const history = createBrowserHistory();


const App: React.FC = () => {

  const classes = useStyles();
  const idleTimer = React.createRef<any>();

  const handlePresence = debounce(() => {
    // Enable back light
    axios.get('http://127.0.0.1:42424/screen_ON');
    // Go to doorcam
    history.push('/cctv/door');
    if (idleTimer.current) {
      idleTimer.current.reset();
    }
  }, 60 * 1000, { isImmediate: true });

  const handleWebSocketEvent = (ev: WebSocketClientEvent) => {
    if (ev.name === 'presence') {
      handlePresence();
    }
  }

  return (
    <Router history={history}>
      <WebSocketClient
        url='ws://nodered.home/ws/doormon'
        onEvent={handleWebSocketEvent}
      />
      <IdleTimer ref={idleTimer} redirectTo="/">
        <div className="App">
          <div className="header">
            <AppBar position="static">
              <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  {routes.render('title')}
                </Typography>
                <Typography variant="h6" className={classes.clock}>
                  <Clock />
                </Typography>
                <Link to="/entertain/music">
                  <IconButton>
                    <MusicIcon />
                  </IconButton>
                </Link>
                <Link to="/cctv/door">
                  <IconButton>
                    <CameraIcon />
                  </IconButton>
                </Link>
                <IconButton onClick={() => (document.location.href = '/?ts=' + Date.now())}>
                  <RefreshIcon />
                </IconButton>
                {routes.render(({ route }) => {
                  return (<BackButton route={route} />);
                })}
              </Toolbar>
            </AppBar>
          </div>
          <div className="content">
            {routes.render('main')}
          </div>
        </div>
      </IdleTimer>
    </Router>
  );
}

export default App;
