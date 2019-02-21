import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

const currencies = [
  {
    value: 'Alabama - AL',
    label: 'Alabama - AL',
  },
  {
    value: 'Alaska - AK',
    label: 'Alaska - AK',
  },
  {
    value: 'Arizona - AZ',
    label: 'Arizona - AZ',
  },
  {
    value: 'Arkansas - AR',
    label: 'Arkansas - AR',
  },
  {
    value: 'California - CA',
    label: 'California - CA',
  },
  {
    value: 'Colorado - CO',
    label: 'Colorado - CO',
  },
  {
    value: 'Connecticut - CT',
    label: 'Connecticut - CT',
  },
  {
    value: 'Delaware - DE',
    label: 'Delaware - DE',
  },
  {
    value: 'Florida - FL',
    label: 'Florida - FL',
  },
  {
    value: 'Georgia - GA',
    label: 'Georgia - GA',
  },
  {
    value: 'Hawaii - HI',
    label: '¥Hawaii - HI',
  },
  {
    value: 'Idaho - ID',
    label: 'Idaho - ID',
  },
  {
    value: 'Illinois - IL',
    label: 'Illinois - IL',
  },
  {
    value: 'Indiana - IN',
    label: 'Indiana - IN',
  },
  {
    value: 'Iowa - IA',
    label: 'Iowa - IA',
  },
  {
    value: 'Kansas - KS',
    label: 'Kansas - KS',
  },
  {
    value: 'Kentucky - KY',
    label: 'Kentucky - KY',
  },
  {
    value: 'Louisiana - LA',
    label: 'Louisiana - LA',
  },
  {
    value: 'Maine - ME',
    label: 'Maine - ME',
  },
  {
    value: 'Maryland - MD',
    label: 'Maryland - MD',
  },
  {
    value: 'Massachusetts - MA',
    label: 'Massachusetts - MA',
  },
  {
    value: 'Michigan - MI',
    label: 'Michigan - MI',
  },
  {
    value: 'Minnesota - MN',
    label: 'Minnesota - MN',
  },
  {
    value: 'Mississippi - MS',
    label: 'Mississippi - MS',
  },
  {
    value: 'Missouri - MO',
    label: 'Missouri - MO',
  },
  {
    value: 'Montana - MT',
    label: 'Montana - MT',
  },
  {
    value: 'Nebraska - NE',
    label: 'Nebraska - NE',
  },
  {
    value: 'Nevada - NV',
    label: 'Nevada - NV',
  },
  {
    value: 'New Hampshire - NH',
    label: 'New Hampshire - NH',
  },
  {
    value: 'New Jersey - NJ',
    label: 'New Jersey - NJ',
  },
  {
    value: 'New Mexico - NM',
    label: 'New Mexico - NM',
  },
  {
    value: 'New York - NY',
    label: 'New York - NY',
  },
  {
    value: 'North Carolina - NC',
    label: 'North Carolina - NC',
  },
  {
    value: 'North Dakota - ND',
    label: 'North Dakota - ND',
  },
  {
    value: 'Ohio - OH',
    label: 'Ohio - OH',
  },
  {
    value: 'Oklahoma - OK',
    label: 'Oklahoma - OK',
  },
  {
    value: 'Oregon - OR',
    label: 'Oregon - OR',
  },
  {
    value: 'Pennsylvania - PA',
    label: 'Pennsylvania - PA',
  },
  {
    value: 'Rhode Island - RI',
    label: 'Rhode Island - RI',
  },
  {
    value: 'South Carolina - SC',
    label: 'South Carolina - SC',
  },
  {
    value: 'South Dakota - SD',
    label: 'South Dakota - SD',
  },
  {
    value: 'Tennessee - TN',
    label: 'Tennessee - TN',
  },
  {
    value: 'Texas - TX',
    label: 'Texas - TX',
  },
  {
    value: 'Utah - UT',
    label: 'Utah - UT',
  },
  {
    value: 'Vermont - VT',
    label: 'Vermont - VT',
  },
  {
    value: 'Virginia - VA',
    label: 'Virginia - VA',
  },
  {
    value: 'Washington - WA',
    label: 'Washington - WA',
  },
  {
    value: 'West Virginia - WV',
    label: 'West Virginia - WV',
  },
  {
    value: 'Wisconsin - WI',
    label: 'Wisconsin - WI',
  },
  {
    value: 'Wyoming - WY',
    label: 'Wyoming - WY',
  }
];

class TextFields extends React.Component {
  state = {
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes } = this.props;

    return (
      <form className={classes.container} noValidate autoComplete="off">
     
      
        <TextField
          id="standard-select-currency"
          select
          label="Select your state"
          className={classes.textField}
          value={this.state.currency}
          onChange={this.handleChange('currency')}
          SelectProps={{
            MenuProps: {
              className: classes.menu,
            },
          }}
          
          margin="normal"
        >
          {currencies.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        
       
        
      </form>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);