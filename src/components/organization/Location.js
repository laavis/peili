import React from 'react';
import {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from '@material-ui/core';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Grid from '@material-ui/core/Grid';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import { openDialog } from '../ConfirmationDialog';

import globalStyles from './styles';

// data
import countries from '../../data/countries';
import cities from '../../data/cities';
import Locale from '../Locale';
import Translation from './organizationLocale';

// Handles translation
// usage: l('locationsHeader')
// translation json objects can be found in the organizationLocale.json
const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  expansionPanel: {
    padding: '0 1rem 0 1rem'
  },
  panelDetails: {
    justifyContent: 'space-between'
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    width: '80%',
    display: 'flex',
    flexDirection: 'column'
  },
  selectFormCtrl: {
    width: '100%'
  },
  removeIconButton: {
    width: 'fit-content',
    height: 'fit-content',
    alignSelf: 'flex-end'
  }
}));

export default ({
  city,
  country,
  address,
  postalCode,
  editable,
  open,
  handleOpen,
  handleEdit,
  handleRemove
}) => {
  const classes = useStyles();
  const globalClasses = globalStyles();

  // Editable
  const icon = editable ? <ExpandMoreIcon /> : null;

  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    handleOpen(isExpanded);
  };

  // Country select
  const handleCountryChange = event => {
    handleEdit({ country: event.target.value });
  };

  // City select
  const handleCityChange = event => {
    handleEdit({ city: event.target.value });
  };

  // Address
  const handleAddressChange = event => {
    handleEdit({ address: event.target.value });
  };

  const handlePostalCodeChange = event => {
    handleEdit({ postalCode: event.target.value });
  };

  // Opens the location remove confirmation panel
  const handleRemoveDialog = async () => {
    const action = await openDialog({
      title: l('removeLocationConfirmationTitle'),
      description: l('confirmationWarning')
    });

    if (action === 'confirm') {
      handleRemove();
    }
  };
  return (
    <div className={classes.wrapper}>
      <ExpansionPanel
        expanded={editable ? open : false}
        onChange={handleExpandedChange}
      >
        <ExpansionPanelSummary
          className={classes.expansionPanel}
          expandIcon={icon}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <div className={classes.summary}>
            <Typography className={globalClasses.textCapitalizedSmall}>
              {city}
            </Typography>
            <Typography className={globalClasses.textEmphasis}>
              {address}
            </Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.panelDetails}>
          <FormControl className={classes.formControl}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className={classes.selectFormCtrl}>
                  <InputLabel id="location-select-country-label">
                    {l('countrySelectLabel')}
                  </InputLabel>
                  <Select
                    className={classes.select}
                    labelid="location-select-country-label"
                    value={country}
                    onChange={handleCountryChange}
                  >
                    {countries.map(x => (
                      <MenuItem key={x.code} value={x.code}>
                        {x.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl className={classes.selectFormCtrl}>
                  <InputLabel id="location-select-city-label">
                    {l('citySelectLabel')}
                  </InputLabel>
                  <Select
                    className={classes.select}
                    labelid="location-select-city-label"
                    value={city}
                    onChange={handleCityChange}
                  >
                    {cities.map((x, i) => (
                      <MenuItem key={i} value={x.name}>
                        {x.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <FormControl>
              <TextField
                label={l('addressInputLabel')}
                margin="normal"
                value={address}
                onChange={handleAddressChange}
              />
            </FormControl>
            <Grid container>
              <Grid item xs={6}>
                <FormControl>
                  <TextField
                    label={l('postalCodeInputLabel')}
                    margin="normal"
                    value={postalCode}
                    onChange={handlePostalCodeChange}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </FormControl>
          <Tooltip title={l('removeText')}>
            <IconButton
              className={classes.removeIconButton}
              onClick={handleRemoveDialog}
              aria-label={l('removeText')}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
};
