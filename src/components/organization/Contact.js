import React from 'react';
import {
  Typography,
  Box,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import TextField from '../question/CachedInput';

import Locale from '../Locale';
import Translation from './organizationLocale';
import { makeStyles } from '@material-ui/styles';

import globalStyles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  textInternalMsg: {
    fontSize: '12px',
    letterSpacing: '0.4px',
    lineHeight: '1rem',
    color: 'rgba(0, 0, 0, 0.6)',
    marginTop: '0.5rem'
  },
  grid1: {
    background: 'red'
  }
}));

export default ({
  method,
  contact,
  internalMsg,
  open,
  editable,
  handleOpen,
  handleEdit
}) => {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const contactMethods = [
    { id: 1, method: 'SMS' },
    { id: 2, method: 'Phone' },
    { id: 3, method: 'Email' }
  ];

  const icon = editable ? <ExpandMoreIcon /> : null;

  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    handleOpen(isExpanded);
  };

  const handleMethodChange = event => {
    handleEdit({ method: event.target.value });
  };

  const handleContactChange = contact => {
    handleEdit({ contact });
  };

  const handleInternalMsgChange = internalMsg => {
    handleEdit({ internalMsg });
  };

  return (
    <Box className={classes.wrapper}>
      <ExpansionPanel
        className={globalClasses.expansionPanel}
        expanded={editable ? open : false}
        onChange={handleExpandedChange}
      >
        <ExpansionPanelSummary
          className={globalClasses.expansionPanelPaddingReset}
          expandIcon={icon}
        >
          <Box className={globalClasses.summaryWrapper}>
            <Typography className={globalClasses.textCapitalizedSmall}>
              {method}
            </Typography>
            <Typography className={globalClasses.textEmphasis}>
              {contact}
            </Typography>
            <Typography className={classes.textInternalMsg}>
              {internalMsg}
            </Typography>
          </Box>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails
          className={globalClasses.expansionPanelPaddingReset}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Grid
                container
                spacing={2}
                className={globalClasses.detailsWrapper}
              >
                <Grid item xs={4}>
                  <FormControl className={globalClasses.formControl}>
                    <InputLabel id="contact-select-method-label">
                      Method
                    </InputLabel>
                    <Select
                      labelid="contact-select-method-label"
                      value={method}
                      onChange={handleMethodChange}
                    >
                      {contactMethods.map((x, i) => (
                        <MenuItem key={i} value={x.method}>
                          {x.method}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={8}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label="Contact"
                      value={contact}
                      onChange={handleContactChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label="Internal Message"
                      multiline
                      rows="4"
                      variant="outlined"
                      defaultValue={internalMsg}
                      onChange={handleInternalMsgChange}
                    />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Grid container>
              <Grid item xs={12}>
                <Tooltip title={l('removeText')}>
                  <IconButton></IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
