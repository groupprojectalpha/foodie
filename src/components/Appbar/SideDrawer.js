import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AppBar from './AppBar'
import AccountCircle from '@material-ui/icons/AccountCircle'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import Dashboard from '@material-ui/icons/Dashboard'
import ShoppingCart from '@material-ui/icons/ShoppingCart'
import SettingsIcon from '@material-ui/icons/Settings'
import Axios from 'axios';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  logout(){
    Axios.delete('/auth/logout')
  }

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
            
          {['Profile'].map((text, index) => (
              <Link to='/profile' style={{ textDecoration: 'none' }}>
            <ListItem button key={text} >
              <ListItemIcon>{ <AccountCircle />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
            ))}

            {['Dashboard'].map((text, index) => (
              <Link to='/dashboard' style={{ textDecoration: 'none' }}>
            <ListItem button key={text} >
              <ListItemIcon>{ <Dashboard />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
            ))}

            {['Add Items'].map((text, index) => (
              <Link to='/add' style={{ textDecoration: 'none' }}>
            <ListItem button key={text} >
              <ListItemIcon>{ <ShoppingCart />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
            ))}
          
        </List>
        <Divider />
        <List>
         {['Settings'].map((text, index) => (
              <Link to='/register' style={{ textDecoration: 'none' }}>
            <ListItem button key={text} >
              <ListItemIcon>{ <SettingsIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
            ))}
             
             {['Logout'].map((text, index) => (
              <Link to='/' style={{ textDecoration: 'none' }}>
            <ListItem button key={text} onClick={()=>this.logout()}>
              <ListItemIcon>{ <LogoutIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
            </Link>
            ))}
        </List>
      </div>
    );

    const fullList = (
      <div className={classes.fullList}>
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <div>
          <AppBar toggleDrawer={this.toggleDrawer('left', true)}></AppBar>
      
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}
          onOpen={this.toggleDrawer('top', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >
            {fullList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
          onOpen={this.toggleDrawer('bottom', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >
            {fullList}
          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);