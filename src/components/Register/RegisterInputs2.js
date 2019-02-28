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
    value: 'AL',
    label: 'Alabama - AL',
  },
  {
    value: 'AK',
    label: 'Alaska - AK',
  },
  {
    value: 'AZ',
    label: 'Arizona - AZ',
  },
  {
    value: 'AR',
    label: 'Arkansas - AR',
  },
  {
    value: 'CA',
    label: 'California - CA',
  },
  {
    value: 'CO',
    label: 'Colorado - CO',
  },
  {
    value: 'CT',
    label: 'Connecticut - CT',
  },
  {
    value: 'DE',
    label: 'Delaware - DE',
  },
  {
    value: 'FL',
    label: 'Florida - FL',
  },
  {
    value: 'GA',
    label: 'Georgia - GA',
  },
  {
    value: 'HI',
    label: '¥Hawaii - HI',
  },
  {
    value: 'ID',
    label: 'Idaho - ID',
  },
  {
    value: 'IL',
    label: 'Illinois - IL',
  },
  {
    value: 'IN',
    label: 'Indiana - IN',
  },
  {
    value: 'IA',
    label: 'Iowa - IA',
  },
  {
    value: 'KS',
    label: 'Kansas - KS',
  },
  {
    value: 'KY',
    label: 'Kentucky - KY',
  },
  {
    value: 'LA',
    label: 'Louisiana - LA',
  },
  {
    value: 'ME',
    label: 'Maine - ME',
  },
  {
    value: 'MD',
    label: 'Maryland - MD',
  },
  {
    value: 'MA',
    label: 'Massachusetts - MA',
  },
  {
    value: 'MI',
    label: 'Michigan - MI',
  },
  {
    value: 'MN',
    label: 'Minnesota - MN',
  },
  {
    value: 'MS',
    label: 'Mississippi - MS',
  },
  {
    value: 'MO',
    label: 'Missouri - MO',
  },
  {
    value: 'MT',
    label: 'Montana - MT',
  },
  {
    value: 'NE',
    label: 'Nebraska - NE',
  },
  {
    value: 'NV',
    label: 'Nevada - NV',
  },
  {
    value: 'NH',
    label: 'New Hampshire - NH',
  },
  {
    value: 'NJ',
    label: 'New Jersey - NJ',
  },
  {
    value: 'NM',
    label: 'New Mexico - NM',
  },
  {
    value: 'NY',
    label: 'New York - NY',
  },
  {
    value: 'NC',
    label: 'North Carolina - NC',
  },
  {
    value: 'ND',
    label: 'North Dakota - ND',
  },
  {
    value: 'OH',
    label: 'Ohio - OH',
  },
  {
    value: 'OK',
    label: 'Oklahoma - OK',
  },
  {
    value: 'OR',
    label: 'Oregon - OR',
  },
  {
    value: 'PA',
    label: 'Pennsylvania - PA',
  },
  {
    value: 'RI',
    label: 'Rhode Island - RI',
  },
  {
    value: 'SC',
    label: 'South Carolina - SC',
  },
  {
    value: 'SD',
    label: 'South Dakota - SD',
  },
  {
    value: 'TN',
    label: 'Tennessee - TN',
  },
  {
    value: 'TX',
    label: 'Texas - TX',
  },
  {
    value: 'UT',
    label: 'Utah - UT',
  },
  {
    value: 'VT',
    label: 'Vermont - VT',
  },
  {
    value: 'VA',
    label: 'Virginia - VA',
  },
  {
    value: 'WA',
    label: 'Washington - WA',
  },
  {
    value: 'WV',
    label: 'West Virginia - WV',
  },
  {
    value: 'WI',
    label: 'Wisconsin - WI',
  },
  {
    value: 'WY',
    label: 'Wyoming - WY',
  }
];

class TextFields extends React.Component {
  state = {
    selectedState: '',
    name: '',
    age: '',
    multiline: 'Controlled',
    currency: 'EUR',
  };

  handleChange = (name , value) => {
    this.setState({selectedState: value})
    this.props.handleUpdate(name , value);
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
          value={this.state.selectedState}
          onChange={e => this.handleChange("state" , e.target.value)}
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