import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from './CachedInput';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import SubjectIcon from '@material-ui/icons/Subject';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
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
import Locale from '../Locale';

const l = Locale(Translation);

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
  optionTitle: {
    marginTop: -5,
    marginBottom: theme.spacing(1.5)
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
  subtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(2)
  }
}));

export const QuestionText = ({ index, survey, setSurvey }) => {
  const classes = useStyles();

  const question = survey.questions[index];
  const option = question.options[0];

  const questionTypes = l('questionsType');

  const handleAllowEmptyUpdate = event => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, 0, {
        allowAmpty: !!event.target.checked,
        route: !event.target.checked ? null : option.route
      })
    );
  };

  const handleRouteUpdate = route => {
    setSurvey(
      handleSurveyOptionUpdate(survey, index, 0, {
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

      <Box className={classes.option}>
        <Box className={classes.optionContainer}>
          <SubjectIcon />
          <Box className={classes.optionMain}>
            <Typography variant="h6" className={classes.optionTitle}>
              {questionTypes[question.type]}
            </Typography>

            <FormControlLabel
              control={
                <Checkbox
                  checked={option.allowAmpty}
                  onChange={handleAllowEmptyUpdate}
                  value={true}
                />
              }
              label={l('questionOptionAllowEmptyLabel')}
            />

            {!!option.allowAmpty && (
              <Box className={classes.optionAdvanced}>
                <QuestionOptionRoute
                  survey={survey}
                  index={index}
                  value={option.route}
                  onChange={handleRouteUpdate}
                  className={classes.optionInputSecondary}
                  helperText={l('questionOptionEmptyRouteInfo')}
                />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
