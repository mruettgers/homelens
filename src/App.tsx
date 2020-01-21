import React, { useState } from 'react';
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
import IdleTimer, { TimerEvent, IdleEvent } from './components/IdleTimer';
import BackButton from './components/BackButton';
import Clock from './widgets/Clock';
import Timer, { IncreaseTimerEvent } from './widgets/Timer';
import WebSocketClient, { WebSocketClientEvent } from './components/WebSocketClient';
import PresenceEvent from './events/PresenceEvent';
import { debounce } from 'ts-debounce';
import DeviceManager from './services/DeviceManager';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    flexGrow: 1,
    userSelect: 'none',
  },
  clock: {
    left: 0,
    width: '100%',
    position: 'fixed',
    textAlign: 'center',
    userSelect: 'none',
  },
  timer: {
    position: 'fixed',
    opacity: 0.8,
    left: 40,
    bottom: 40,
    zIndex: 2000,
    width: 80,
    height: 80,
    borderRadius: '50%',
    textAlign: 'center',
    verticalAlign: 'middle',
    lineHeight: '80px',
    fontSize: 16,
    color: theme.palette.text.primary,
    backgroundColor: theme.palette.primary.dark
  }
}));

const history = createBrowserHistory();

const deviceManager = new DeviceManager();

const App: React.FC = () => {

  const classes = useStyles();
  const idleTimer = React.createRef<typeof IdleTimer>();

  const defaultIdleTimerTimeout = 5 * 60 * 1000;
  const [idleTimerTimeout, setIdleTimerTimeout] = useState(defaultIdleTimerTimeout);
  const [idleTimerRemaining, setIdleTimerRemaining] = useState(0);

  const handlePresence = debounce(() => {

    // Emit event for being consumed by others
    document.dispatchEvent(new PresenceEvent('frontdoor'));

    // Enable backlight
    deviceManager.enableBacklight();

    // Go to doorcam
    history.push('/cctv/door');

    // Reset timer
    if (idleTimer.current) {
      idleTimer.current.reset();
    }
  }, 60 * 1000, { isImmediate: true });

  const handleWebSocketEvent = (ev: WebSocketClientEvent) => {
    if (ev.name === 'presence') {
      handlePresence();
    }
  }

  const handleTimerEvent = (ev: TimerEvent) => {
    setIdleTimerRemaining(ev.remaining);
    const remainingSecs = ev.remaining > 0 ? Math.round(ev.remaining / 1000) : 0
    if (remainingSecs % 60 === 0 && ev.remaining > (deviceManager.backlightIdleTimeout - 60000)) {
      // Enable or keep backlight enabled
      deviceManager.enableBacklight();
    }
  }

  const handleIdleEvent = (ev: IdleEvent) => {
    // Reset to default idle timer timeout (in case it has been increased by request)
    setIdleTimerTimeout(defaultIdleTimerTimeout);
  }

  const handleIncreaseTimer = (ev: IncreaseTimerEvent) => {
    // Increase idle timer timeout and reset to default if increased more than five times
    const newTimeout = ev.remaining + defaultIdleTimerTimeout;
    setIdleTimerTimeout(newTimeout > 3 * defaultIdleTimerTimeout ? defaultIdleTimerTimeout : newTimeout);
  }

  return (
    <Router history={history}>
      <WebSocketClient
        url='ws://nodered.home/ws/doormon'
        onEvent={handleWebSocketEvent}
      />
      <IdleTimer ref={idleTimer} timeout={idleTimerTimeout} redirectTo="/" onTimer={handleTimerEvent} onIdle={handleIdleEvent}>
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
          <Timer
            remaining={idleTimerRemaining}
            onIncreaseTimer={handleIncreaseTimer}
            classes={{
              root: classes.timer
            }}
          />
        </div>
      </IdleTimer>
    </Router>
  );
}

export default App;
