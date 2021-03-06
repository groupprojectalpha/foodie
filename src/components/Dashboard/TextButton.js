import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import TextIcon from '@material-ui/icons/Textsms';
import UpdateIcon from '@material-ui/icons/Cached'


const styles = theme => ({
  button: {
    margin: 'none',
  },
  input: {
    display: 'none',
  },
});

function IconButtons(props) {
  const { classes } = props;
  return (
    <div>
        <IconButton onClick={props.toggle} className={classes.button} aria-label="Delete">
        <TextIcon />
      </IconButton>
      
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);