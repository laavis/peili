/**
 * @file Renders and manages the functionality of the "Choose One" question options.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import React from 'react';
import TextField from '../../CachedInput';
import { openDialog } from '../../ConfirmationDialog';
import Locale from '../../Locale';
import { QuestionOptionRoute } from '../QuestionOptionRoute';
import {
  handleSurveyOptionCreate,
  handleSurveyOptionRemove,
  handleSurveyOptionReorder,
  handleSurveyOptionUpdate
} from '../QuestionUtil';
import Translation from '../questionLocale.json';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(3)
  },
  badge: {
    position: 'absolute',
    display: 'block',
    top: 0,
    right: -6,
    width: 12,
    height: 12,
    borderRadius: '50%',
    backgroundColor: '#CD5B5B'
  },
  dialog: {
    width: 600
  },
  option: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    marginTop: 8,
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`
  },
  optionContainer: {
    display: 'flex',
    flex: 1,
    padding: theme.spacing(2),
    maxWidth: 500
  },
  optionMain: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
    marginLeft: theme.spacing(2)
  },
  optionAdvanced: {
    display: 'flex'
  },
  optionSecondary: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(0)
  },
  optionInput: {
    flex: 1,
    marginLeft: 0,
    marginTop: 0
  },
  optionInputSecondary: {
    flex: 1,
    overflow: 'hidden',
    marginLeft: 0,
    marginTop: theme.spacing(2)
  },
  optionInputMenu: {
    maxWidth: 500
  },
  optionInputMenuItem: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  optionInputScore: {
    marginLeft: 0,
    marginRight: theme.spacing(3),
    marginTop: theme.spacing(2),
    width: 100
  },
  optionIconLabel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -4
  },
  optionIconLabelIcon: {
    marginRight: theme.spacing(0.75)
  },
  optionButton: {
    marginTop: theme.spacing(1)
  },
  optionMove: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(1),
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  optionRemove: {
    bottom: theme.spacing(1)
  },
  subtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(2)
  }
}));

export const QuestionChooseOne = ({ index, survey, question, setSurvey }) => {
  const classes = useStyles();

  const handleNameUpdate = option => name => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, option, {
        name
      })
    );
  };

  const handleOtherUpdate = option => event => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, option, {
        isOther: event.target.checked
      })
    );
  };

  const handleScoreUpdate = option => score => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, option, {
        score
      })
    );
  };

  const handleRouteUpdate = option => route => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, option, {
        route
      })
    );
  };

  const handleOptionCreate = () => {
    setSurvey(handleSurveyOptionCreate(survey, index, question.type));
  };

  const handleOptionReorder = (option, direction) => () => {
    if (direction !== -1 && direction !== 1) return;
    if (option === 0 && direction === 1) return;
    if (option === question.options.length - 1 && direction === -1) return;

    setSurvey(
      handleSurveyOptionReorder(survey, index, option, option - direction)
    );
  };

  const handleOptionRemove = option => async () => {
    const action = await openDialog({
      title: 'Remove Option?',
      description: 'This action cannot be undone, are you sure?'
    });

    if (action === 'confirm') {
      setSurvey(handleSurveyOptionRemove(survey, index, option));
    }
  };

  return (
    <Box className={classes.section}>
      <Typography variant="h6">{l('questionOptionsText')}</Typography>
      <Typography variant="body2" className={classes.subtitle}>
        {l('questionOptionsInfo')}
      </Typography>

      {question.options.map((x, i) => (
        <Box key={x.id} className={classes.option}>
          <Box className={classes.optionContainer}>
            <RadioButtonUncheckedIcon />
            <Box className={classes.optionMain}>
              <TextField
                className={classes.optionInput}
                margin="dense"
                label={l('questionOptionNameLabel')}
                InputLabelProps={{
                  shrink: true
                }}
                value={x.name}
                onChange={handleNameUpdate(i)}
              />

              <Box className={classes.optionAdvanced}>
                <TextField
                  className={classes.optionInputScore}
                  margin="dense"
                  type="number"
                  label={
                    <span className={classes.optionIconLabel}>
                      <SpellcheckIcon
                        style={{ color: '#56B47C' }}
                        className={classes.optionIconLabelIcon}
                      />{' '}
                      {l('questionOptionScoreLabel')}
                    </span>
                  }
                  InputLabelProps={{
                    shrink: true
                  }}
                  InputProps={{
                    style: {
                      marginTop: 19
                    }
                  }}
                  value={x.score}
                  onChange={handleScoreUpdate(i)}
                />

                <QuestionOptionRoute
                  survey={survey}
                  index={index}
                  value={x.route}
                  onChange={handleRouteUpdate(i)}
                  className={classes.optionInputSecondary}
                />
              </Box>
              <Box className={classes.optionSecondary}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={x.isOther}
                      onChange={handleOtherUpdate(i)}
                      value="checkedB"
                      color="primary"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      Allow Explanation
                      <Typography variant="caption" display="block">
                        Show an optional text field when this option is picked
                      </Typography>
                    </Typography>
                  }
                />
              </Box>
            </Box>
          </Box>
          <Box className={classes.optionMove}>
            <Tooltip title="Move Up" placement="right">
              <IconButton
                aria-label="move up"
                onClick={handleOptionReorder(i, 1)}
              >
                <KeyboardArrowUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Tooltip title="Move Down" placement="right">
              <IconButton
                aria-label="move down"
                onClick={handleOptionReorder(i, -1)}
              >
                <KeyboardArrowDownIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Box style={{ flex: 1 }} />
            <Tooltip title="Remove" placement="right">
              <IconButton
                aria-label="remove"
                className={classes.optionRemove}
                onClick={handleOptionRemove(i)}
                size="small"
              >
                <DeleteIcon fontSize="inherit" />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      ))}

      <Box style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.optionButton}
          startIcon={<AddIcon />}
          onClick={handleOptionCreate}
        >
          {l('questionOptionAddText')}
        </Button>
      </Box>
    </Box>
  );
};
