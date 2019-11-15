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
let resolveDialog = null;
let data = { title: 'Unknown', description: 'An error occurred.' };

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
    setContentState([]);
    currentSourceId = id;
    currentQuestionId = questionId;
    resolveDialog = resolve;
    setOpenState(true);
  });

const QuestionScoreInputDialog = ({ survey }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [openList, setOpenList] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleValueChange = event => {
    setValue(Number(event.target.value));
  };

  setOpenState = setOpen;
  setContentState = setOpenList;

  const handleClose = action => () => {
    if (action === 'confirm') {
      closeDialog(`static.${value}`);
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
        <DialogContentText id="input-dialog-description">
          <Typography variant="body2" color="primary">
            Select a source to pull data from
          </Typography>
        </DialogContentText>

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
                <ListItemText primary={question.title} />
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
                    onClick={handleClose(`question.${question.id}.score`)}
                  >
                    <ListItemIcon>
                      <StarRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Score" />
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
                        onClick={handleClose(
                          `question.${question.id}.${source[0].id}`
                        )}
                      >
                        <ListItemIcon>
                          <StarBorderRoundedIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={source[0].value}
                          secondary="Custom Variable"
                        />
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

        <Typography variant="body2" color="primary" className={classes.header}>
          or enter a static value
        </Typography>

        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Static Value"
          fullWidth
          value={value}
          onChange={handleValueChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose('cancel')} color="primary">
          Cancel
        </Button>
        <Button
          onClick={handleClose('confirm')}
          variant="outlined"
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default QuestionScoreInputDialog;
export { openDialog, closeDialog };
