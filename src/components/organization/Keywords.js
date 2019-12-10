// Card for adding custom keywords, kinda like hashtags

// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import React from 'react';
import Locale from '../Locale';
import Translation from './organizationLocale';
import globalStyles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  summary: {
    display: 'flex',
    flexDirection: 'row'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  selectFormCtrl: {
    margin: theme.spacing(1),
    width: '45%'
  },
  buttonAdd: {
    marginLeft: theme.spacing(2)
  },
  chip: {
    margin: theme.spacing(0.5)
  },
  addKeywordWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  textField: {
    marginTop: 0
  }
}));

export default ({ changed }) => {
  const classes = useStyles();
  const globalClasses = globalStyles();
  const [editable, setEditable] = React.useState(false);
  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    // get keywords (or empty array if there are no keywords) from local storage
    const storedKeywords = JSON.parse(localStorage.getItem('keywords') || '[]');
    // display retrieved keywords on the screen
    setKeywords(storedKeywords);
  }, [setKeywords]);

  const keyPress = event => {
    if (event.keyCode === 13) {
      if (event.target.value !== '') {
        let tag = event.target.value;
        setKeywords([...keywords, tag]);
        event.target.value = '';
      } else {
        console.log('A keyword is required');
      }
    }
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  // Handle chip deletion
  const handleDelete = chipToDelete => () => {
    let newKeywords = [...keywords];
    const chipIndex = newKeywords.findIndex(
      newKeywords => newKeywords === chipToDelete
    );
    newKeywords.splice(chipIndex, 1);
    setKeywords(newKeywords);
  };

  const handleSaveClick = () => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
    setEditable(false);
  };

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('keywordHeader')}
          <span
            className={changed ? globalClasses.unsavedChangesIcon : ''}
          ></span>
        </Typography>
        <IconButton
          onClick={handleEditClick}
          className={globalClasses.editSectionButton}
          aria-label="language"
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </Box>
      <Box className={globalClasses.expansionPanelContainer}>
        <Card className={globalClasses.outerContainerPadding}>
          <CardContent className={globalClasses.expansionPanelPaddingReset}>
            <Grid container spacing={2}>
              <Grid item xs={12} className={editable ? '' : globalClasses.hide}>
                <Box className={classes.addKeywordWrapper}>
                  <TextField
                    className={classes.textField}
                    placeholder={l('addKeywordLabelText')}
                    margin="normal"
                    variant="outlined"
                    onKeyDown={keyPress}
                  />
                </Box>
              </Grid>
              <Grid item xs={12}>
                {keywords.map(word => {
                  return (
                    <Chip
                      color="primary"
                      key={word.index}
                      label={word}
                      onDelete={handleDelete(word)}
                      className={classes.chip}
                    />
                  );
                })}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
      <Box
        className={
          editable ? globalClasses.sectionButtonsContainer : globalClasses.hide
        }
      >
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
