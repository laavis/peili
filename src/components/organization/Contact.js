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
import HelpIcon from '@material-ui/icons/HelpOutline';

import TextField from '../CachedInput';

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
  name,
  phone,
  email,
  description,
  internalMsg,
  open,
  editable,
  handleOpen,
  handleEdit
}) => {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const icon = editable ? <ExpandMoreIcon /> : null;

  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    handleOpen(isExpanded);
  };

  const handleNameChange = name => {
    handleEdit({ name });
  };

  const handlePhoneChange = phone => {
    handleEdit({ phone });
  };

  const handleEmailChange = email => {
    handleEdit({ email });
  };

  const handleDescriptionChange = description => {
    handleEdit({ description });
  };

  const handleInternalMsgChange = internalMsg => {
    handleEdit({ internalMsg });
  };

  const summary = () => {
    return (
      <ExpansionPanelSummary
        className={globalClasses.expansionPanelPaddingReset}
        expandIcon={icon}
      >
        <Box className={globalClasses.summaryWrapper}>
          <Typography className={globalClasses.textCapitalizedSmall}>
            {name}
          </Typography>
          <Typography className={globalClasses.textEmphasis}>
            {phone}
          </Typography>
          <Typography className={classes.textInternalMsg}>
            {internalMsg}
          </Typography>
        </Box>
      </ExpansionPanelSummary>
    );
  };

  return (
    <Box className={classes.wrapper}>
      <ExpansionPanel
        className={globalClasses.expansionPanel}
        expanded={editable ? open : false}
        onChange={handleExpandedChange}
      >
        {!editable ? summary() : null}

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
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('name')}
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('phone')}
                      value={phone}
                      onChange={handlePhoneChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('email')}
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('description')}
                      multiline
                      rows="4"
                      variant="outlined"
                      defaultValue={description}
                      onChange={handleDescriptionChange}
                    />
                    <Tooltip
                      title={l('contactDescriptionHelpText')}
                      className={globalClasses.infoTooltip}
                    >
                      <HelpIcon
                        color="primary"
                        className={globalClasses.helpIcon}
                      />
                    </Tooltip>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('internalMsg')}
                      multiline
                      rows="2"
                      variant="outlined"
                      defaultValue={internalMsg}
                      onChange={handleInternalMsgChange}
                    />
                    <Tooltip
                      title={l('contactInternalMsgHelperText')}
                      className={globalClasses.infoTooltip}
                    >
                      <HelpIcon
                        color="primary"
                        className={globalClasses.helpIcon}
                      />
                    </Tooltip>
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
