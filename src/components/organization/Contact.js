import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  FormControl,
  Grid,
  IconButton,
  Tooltip,
  Typography
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import HelpIcon from '@material-ui/icons/HelpOutline';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import TextField from '../CachedInput';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';
import globalStyles from './styles';

import { StyledExpansionPanelSummary } from './StyledExpansionPanelSummary';

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
  handleEdit,
  handleRemove
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
      <StyledExpansionPanelSummary
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
      </StyledExpansionPanelSummary>
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
