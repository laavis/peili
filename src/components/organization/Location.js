import React from 'react';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Tooltip,
  Typography
} from '@material-ui/core';
import TextField from '../CachedInput';

import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import cities from '../../data/cities';
// data
import countries from '../../data/countries';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';
import globalStyles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
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
  const handleAddressChange = address => {
    handleEdit({ address });
  };

  const handlePostalCodeChange = postalCode => {
    handleEdit({ postalCode });
  };

  // Opens the location remove confirmation panel
  const handleConfirmationDialog = async () => {
    const action = await openDialog({
      title: l('removeLocationConfirmationTitle'),
      description: l('confirmationWarning')
    });

    if (action === 'confirm') {
      handleRemove();
    }
  };

  const summary = () => {
    return (
      <ExpansionPanelSummary
        className={globalClasses.expansionPanelPaddingReset}
        expandIcon={icon}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box className={globalClasses.summaryWrapper}>
          <Typography className={globalClasses.textCapitalizedSmall}>
            {postalCode + ', ' + city}
          </Typography>
          <Typography className={globalClasses.textEmphasis}>
            {address}
          </Typography>
        </Box>
      </ExpansionPanelSummary>
    );
  };

  return (
    <Box className={classes.wrapper}>
      <ExpansionPanel
        expanded={editable ? open : false}
        className={globalClasses.expansionPanel}
        onChange={handleExpandedChange}
      >
        {!editable ? summary() : null}
        <ExpansionPanelDetails
          className={globalClasses.expansionPanelPaddingReset}
        >
          <FormControl className={classes.formControl}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl className={globalClasses.formControl}>
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
                <FormControl className={globalClasses.formControl}>
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
              className={
                editable ? globalClasses.removeIconButton2 : globalClasses.hide
              }
              onClick={handleConfirmationDialog}
              aria-label={l('removeText')}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Tooltip>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
