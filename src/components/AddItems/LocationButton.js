import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';
import LocationIcon from '@material-ui/icons/MyLocation';
import Zoom from 'react-reveal/Zoom';


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
        <Zoom>
        <IconButton onClick={props.onClick} className={classes.button} aria-label="Delete">
        <LocationIcon />
      </IconButton>
      </Zoom>
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);