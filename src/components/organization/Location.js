import React from 'react';
import { ExpansionPanelDetails, ExpansionPanelSummary, Menu } from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';

// data
import countries from '../../data/countries';
import cities from '../../data/cities';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  city: {
    fontSize: '0.625rem', // 10px
    fontWeight: 600,
    letterSpacing: '1.5px',
    lineHeight: 2
  },
  address: {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    letterSpacing: '0.15px',
    lineHeight: 1
  },
  formControl: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column'
  },
  selectFormCtrl: {
    width: '100%'
  }
}));

export const Location = ({ city, address, editable }) => {
  const classes = useStyles();

  // Editable
  const icon = editable ? <ExpandMoreIcon /> : null;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    setExpanded(isExpanded);
  };

  // Country select
  const [country, setCountry] = React.useState('');
  const handleCountryChange = event => {
    setCountry(event.target.value);
  };

  // City select
  const [cityValue, setCity] = React.useState('');
  const handleCityChange = event => {
    setCity(event.target.value);
  };

  return (
    <div className={classes.wrapper}>
      <ExpansionPanel expanded={editable ? expanded : false} onChange={handleExpandedChange}>
        <ExpansionPanelSummary expandIcon={icon} aria-controls='panel1bh-content' id='panel1bh-header'>
          <div className={classes.summary}>
            <Typography className={classes.city} variant='overline'>
              {city}
            </Typography>
            <Typography className={classes.address}>{address}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <FormControl className={classes.formControl}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className={classes.selectFormCtrl}>
                  <InputLabel id='location-select-country-label'>Country</InputLabel>
                  <Select
                    className={classes.select}
                    labelId='location-select-country-label'
                    value={country}
                    onChange={handleCountryChange}
                  >
                    {countries.map(x => (
                      <MenuItem value={x.code}>{x.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.selectFormCtrl}>
                  <InputLabel id='location-select-city-label'>City</InputLabel>
                  <Select
                    className={classes.select}
                    labelId='location-select-city-label'
                    value={cityValue}
                    onChange={handleCityChange}
                  >
                    {cities.map(x => (
                      <MenuItem value={x.code}>{x.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl>
              <TextField label='Address' margin='normal' />
            </FormControl>
            <Grid container>
              <Grid item xs={6}>
                <FormControl>
                  <TextField label='Postal Code' margin='normal' />
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
