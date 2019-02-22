import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';



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
        <IconButton onClick={props.remove} className={classes.button} aria-label="Delete">
        <DeleteIcon />
      </IconButton>
      
    </div>
  );
}

IconButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IconButtons);