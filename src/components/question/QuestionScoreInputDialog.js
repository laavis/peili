import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import Box from '@material-ui/core/Box';

import Radio from '@material-ui/core/Radio';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';

let setOpenState = null;
let currentSourceId = null;
let currentQuestionId = null;
let setContentState = null;
let setSectionState = null;
let setSourceState = null;
let setValueState = null;
let resolveDialog = null;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    height: 250
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  header: {
    marginTop: theme.spacing(2)
  },
  section: {
    paddingLeft: theme.spacing(2)
  },
  sectionInput: {
    marginTop: theme.spacing(1),
    paddingLeft: theme.spacing(3.9)
  }
}));

const closeDialog = action => {
  setOpenState(false);

  if (action === 'cancel' || action === 'dismiss') {
    resolveDialog(null);
    resolveDialog = null;
    return;
  }

  if (resolveDialog) {
    resolveDialog(action);
    resolveDialog = null;
  }
};

const openDialog = (id = null, questionId = null) =>
  new Promise(resolve => {
    setContentState(questionId ? [questionId] : []);
    setSectionState(null);
    setSourceState(null);
    setValueState(null);

    currentSourceId = id;
    currentQuestionId = questionId;
    resolveDialog = resolve;

    setOpenState(true);
  });

const QuestionScoreInputDialog = ({ survey }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openList, setOpenList] = React.useState([]);
  const [selectedSection, setSelectedSection] = React.useState(null);
  const [selectedSource, setSelectedSource] = React.useState(null);

  const [value, setValue] = React.useState(null);

  const handleValueChange = event => {
    setValue(Number(event.target.value));

    if (selectedSection !== 'static') {
      setSelectedSection('static');
      setSelectedSource(null);
    }
  };

  setOpenState = setOpen;
  setContentState = setOpenList;
  setSectionState = setSelectedSection;
  setSourceState = setSelectedSource;
  setValueState = setValue;

  let isConfirmEnabled = false;
  if (selectedSection === 'source' && selectedSource) {
    isConfirmEnabled = true;
  }
  if (selectedSection === 'static' && value) {
    isConfirmEnabled = true;
  }

  const handleClose = action => () => {
    if (action === 'confirm') {
      if (selectedSection === 'source' && selectedSource) {
        closeDialog(selectedSource);
      } else if (selectedSection === 'static' && value) {
        closeDialog(`static.${value}`);
      } else {
        closeDialog('cancel');
      }
    } else {
      closeDialog(action);
    }
  };

  const toggleListOpen = question => () => {
    const list = [...openList];
    const index = list.indexOf(question.id);
    if (index >= 0) {
      list.splice(index, 1);
    } else {
      list.push(question.id);
    }

    setOpenList(list);
  };

  const handleRadioButtonToggle = section => event => {
    if (event.target.checked) setSelectedSection(section);

    if (event.target.checked && section === 'static') {
      setSelectedSource(null);
    }
  };

  const handleSourceSelect = source => () => {
    setSelectedSource(source);

    if (source && selectedSection !== 'source') {
      setSelectedSection('source');
    }
  };

  let questionList = [...survey.questions];
  if (currentQuestionId)
    questionList = questionList.filter(x => x.id === currentQuestionId);

  return (
    <Dialog
      open={open}
      onClose={handleClose(null)}
      aria-labelledby="input-dialog-title"
      aria-describedby="input-dialog-description"
      maxWidth="xs"
      fullWidth
      fullHeight
    >
      <DialogTitle id="input-dialog-title">Select Source</DialogTitle>
      <DialogContent>
        <FormControlLabel
          value="source"
          control={
            <Radio
              checked={selectedSection === 'source'}
              onChange={handleRadioButtonToggle('source')}
            />
          }
          label="Select from existing sources"
        />

        <Box
          className={classes.section}
          style={{ opacity: selectedSection === 'static' ? 0.5 : 1 }}
        >
          <List className={classes.root} subheader={<li />}>
            {/*
          <li key={`question-section`} className={classes.listSection}>
            <ul className={classes.ul}>
              <ListSubheader>Questions</ListSubheader>
          */}

            {questionList.map(question => (
              <>
                <ListItem
                  button
                  onClick={toggleListOpen(question)}
                  key={`question-${question.id}`}
                >
                  <ListItemText
                    disableTypography
                    primary={
                      <Typography
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                        noWrap
                      >
                        {question.index + 1}. {question.title}
                      </Typography>
                    }
                  />
                  {openList.includes(question.id) ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )}
                </ListItem>
                <Collapse
                  in={openList.includes(question.id)}
                  timeout="auto"
                  unmountOnExit
                  key={`question-${question.id}-collapse`}
                >
                  <List component="div" disablePadding>
                    <ListItem
                      button
                      key={`question-${question.id}-score`}
                      role={undefined}
                      onClick={handleSourceSelect(
                        `question.${question.id}.score`
                      )}
                    >
                      <ListItemIcon>
                        <StarRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        id={`question-${question.id}-score-text`}
                        primary="Answer Score"
                        secondary="Default score from answers"
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="start"
                          checked={
                            selectedSource === `question.${question.id}.score`
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            'aria-labelledby': `question-${question.id}-score-text`
                          }}
                          onChange={handleSourceSelect(
                            `question.${question.id}.score`
                          )}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    {question.source
                      .filter(
                        x =>
                          x[0].type === 'set' &&
                          !x[0].locked &&
                          x[0].id !== currentSourceId
                      )
                      .map(source => (
                        <ListItem
                          button
                          key={`question-${question.id}-${source[0].id}`}
                          onClick={handleSourceSelect(
                            `question.${question.id}.${source[0].id}`
                          )}
                        >
                          <ListItemIcon>
                            <StarBorderRoundedIcon />
                          </ListItemIcon>
                          <ListItemText
                            id={`question-${question.id}-${source[0].id}-text`}
                            primary={source[0].value}
                            secondary="Custom Score"
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="start"
                              checked={
                                selectedSource ===
                                `question.${question.id}.${source[0].id}`
                              }
                              tabIndex={-1}
                              disableRipple
                              onChange={handleSourceSelect(
                                `question.${question.id}.${source[0].id}`
                              )}
                              inputProps={{
                                'aria-labelledby': `question-${question.id}-${source[0].id}-text`
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </>
            ))}
            {/*
            </ul>
          </li>
              */}
          </List>
        </Box>

        <FormControlLabel
          value="static"
          control={
            <Radio
              checked={selectedSection === 'static'}
              onChange={handleRadioButtonToggle('static')}
            />
          }
          label="Use a static value"
        />

        <Box
          className={classes.sectionInput}
          style={{ opacity: selectedSection === 'source' ? 0.5 : 1 }}
        >
          <TextField
            autoFocus
            id="value"
            label="Numeric Value"
            fullWidth
            value={value}
            onChange={handleValueChange}
            variant="outlined"
            type="number"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose('cancel')} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClose('confirm')}
          variant="outlined"
          color="primary"
          disabled={!isConfirmEnabled}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionScoreInputDialog;
export { openDialog, closeDialog };
