/**
 * @file Displays the logic that calculates a single score. Handles adding to and modifying that logic.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import {
  mdiCalculator,
  mdiCalculatorVariant,
  mdiCloseBox,
  mdiDivisionBox,
  mdiMinusBox,
  mdiPlusBox
} from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import * as inputDialog from './QuestionScoreInputDialog';
import {
  createConditional,
  createOperator,
  OPERATOR_TYPE,
  parseScore,
  SCORE_TYPE
} from './Score';

const l = Locale(Translation);

const mathIconList = {
  addition: mdiPlusBox,
  subtraction: mdiMinusBox,
  multiplication: mdiCloseBox,
  division: mdiDivisionBox
};

let setOpenState = null;
let currentScoreId = null;
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

const openDialog = (questionId = null, score) =>
  new Promise(resolve => {
    setContentState(score);
    const scoreStep = parseScore(score);
    currentScoreId = scoreStep.id;

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

  const scoreStep = parseScore(input);

  const handleMenuClick = (index = null) => event => {
    menuEditIndex = index;
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = action => async () => {
    setMenuAnchorEl(null);
    if (!action) return;

    if (menuEditIndex !== null) {
      const inputCache = [...input];
      inputCache[menuEditIndex] = createOperator(action);

      setInput([...inputCache]);
      return;
    }

    const inputCache = [...input, createOperator(action)];

    const value = await inputDialog.openDialog(
      currentScoreId,
      currentQuestionId,
      input.length <= 1
    );

    if (value) {
      if (value === 'if') {
        setInput([...inputCache, ...createConditional()]);
      } else {
        setInput([...inputCache, value]);
      }
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
    if (index === null && scoreStep.steps.length > 0) {
      return handleMenuClick(null)(event);
    }

    const value = await inputDialog.openDialog(
      currentScoreId,
      currentQuestionId,
      input.length <= 1
    );

    if (value) {
      let insertValue = [value];
      if (value === 'if') {
        insertValue = createConditional();
      }

      if (index === null) {
        setInput([...input, ...insertValue]);
      } else {
        const inputCache = [...input];
        inputCache.splice(index, 0, ...insertValue);
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
        <DialogTitle id="input-dialog-title">{l`questionScoreValueTitle`}</DialogTitle>
        <DialogContent>
          <DialogContentText id="input-dialog-description">
            <Typography variant="body2">
              {l`questionScoreValueDescription`}
            </Typography>
          </DialogContentText>

          {scoreStep.steps.length > 1 && (
            <ArrowDownwardIcon className={classes.helperArrow} />
          )}

          <List component="nav" aria-label="source">
            {scoreStep.steps.map((value, i) => {
              if (value.type === SCORE_TYPE.OPERATOR) {
                const text = mathOperatorTexts[value.sign];
                const icon = mathIconList[value.sign];

                return (
                  <ListItem button onClick={handleMenuClick(i + 1)} key={i}>
                    <ListItemIcon>
                      <Icon path={icon} size={1} className={classes.mdi} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                );
              }

              if (value.type === SCORE_TYPE.CONDITIONAL) {
                return value.step;
              }

              if (value.type === SCORE_TYPE.VALUE && value.from === null) {
                return (
                  <ListItem
                    button
                    onClick={handleAddSourceClick(i + 1)}
                    key={i}
                  >
                    <ListItemIcon>
                      <Icon
                        path={mdiCalculator}
                        size={1}
                        color="rgba(0, 0, 0, 0.54)"
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={value.value}
                      secondary={l`questionScoreValueStatic`}
                    />
                    <ListItemSecondaryAction>
                      <IconButton
                        edge="end"
                        aria-label="edit"
                        onClick={handleAddSourceClick(i + 1)}
                      >
                        <EditIcon />
                      </IconButton>
                      {i !== 0 && (
                        <IconButton
                          edge="end"
                          aria-label="remove"
                          onClick={handleRemove(i + 1)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              }

              if (
                value.type === SCORE_TYPE.VALUE &&
                value.from === 'placeholder'
              ) {
                return 'Placeholder';
              }

              const question = survey.questions.find(x => x.id === value.from);
              const score = parseScore(
                question.score.find(x => x[0].split('.')[1] === value.value)
              );

              return (
                <ListItem button onClick={handleAddSourceClick(i + 1)} key={i}>
                  <ListItemIcon>
                    {value.value === 'score' ? (
                      <StarRoundedIcon />
                    ) : (
                      <StarBorderRoundedIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      value.value === 'score'
                        ? l`questionScoreSourceDynamicDefaultTitle`
                        : score.name
                    }
                    secondary={`${question.index + 1}. ${question.title}`}
                  />

                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="edit"
                      onClick={handleAddSourceClick(i + 1)}
                    >
                      <EditIcon />
                    </IconButton>
                    {i !== 0 && (
                      <IconButton
                        edge="end"
                        aria-label="remove"
                        onClick={handleRemove(i + 1)}
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
                size={scoreStep.steps.length ? 'small' : 'large'}
                className={classes.button}
                startIcon={
                  scoreStep.steps.length ? (
                    <Icon path={mdiCalculatorVariant} size={1} color="#FFF" />
                  ) : (
                    <AddIcon />
                  )
                }
                onClick={handleAddSourceClick(null)}
              >
                {scoreStep.steps.length
                  ? l`questionScoreValueCreateButton`
                  : l`questionScoreValueCreateButtonFirst`}
              </Button>
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose('cancel')} color="primary">
            {l`dialogButtonCancel`}
          </Button>
          <Button
            onClick={handleClose('confirm')}
            variant="outlined"
            color="primary"
            autoFocus
          >
            {l`dialogButtonConfirm`}
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        id="operator-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose(null)}
        style={{ zIndex: 2000 }}
      >
        {Object.values(OPERATOR_TYPE).map(x => (
          <MenuItem onClick={handleMenuClose(x)} key={x}>
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
