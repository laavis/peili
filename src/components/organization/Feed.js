import {
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Tooltip,
  Typography
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import CustomTextField from '../CachedInput';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';
import styles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  identfierAddWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  editableContainer: {
    marginTop: '8px'
  },
  chipContainer: {
    paddingTop: '0px !important'
  },
  chip: {
    marginRight: '0.25rem'
  }
}));

export default ({
  type,
  username,
  identifiers,
  editable,
  handleEdit,
  handleRemove
}) => {
  const globalClasses = styles();
  const classes = useStyles();

  const setIcon = () => {
    switch (type) {
      case 'instagram':
        return <InstagramIcon color="primary" fontSize="small" />;
      case 'facebook':
        return <FacebookIcon color="primary" fontSize="small" />;
      case 'twitter':
        return <TwitterIcon color="primary" fontSize="small" />;
      default:
        return;
    }
  };

  const handleUsernameChange = username => {
    handleEdit({ username });
  };

  const keyPress = event => {
    if (event.keyCode === 13) {
      const identifiersCache = identifiers;
      identifiersCache.push(event.target.value);
      handleEdit({ identifiers });
    }
  };

  const handleIdentifierRemove = index => () => {
    identifiers.splice(index, 1);
    handleEdit({ identifiers });
  };

  const handleConfirmationDialog = async () => {
    const action = await openDialog({
      title: l('removeServiceConfirmationTitle'),
      description: l('confirmationWarning')
    });

    if (action === 'confirm') handleRemove();
  };

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <Card className={globalClasses.outerContainerPadding}>
        <CardContent className={globalClasses.expansionPanelPaddingReset}>
          <Typography
            style={{ display: 'flex' }}
            className={globalClasses.textEmphasis}
          >
            <span style={{ marginRight: '0.25rem' }}>{setIcon()}</span>
            {type}
          </Typography>
          <Grid
            container
            spacing={2}
            className={
              editable ? classes.editableContainer : globalClasses.hide
            }
          >
            <Grid item xs={4}>
              <CustomTextField
                value={username}
                variant="outlined"
                onChange={handleUsernameChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">@</InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <Box>
                <TextField
                  variant="outlined"
                  onKeyDown={keyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    )
                  }}
                />
                <IconButton aria-label="language" color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {identifiers.map((identifier, index) => {
                return (
                  <Chip
                    className={classes.chip}
                    label={'#' + identifier}
                    color="primary"
                    key={index}
                    onDelete={handleIdentifierRemove(index)}
                  />
                );
              })}
            </Grid>
          </Grid>
          <Grid
            container
            spacing={2}
            className={editable ? globalClasses.hide : ''}
          >
            <Grid item xs={12}>
              <Typography>{'@' + username}</Typography>
            </Grid>
            <Grid item xs={12} className={classes.chipContainer}>
              {identifiers.map((identifier, index) => {
                return (
                  <Chip
                    className={classes.chip}
                    styles={{ marginRight: '0.25rem' }}
                    label={'#' + identifier}
                    color="primary"
                    key={index}
                  />
                );
              })}
            </Grid>
          </Grid>
        </CardContent>
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
      </Card>
    </Box>
  );
};
