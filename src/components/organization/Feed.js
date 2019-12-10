/**
 * @file Functionality of single social media feed. Editing username and adding hashtags
 * @author Sara Suviranta <sara.suviranta@metropolia.fi>
 */

import {
  Box,
  Button,
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
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import CustomTextField from '../CachedInput';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';
import globalStyles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  identifierAddWrapper: {
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
  hashtags,
  editable,
  handleEdit,
  handleRemove
}) => {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const [hashtag, setHashtag] = React.useState('');

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

  const handleHashtagChange = e => setHashtag(e.target.value);

  const handleAddHashtag = e => {
    if (hashtag) {
      hashtags.push(hashtag);
      setHashtag('');
    }
  };

  const keyPress = event => {
    if (event.keyCode === 13) {
      const hashtagsCache = hashtags;
      hashtagsCache.push(event.target.value);
      handleEdit({ hashtags });
      event.target.value = '';
    }
  };

  const handleIdentifierRemove = index => () => {
    hashtags.splice(index, 1);
    handleEdit({ hashtags });
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
                  value={hashtag}
                  onChange={handleHashtagChange}
                  onKeyDown={keyPress}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">#</InputAdornment>
                    )
                  }}
                />
                <Button
                  className={
                    editable ? globalClasses.iconButtonAdd : globalClasses.hide
                  }
                  color="primary"
                  onClick={handleAddHashtag}
                >
                  <AddIcon />
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12}>
              {hashtags.map((identifier, index) => {
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
              {hashtags.map((identifier, index) => {
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
