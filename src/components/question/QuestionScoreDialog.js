import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import EditIcon from '@material-ui/icons/Edit';

import Icon from '@mdi/react';
import {
  mdiPlusBox,
  mdiMinusBox,
  mdiCloseBox,
  mdiDivisionBox,
  mdiCalculator,
  mdiCalculatorVariant
} from '@mdi/js';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import DeleteIcon from '@material-ui/icons/Delete';

import AddIcon from '@material-ui/icons/Add';
import InputIcon from '@material-ui/icons/Input';

import * as inputDialog from './QuestionScoreInputDialog';

import Translation from './questionLocale.json';
import Locale from '../Locale';

const l = Locale(Translation);

const mathIconList = {
  addition: mdiPlusBox,
  subtraction: mdiMinusBox,
  multiplication: mdiCloseBox,
  division: mdiDivisionBox
};

let setOpenState = null;
let currentSourceId = null;
let currentQuestionId = null;
let setContentState = null;
let resolveDialog = null;
let menuEditIndex = null;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300
  },
  listSection: {
    backgroundColor: 'inherit'
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0
  },
  mdi: {
    fill: theme.palette.primary.main
  },
  button: {
    marginLeft: 0
  },
  buttonItem: {
    display: 'flex',
    justifyContent: 'center',
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  helperArrow: {
    position: 'absolute',
    marginTop: theme.spacing(4.5),
    left: theme.spacing(1.5),
    width: 16,
    height: 16
  }
}));

const closeDialog = data => {
  setOpenState(false);
  if (resolveDialog) {
    resolveDialog(data);
    resolveDialog = null;
  }
};

const openDialog = (id = null, questionId = null, list = []) =>
  new Promise(resolve => {
    setContentState([...list]);
    currentSourceId = id;
    currentQuestionId = questionId;
    resolveDialog = resolve;
    setOpenState(true);
  });

const QuestionScoreDialog = ({ survey, index, question }) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const [input, setInput] = React.useState([]);

  setOpenState = setOpen;
  setContentState = setInput;

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const mathOperatorTexts = l('questionScoreOperatorText');

  const handleMenuClick = (index = null) => event => {
    menuEditIndex = index;
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = action => async () => {
    setMenuAnchorEl(null);
    if (!action) return;

    if (menuEditIndex !== null) {
      const inputCache = [...input];
      inputCache[menuEditIndex] = `operator.${action}`;

      setInput([...inputCache]);
      return;
    }

    const inputCache = [...input, `operator.${action}`];

    const value = await inputDialog.openDialog(
      currentSourceId,
      currentQuestionId
    );

    if (value) {
      setInput([...inputCache, value]);
    }
  };

  const handleClose = action => () => {
    if (action === 'confirm') {
      closeDialog([...input]);
    } else {
      closeDialog(null);
    }
  };

  const handleAddSourceClick = (index = null) => async event => {
    if (index === null && input.length > 0) {
      return handleMenuClick(null)(event);
    }

    const value = await inputDialog.openDialog(
      currentSourceId,
      currentQuestionId
    );
    if (value) {
      if (index === null) {
        setInput([...input, value]);
      } else {
        const inputCache = [...input];
        inputCache[index] = value;
        setInput([...inputCache]);
      }
    }
  };

  const handleRemove = index => () => {
    if (index <= 1) return;

    const inputCache = [...input];
    inputCache.splice(index - 1, 2);
    setInput([...inputCache]);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose('dismiss')}
        aria-labelledby="input-dialog-title"
        aria-describedby="input-dialog-description"
        maxWidth="xs"
        fullWidth
        fullHeight
      >
        <DialogTitle id="input-dialog-title">Score</DialogTitle>
        <DialogContent>
          <DialogContentText id="input-dialog-description">
            <Typography variant="body2">
              Select a value for this score. It can come from a single source,
              or multiple combined with mathematical operators.
            </Typography>
          </DialogContentText>

          {input.length > 1 && (
            <ArrowDownwardIcon className={classes.helperArrow} />
          )}

          <List component="nav" aria-label="main mailbox folders">
            {input.map((value, i) => {
              const parts = value.split('.');
              const type = parts[0];
              const primary = parts[1];
              const secondary = parts[2];

              if (type === 'operator') {
                const text = mathOperatorTexts[primary];
                const icon = mathIconList[primary];

                return (
                  <ListItem button onClick={handleMenuClick(i)}>
                    <ListItemIcon>
                      <Icon path={icon} size={1} className={classes.mdi} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                );
              }

              if (type === 'static') {
                return (
                  <ListItem button onClick={handleAddSourceClick(i)}>
                    <ListItemIcon>
                      <Icon
                        path={mdiCalculator}
                        size={1}
                        color="rgba(0, 0, 0, 0.54)"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={`${primary}.${secondary || 0}`}
                      secondary="Static value"
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={handleAddSourceClick(i)}
                      >
                        <EditIcon />
                      </IconButton>
                      {i !== 0 && (
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={handleRemove(i)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              }

              const question = survey.questions.find(x => x.id === primary);
              const score = question.source.find(x => x[0].id === secondary);

              return (
                <ListItem button onClick={handleAddSourceClick(i)}>
                  <ListItemIcon>
                    {secondary === 'score' ? (
                      <StarRoundedIcon />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={secondary === 'score' ? 'Score' : score[0].value}
                    secondary={`${question.index + 1}. ${question.title}`}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={handleAddSourceClick(i)}
                    >
                      <EditIcon />
                    </IconButton>
                    {i !== 0 && (
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={handleRemove(i)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}

            <ListItem className={classes.buttonItem}>
              <Button
                variant="contained"
                color="primary"
                size={input.length ? 'small' : 'large'}
                className={classes.button}
                startIcon={
                  input.length ? (
                    <Icon path={mdiCalculatorVariant} size={1} color="#FFF" />
                  ) : (
                    <AddIcon />
                  )
                }
                onClick={handleAddSourceClick(null)}
              >
                {input.length
                  ? 'Combine with another Source'
                  : 'Select First Source'}
              </Button>
            </ListItem>
          </List>
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

      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose(null)}
        style={{ zIndex: 2000 }}
      >
        {Object.keys(mathIconList).map(x => (
          <MenuItem onClick={handleMenuClose(x)}>
            <ListItemIcon>
              <Icon path={mathIconList[x]} size={1} className={classes.mdi} />
            </ListItemIcon>
            {mathOperatorTexts[x]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default QuestionScoreDialog;
export { openDialog, closeDialog };
