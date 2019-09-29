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
import { Router, Link } from "react-router-dom";
import routes from './routes';
import { createBrowserHistory } from 'history';
import IdleTimer from './components/IdleTimer';
import BackButton from './components/BackButton';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
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

  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <IdleTimer redirectTo="/">
        <div className="App">
          <AppBar position="static" className={classes.appBar}>
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                {routes.render('title')}
              </Typography>
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
          {routes.render('main')}
        </div>
      </IdleTimer>
    </Router>
  );
}

export default App;
