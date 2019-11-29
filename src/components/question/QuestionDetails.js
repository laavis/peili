import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Locale from '../Locale';
import TextField from '../CachedInput';
import { QuestionChooseMultiple } from './type/QuestionChooseMultiple';
import { QuestionChooseOne } from './type/QuestionChooseOne';
import Translation from './questionLocale.json';
import { QuestionRouteTable } from './QuestionRouteTable';
import { QuestionScore } from './QuestionScore';
import { QuestionText } from './QuestionText';
import {
  getDefaultRoute,
  handleSurveyQuestionUpdate,
  listPossibleRoutes
} from './QuestionUtil';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  box: {
    width: '100%'
  },
  section: {
    marginBottom: theme.spacing(3)
  },
  input: {
    width: '100%',
    flex: 1
  },
  menu: {
    width: 200
  },
  details: {
    paddingTop: '0 !important',
    paddingBottom: '0 !important'
  },
  routeSection: {
    marginBottom: theme.spacing(3)
  },
  routeSectionInput: {
    width: '100%',
    maxWidth: 518
  },
  subtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(1.5)
  },
  divider: {
    padding: 0,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    height: 0,
    backgroundColor: theme.palette.divider,
    border: 'none'
  },
  inputMenu: {
    maxWidth: 500
  },
  inputMenuItem: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

export const QuestionDetails = ({ index, survey, question, setSurvey }) => {
  const classes = useStyles();

  let defaultRoute = getDefaultRoute(survey.questions, index);
  if (defaultRoute && defaultRoute !== 'end') defaultRoute = defaultRoute.id;

  const questionTypes = l('questionsType');

  let content = null;
  switch (question.type) {
    case 'selectOne':
      content = (
        <QuestionChooseOne
          index={index}
          survey={survey}
          question={question}
          setSurvey={setSurvey}
        />
      );
      break;
    case 'selectMultiple':
      content = (
        <QuestionChooseMultiple
          index={index}
          survey={survey}
          question={question}
          setSurvey={setSurvey}
        />
      );
      break;
    case 'text':
      content = (
        <QuestionText index={index} survey={survey} setSurvey={setSurvey} />
      );
      break;
    default:
      break;
  }

  const handleTitleUpdate = title => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        title
      })
    );
  };

  const handleRouteUpdate = route => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        defaultRoute: route
      })
    );
  };

  return (
    <Box className={classes.box}>
      {/* Details */}
      <Box className={classes.section}>
        {/*
        <Typography variant="h6">{l('questionDetailsText')}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {l('questionDetailsInfo')}
        </Typography>
        */}

        <Grid container spacing={4}>
          <Grid item md={8} sm={12} xs={12} className={classes.details}>
            <TextField
              variant="outlined"
              className={classes.input}
              label={l('questionDetailsTitleLabel')}
              value={question.title}
              margin="normal"
              onChange={handleTitleUpdate}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12} className={classes.details}>
            <TextField
              variant="outlined"
              select
              label={l('questionDetailsTypeLabel')}
              className={classes.input}
              value={question.type}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={l('questionDetailsTypeInfo')}
              margin="normal"
              disabled
            >
              <MenuItem key={question.type} value={question.type}>
                {questionTypes[question.type]}
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <hr className={classes.divider} />

      {/* Options */}
      <Box className={classes.section}>{content}</Box>

      <hr className={classes.divider} />

      {/* Routing */}
      <Box className={classes.section}>
        <Typography variant="h6">{l('questionRouteText')}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {l('questionRouteInfo')}
        </Typography>

        {/* TODO: Figure out if this is nessesary... */}
        {false && (
          <Box className={classes.routeSection}>
            <TextField
              select
              label="Default Next Question"
              className={classes.routeSectionInput}
              value={defaultRoute}
              onChange={handleRouteUpdate}
              SelectProps={{
                MenuProps: {
                  className: classes.inputMenu
                }
              }}
              helperText="Next question for options without custom route rules"
              margin="normal"
              variant="outlined"
            >
              {listPossibleRoutes(survey.questions, index).map(x => (
                <MenuItem
                  className={classes.inputMenuItem}
                  key={x.id}
                  value={x.id}
                >
                  {x.index + 1}. {x.title}
                </MenuItem>
              ))}

              <MenuItem key="end" value="end">
                End Survey
              </MenuItem>
            </TextField>
          </Box>
        )}

        <QuestionRouteTable index={index} survey={survey} question={question} />
      </Box>

      {/* Scoring */}
      <Box className={classes.section}>
        <Typography variant="h6">{l('questionScoreText')}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {l('questionScoreInfo')}
        </Typography>

        <QuestionScore
          index={index}
          survey={survey}
          question={question}
          setSurvey={setSurvey}
        />
      </Box>
    </Box>
  );
};
