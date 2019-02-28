import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    // flexBasis: 200,
    minWidth: 300
  },

});

const ranges = [
  {
    value: '0-20',
    label: '0 to 20',
  },
  {
    value: '21-50',
    label: '21 to 50',
  },
  {
    value: '51-100',
    label: '51 to 100',
  },
];

class OutlinedInputAdornments extends React.Component {
  state = {
    amount: '',
    password: '',
    weight: '',
    weightRange: null,
    showPassword: false,
  };

  handleChange = (prop , event) => {
    this.setState({ [prop]: event.target.value });
    
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;
    console.log(this.props)

    return (
      <div className={classes.root}>
       

        <TextField
          select
          className={classNames(classes.margin, classes.textField)}
          variant="outlined"
          label={this.props.storesList.length ? "Select Store" : "Click Target or Enter Zip Code"}
          // fullWidth
          autoWidth={true}
          onChange={(e) => {this.props.updateStore(e)
            this.handleChange('weightRange' , e)}}
          value={this.state.weightRange}
          
          // InputProps={{
          //   startAdornment: <InputAdornment position="start"></InputAdornment>,
          // }}
        >
          {this.props.storesList.map((option, i) => (
            <MenuItem key={i} value={i}>
              {option}
            </MenuItem>
          ))}
        </TextField>
        
        
      </div>
    );
  }
}

OutlinedInputAdornments.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OutlinedInputAdornments);