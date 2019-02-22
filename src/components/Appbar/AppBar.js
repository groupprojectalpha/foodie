import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, withTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Logo from '../Logo.svg'
import './AppBar.css'
import firebase from 'firebase';
import {Link} from 'react-router-dom';
import LogoutIcon from '@material-ui/icons/ExitToApp'
import classNames from 'classnames'
// import SideDrawer from './SideDrawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  position: {
      position: 'relative'
  },
  AppBar: {
    background: 'black',
    opacity: .7
  }
});

function ButtonAppBar(props) {
  const { classes, toggleDrawer } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classNames(classes.AppBar)}>
        <Toolbar >
          <IconButton onClick={toggleDrawer} className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            BUDGET BUTLER
          </Typography>
          {/* <Button color="inherit"><img src={Logo} id='logo'/></Button> */}
          <Link to='/' style={{ textDecoration: 'none' }}>
          <Button color="inherit" onClick={() => firebase.auth().signOut()} style={{color: 'white'}}><LogoutIcon/></Button>
          </Link>
          {/* <SideDrawer/> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true })(ButtonAppBar);