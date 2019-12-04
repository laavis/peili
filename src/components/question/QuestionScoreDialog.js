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
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
  mdiPlusBox,
  mdiCodeGreaterThan,
  mdiCodeLessThan,
  mdiCodeGreaterThanOrEqual,
  mdiCodeLessThanOrEqual,
  mdiEqualBox,
  mdiCircle,
  mdiCircleOutline
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
  SCORE_TYPE,
  COMPARATOR_TYPE,
  createComparator
} from './Score';

const l = Locale(Translation);

const mathIconList = {
  addition: mdiPlusBox,
  subtraction: mdiMinusBox,
  multiplication: mdiCloseBox,
  division: mdiDivisionBox
};

const comparatorIconList = {
  1: mdiCodeGreaterThan,
  2: mdiCodeLessThan,
  3: mdiCodeGreaterThanOrEqual,
  4: mdiCodeLessThanOrEqual,
  5: mdiEqualBox,
  6: mdiCircle,
  7: mdiCircleOutline
};

let setOpenState = null;
let currentScoreId = null;
let currentQuestionId = null;
let setContentState = null;
let resolveDialog = null;
let menuEditIndex = null;
let menuEditReplace = true;

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
  },
  if: {
    borderLeft: `3px solid ${theme.palette.primary.main}`
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
  const theme = useTheme();

  setOpenState = setOpen;
  setContentState = setInput;

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [comparatorMenuAnchorEl, setComparatorMenuAnchorEl] = React.useState(
    null
  );

  const mathOperatorTexts = l('questionScoreOperatorText');
  const comparatorTexts = l('questionScoreComparatorText');

  const scoreStep = parseScore(input);

  let depthLevel = 0;
  let lastStep = null;

  const handleMenuClick = (index = null, replace = true) => event => {
    menuEditIndex = index;
    menuEditReplace = replace;
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = action => async () => {
    setMenuAnchorEl(null);
    if (!action) return;

    if (menuEditIndex !== null && menuEditReplace) {
      const inputCache = [...input];
      inputCache[menuEditIndex] = createOperator(action);

      setInput([...inputCache]);
      return;
    }

    const value = await inputDialog.openDialog(
      currentScoreId,
      currentQuestionId,
      input.length <= 1
    );

    if (value) {
      const inputCombiner = createOperator(action);
      const inputValue =
        value === 'if'
          ? [inputCombiner, ...createConditional()]
          : [inputCombiner, value];

      if (menuEditIndex !== null) {
        const inputCache = [...input];
        inputCache.splice(menuEditIndex + 1, 0, ...inputValue);
        setInput([...inputCache]);
      } else {
        setInput([...input, inputCombiner, value]);
      }
    }
  };

  const handleComparatorMenuClick = (index = null, replace = true) => event => {
    menuEditIndex = index;
    menuEditReplace = replace;
    setComparatorMenuAnchorEl(event.currentTarget);
  };

  const handleComparatorMenuClose = action => async () => {
    setComparatorMenuAnchorEl(null);

    if (!action) return;

    if (menuEditIndex !== null && menuEditReplace) {
      const inputCache = [...input];
      inputCache[menuEditIndex] = createComparator(action);

      setInput([...inputCache]);
      return;
    }

    const value = await inputDialog.openDialog(
      currentScoreId,
      currentQuestionId,
      input.length <= 1
    );

    if (value) {
      const inputComparator = createComparator(action);
      const inputValue =
        value === 'if'
          ? [inputComparator, ...createConditional()]
          : [inputComparator, value];

      if (menuEditIndex !== null) {
        const inputCache = [...input];
        inputCache.splice(menuEditIndex + 1, 0, ...inputValue);
        setInput([...inputCache]);
      } else {
        setInput([...input, inputComparator, value]);
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
        inputCache.splice(index, 1, ...insertValue);
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

  const renderInlineButtons = (i, depthStyle, comparator = false) => (
    <ListItem button key={i} className={classes.if} style={depthStyle}>
      <ListItemText>
        {comparator && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleComparatorMenuClick(i + 1, false)}
            startIcon={
              <Icon
                path={mdiCodeGreaterThanOrEqual}
                size={1}
                color={theme.palette.primary.main}
              />
            }
          >
            Compare
          </Button>
        )}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleMenuClick(i + 1, false)}
          style={{ marginLeft: comparator ? theme.spacing(1) : 0 }}
          startIcon={
            <Icon
              path={mdiCalculatorVariant}
              size={1}
              color={theme.palette.primary.main}
            />
          }
        >
          Combine
        </Button>
      </ListItemText>
    </ListItem>
  );

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
              // Calculating if start statement depth
              if (
                value.type === SCORE_TYPE.CONDITIONAL &&
                value.step === 'if'
              ) {
                depthLevel++;
              }

              // Styling based on depth
              let depthColor =
                depthLevel % 2 === 0
                  ? theme.palette.secondary.main
                  : theme.palette.primary.main;
              let depthStyle = {
                marginLeft: Math.max(0, depthLevel - 1) * 16,
                borderLeft: `3px solid ${depthColor}`
              };
              if (depthLevel === 0) depthStyle = null;

              const isInsideIfCondition = depthLevel > 0 && lastStep === 'if';
              const isInsideIfOutput =
                depthLevel > 0 &&
                (lastStep === 'then' || lastStep === 'else') &&
                value.type !== SCORE_TYPE.CONDITIONAL;
              const isLastInsideIfCondition =
                isInsideIfCondition &&
                scoreStep.steps[i + 1].type === SCORE_TYPE.CONDITIONAL &&
                scoreStep.steps[i + 1].step === 'then';
              const isLastInsideIfOutput =
                isInsideIfOutput &&
                scoreStep.steps[i + 1].type === SCORE_TYPE.CONDITIONAL &&
                (scoreStep.steps[i + 1].step === 'else' ||
                  scoreStep.steps[i + 1].step === 'end');

              const isPermanent =
                (isInsideIfCondition &&
                  scoreStep.steps[i - 1].type === SCORE_TYPE.CONDITIONAL &&
                  scoreStep.steps[i - 1].step === 'if') ||
                (isInsideIfOutput &&
                  scoreStep.steps[i - 1].type === SCORE_TYPE.CONDITIONAL);

              // Calculating if end statement depth
              if (
                value.type === SCORE_TYPE.CONDITIONAL &&
                value.step === 'end'
              ) {
                depthLevel--;
              }

              if (value.type === SCORE_TYPE.CONDITIONAL) {
                lastStep = value.step;

                depthStyle.backgroundColor = depthColor;
              }

              if (value.type === SCORE_TYPE.OPERATOR) {
                const text = mathOperatorTexts[value.sign];
                const icon = mathIconList[value.sign];

                return (
                  <ListItem
                    button
                    onClick={handleMenuClick(i + 1)}
                    key={i}
                    style={depthStyle}
                  >
                    <ListItemIcon>
                      <Icon path={icon} size={1} className={classes.mdi} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                );
              }

              if (value.type === SCORE_TYPE.COMPARATOR) {
                const text = comparatorTexts[value.compare];
                const icon = comparatorIconList[value.compare];

                return (
                  <ListItem
                    button
                    onClick={handleMenuClick(i + 1)}
                    key={i}
                    style={depthStyle}
                  >
                    <ListItemIcon>
                      <Icon path={icon} size={1} className={classes.mdi} />
                    </ListItemIcon>
                    <ListItemText>{text}</ListItemText>
                  </ListItem>
                );
              }

              if (value.type === SCORE_TYPE.CONDITIONAL) {
                return (
                  <ListItem
                    button
                    onClick={handleMenuClick(i + 1)}
                    key={i}
                    className={classes.if}
                    style={depthStyle}
                  >
                    <ListItemText>{value.step}</ListItemText>
                  </ListItem>
                );
              }

              if (
                value.type === SCORE_TYPE.VALUE &&
                value.from === null &&
                value.value === null
              ) {
                return (
                  <ListItem
                    button
                    onClick={handleAddSourceClick(i + 1)}
                    key={i}
                    className={classes.if}
                    style={depthStyle}
                  >
                    <ListItemText>
                      <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<AddIcon />}
                      >
                        Pick Value
                      </Button>
                    </ListItemText>
                  </ListItem>
                );
              }

              if (value.type === SCORE_TYPE.VALUE && value.from === null) {
                return (
                  <>
                    <ListItem
                      button
                      onClick={handleAddSourceClick(i + 1)}
                      key={i}
                      style={depthStyle}
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
                        {i !== 0 && !isPermanent && (
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
                    {isLastInsideIfCondition &&
                      renderInlineButtons(i, depthStyle, true)}
                    {isLastInsideIfOutput && renderInlineButtons(i, depthStyle)}
                  </>
                );
              }

              const question = survey.questions.find(x => x.id === value.from);
              const score = parseScore(
                question.score.find(x => x[0].split('.')[1] === value.value)
              );

              return (
                <>
                  <ListItem
                    button
                    onClick={handleAddSourceClick(i + 1)}
                    key={i}
                    style={depthStyle}
                  >
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
                      {i !== 0 && !isPermanent && (
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
                  {isLastInsideIfCondition &&
                    renderInlineButtons(i, depthStyle, true)}
                  {isLastInsideIfOutput && renderInlineButtons(i, depthStyle)}
                </>
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

      <Menu
        id="comparator-menu"
        anchorEl={comparatorMenuAnchorEl}
        keepMounted
        open={Boolean(comparatorMenuAnchorEl)}
        onClose={handleComparatorMenuClose(null)}
        style={{ zIndex: 2000 }}
      >
        {Object.values(COMPARATOR_TYPE).map(x => (
          <MenuItem onClick={handleComparatorMenuClose(x)} key={x}>
            <ListItemIcon>
              <Icon
                path={comparatorIconList[x]}
                size={1}
                className={classes.mdi}
              />
            </ListItemIcon>
            {comparatorTexts[x]}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default QuestionScoreDialog;
export { openDialog, closeDialog };
