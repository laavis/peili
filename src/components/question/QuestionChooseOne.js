import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from './CachedInput';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import React from 'react';

import {
  listPossibleRoutes,
  getDefaultRouteNumber,
  handleSurveyOptionUpdate
} from './QuestionUtil';

import { QuestionOptionRoute } from './QuestionOptionRoute';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

import Translation from './questionLocale.json';
import Locale from './Locale';

const l = Locale(Translation, 'fi');

const typeTitle = {
  chooseOne: 'Choose One',
  chooseMultiple: 'Choose Multiple'
};

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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(1),
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  subtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(2)
  }
}));

export const QuestionChooseOne = ({ index, survey, setSurvey }) => {
  const classes = useStyles();

  const question = survey.questions[index];

  const defaultNextQuestionNumber = getDefaultRouteNumber(
    survey.questions,
    index
  );

  const possibleRoutes = listPossibleRoutes(survey.questions, index);

  const handleNameUpdate = option => name => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, option, {
        name
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

  return (
    <Box className={classes.section}>
      <Typography variant="h6">{l('questionOptionsText')}</Typography>
      <Typography variant="body2" className={classes.subtitle}>
        {l('questionOptionsInfo')}
      </Typography>

      {question.options.map((x, i) => (
        <Box key={i} className={classes.option}>
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
            </Box>
          </Box>
          <Box className={classes.optionMove}>
            <KeyboardArrowUpIcon />
            <KeyboardArrowDownIcon />
          </Box>
          {/*
          <Box>
            <Button
              color="primary"
              size="small"
              className={classes.optionButton}
              startIcon={<SpellcheckIcon />}
              onClick={handleOpen}
            >
              Score
              <span className={classes.badge} />
            </Button>
            <Button
              color="primary"
              size="small"
              className={classes.optionButton}
              startIcon={<CallSplitIcon />}
              onClick={handleOpen}
            >
              Route
            </Button>
          </Box>
          */}
        </Box>
      ))}

      <Box style={{ display: 'flex', flexDirection: 'row-reverse' }}>
        <Button
          variant="contained"
          color="primary"
          className={classes.optionButton}
          startIcon={<AddIcon />}
        >
          {l('questionOptionAddText')}
        </Button>
      </Box>
    </Box>
  );
};
