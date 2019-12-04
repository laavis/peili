/**
 * @file The source picker for a score input. Lists all possible input sources and options. Used by {@link QuestionScoreDialog}.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import React from 'react';
import { HelpBox } from '../HelpBox';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import { createValue, parseScore } from './Score';

const l = Locale(Translation);

let setOpenState = null;
let currentSourceId = null;
let currentQuestionId = null;
let setContentState = null;
let setSectionState = null;
let setSourceState = null;
let setValueState = null;
let resolveDialog = null;
let isFirst = false;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 250
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

const openDialog = (id = null, questionId = null, first = false) =>
  new Promise(resolve => {
    setContentState(questionId ? [questionId] : []);
    setSectionState(null);
    setSourceState(null);
    setValueState(null);

    isFirst = first;
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
    setValue(!event.target.value ? null : Number(event.target.value));

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
  if (selectedSection === 'static' && value !== '' && value !== null) {
    isConfirmEnabled = true;
  }
  if (selectedSection === 'if') {
    isConfirmEnabled = true;
  }

  const handleClose = action => () => {
    if (action === 'confirm') {
      if (selectedSection === 'source' && selectedSource) {
        closeDialog(
          createValue({
            from: selectedSource.question,
            value: selectedSource.score
          })
        );
      } else if (selectedSection === 'static' && (value || value === 0)) {
        closeDialog(createValue({ value }));
      } else if (selectedSection === 'if') {
        closeDialog('if');
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

  const handleQuestionSourceSelect = (question, score) => () => {
    setSelectedSource(question ? { question, score } : null);

    if (question && selectedSection !== 'source') {
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
      <DialogTitle id="input-dialog-title">{l`questionScoreSourceTitle`}</DialogTitle>
      <DialogContent>
        <FormControlLabel
          value="if"
          control={
            <Radio
              checked={selectedSection === 'if'}
              onChange={handleRadioButtonToggle('if')}
            />
          }
          label={`Logic "If" statement`}
        />

        <FormControlLabel
          value="source"
          control={
            <Radio
              checked={selectedSection === 'source'}
              onChange={handleRadioButtonToggle('source')}
            />
          }
          label={l`questionScoreSourceDynamicRadio`}
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
              <Box key={`question-${question.id}`}>
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
                      onClick={handleQuestionSourceSelect(question.id, 'score')}
                    >
                      <ListItemIcon>
                        <StarRoundedIcon />
                      </ListItemIcon>
                      <ListItemText
                        id={`question-${question.id}-score-text`}
                        primary={l`questionScoreSourceDynamicDefaultTitle`}
                        secondary={l`questionScoreSourceDynamicDefaultDescription`}
                      />
                      <ListItemSecondaryAction>
                        <Checkbox
                          edge="start"
                          checked={
                            selectedSource !== null &&
                            selectedSource.question === question.id &&
                            selectedSource.score === 'score'
                          }
                          tabIndex={-1}
                          disableRipple
                          inputProps={{
                            'aria-labelledby': `question-${question.id}-score-text`
                          }}
                          onChange={handleQuestionSourceSelect(
                            question.id,
                            'score'
                          )}
                        />
                      </ListItemSecondaryAction>
                    </ListItem>

                    {question.score
                      .filter(
                        x =>
                          x[0].split('.')[1] !== 'score' &&
                          x[0].split('.')[1] !== currentSourceId
                      )
                      .map(parseScore)
                      .map(score => (
                        <ListItem
                          button
                          key={`${question.id}-${score.id}`}
                          onClick={handleQuestionSourceSelect(
                            question.id,
                            score.id
                          )}
                        >
                          <ListItemIcon>
                            <StarBorderRoundedIcon />
                          </ListItemIcon>
                          <ListItemText
                            id={`${question.id}-${score.id}-text`}
                            primary={score.name}
                            secondary={l`questionScoreSourceDynamicCustomDescription`}
                          />
                          <ListItemSecondaryAction>
                            <Checkbox
                              edge="start"
                              checked={
                                selectedSource !== null &&
                                selectedSource.question === question.id &&
                                selectedSource.score === score.id
                              }
                              tabIndex={-1}
                              disableRipple
                              onChange={handleQuestionSourceSelect(
                                question.id,
                                score.id
                              )}
                              inputProps={{
                                'aria-labelledby': `${question.id}-${score.id}-text`
                              }}
                            />
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                  </List>
                </Collapse>
              </Box>
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
          label={l`questionScoreSourceStaticRadio`}
        />

        <Box
          className={classes.sectionInput}
          style={{ opacity: selectedSection === 'source' ? 0.5 : 1 }}
        >
          <TextField
            autoFocus
            id="value"
            label={l`questionScoreSourceStaticLabel`}
            fullWidth
            value={value}
            onChange={handleValueChange}
            variant="outlined"
            type="number"
            autoComplete="false"
            inputProps={{
              autocompletetype: 'false'
            }}
          />
        </Box>

        {isFirst && <HelpBox>{l`questionScoreSourceHelp`}</HelpBox>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose('cancel')} color="primary">
          {l`dialogButtonCancel`}
        </Button>
        <Button
          onClick={handleClose('confirm')}
          variant="outlined"
          color="primary"
          disabled={!isConfirmEnabled}
        >
          {l`dialogButtonConfirm`}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionScoreInputDialog;
export { openDialog, closeDialog };
