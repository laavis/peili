/**
 * @file Composition and functionality of adding custom keywords
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
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
  FormControl,
  TextField,
  Typography
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
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
    marginBottom: '0px'
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
    margin: 0
  },
  headerBox: {
    marginBottom: '1rem'
  }
}));

export default ({ changed }) => {
  const classes = useStyles();
  const globalClasses = globalStyles();
  const [editable, setEditable] = React.useState(false);
  const [keywords, setKeywords] = React.useState([]);

  React.useEffect(() => {
    const storedKeywords = JSON.parse(localStorage.getItem('keywords') || '[]');
    setKeywords(storedKeywords);
  }, [setKeywords]);

  const [text, setText] = React.useState('');

  const handleKeywordChange = e => setText(e.target.value);

  const handleAddKeyword = e => {
    if (text) {
      setKeywords([...keywords, text]);
      setText('');
    }
  };

  const keyPress = event => {
    if (event.keyCode === 13) {
      handleAddKeyword();
    }
  };

  const handleEditClick = () => {
    setEditable(true);
  };

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

  const summary = () => {
    return (
      <Box className={globalClasses.expansionPanelPaddingReset}>
        <Box className={!editable ? classes.headerBox : null}>
          <Typography className={globalClasses.textCapitalizedSmall}>
            {keywords.map(word => {
              return (
                <Chip
                  color="primary"
                  key={word.index}
                  label={word}
                  className={classes.chip}
                />
              );
            })}
          </Typography>
        </Box>
      </Box>
    );
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
            {!editable ? summary() : null}
            <Grid container spacing={2}>
              <Grid item xs={12} className={editable ? '' : globalClasses.hide}>
                <Box className={classes.addKeywordWrapper}>
                  <FormControl className={classes.formControl}>
                    <TextField
                      className={classes.textField}
                      placeholder={l('addKeywordLabelText')}
                      margin="normal"
                      variant="outlined"
                      value={text}
                      onKeyDown={keyPress}
                      onChange={handleKeywordChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">#</InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <Button
                    className={
                      editable
                        ? globalClasses.iconButtonAdd
                        : globalClasses.hide
                    }
                    color="primary"
                    onClick={handleAddKeyword}
                  >
                    <AddIcon />
                  </Button>
                </Box>
              </Grid>
              <Grid
                className={!editable ? globalClasses.hide : ''}
                item
                xs={12}
              >
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
          editable ? globalClasses.saveBtnContainer : globalClasses.hide
        }
      >
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
