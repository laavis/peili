import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '../components/question/CachedInput';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Question } from '../components/question/Question';
import { handleSurveyQuestionCreate } from '../components/question/QuestionUtil';
import { SurveyScoreTable } from '../components/question/SurveyScoreTable';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import SubjectIcon from '@material-ui/icons/Subject';

import Translation from '../components/question/questionLocale.json';
import Locale from '../components/Locale';

import QuestionScoreInputDialog from '../components/question/QuestionScoreInputDialog';
import QuestionScoreDialog from '../components/question/QuestionScoreDialog';

import { HelpBox } from '../components/question/HelpBox';

const l = Locale(Translation);

let data = null;

(() => {
  data = {
    title: 'Test Survey',
    description: '',
    intro: '',
    questions: []
  };
})();

const enabledQuestionTypes = {
  selectOne: <RadioButtonCheckedIcon fontSize="small" />,
  text: <SubjectIcon fontSize="small" />
};

/*
const data = {
  title: 'Test Survey',
  description: '',
  intro: '',
  questions: [
    {
      id: 'q1',
      index: 0,
      title: 'Tupakoitko tai käytätkö nuuskaa?',
      type: 'selectOne',
      defaultRoute: null,
      options: [
        {
          name: 'En',
          score: 0,
          route: 'q3'
        },
        {
          name: 'Tupakoin (käytän nuuskaa) satunnaisesti',
          score: 1,
          route: null
        },
        {
          name: 'Tupakoin (käytän nuuskaa) päivittäin ',
          score: 2,
          route: null
        }
      ]
    },
    {
      id: 'q2',
      index: 1,
      title: 'Minkä ikäisenä aloitit tupakoinnin?',
      type: 'text',
      defaultRoute: null,
      options: [
        {
          name: 'Text',
          score: 0,
          route: null
        }
      ]
    },
    {
      id: 'q3',
      index: 2,
      title:
        'Oletko kokeillut tai käyttänyt päihteitä viimeisen vuoden aikana?',
      type: 'selectMultiple',
      defaultRoute: null,
      options: [
        {
          name: 'En',
          score: 0,
          route: null
        },
        {
          name:
            'Alkoholia (ei huomioida maistamista esim. lusikallisen verran)',
          score: 1,
          route: null
        },
        {
          name: 'Lääkkeitä, että saisin "pään sekaisin"',
          score: 4,
          route: null
        },
        {
          name: 'Liuotinaineita (imppaaminen)',
          score: 4,
          route: null
        },
        {
          name: 'Huumausaineita',
          score: 4,
          route: null,
          other: true
        },
        {
          name: 'Jotain muita päihteitä',
          score: 4,
          route: null,
          other: true
        },
        {
          name:
            'Alkoholia ja edellä mainittuja aineita samaan aikaan (sekakäyttö)',
          score: 4,
          route: null,
          other: true
        }
      ]
    }
  ]
};
*/

const useStyles = makeStyles(theme => ({
  root: {
    padding: 64
  },
  title: {
    width: '100%',
    marginLeft: 16,
    marginBottom: theme.spacing(1),
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  subtitle: {
    marginLeft: 16,
    marginBottom: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    width: '100%'
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  input: {
    width: '100%'
  },
  section: {
    marginBottom: 48
  },
  sectionTitle: {
    marginLeft: 16,
    marginBottom: 10
  },
  sectionSubtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(1.5)
  },
  sectionPaper: {
    padding: '0 16px 16px 16px'
  },
  sectionPaperScore: {
    padding: theme.spacing(3)
  },
  questionButton: {
    marginTop: theme.spacing(2)
  }
}));

export const SurveyEdit = () => {
  const classes = useStyles();

  const [survey, setSurvey] = React.useState(data);

  const [expanded, setExpanded] = React.useState(false);

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleTitleUpdate = title => {
    setSurvey({ ...survey, title });
  };

  const handleDescriptionUpdate = description => {
    setSurvey({ ...survey, description });
  };

  const handleIntroUpdate = intro => {
    setSurvey({ ...survey, intro });
  };

  const handleQuestionCreate = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleQuestionTypeClose = type => () => {
    setMenuAnchorEl(null);

    if (type) {
      setSurvey(handleSurveyQuestionCreate(survey, type));
    }
  };

  const isFirstQuestion = !survey.questions.length;

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h3" className={classes.title}>
            {survey.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle}
          >
            {survey.questions.length} {l('infoQuestions')} –{' '}
            {l('infoStatePublished')}
          </Typography>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              {l('detailsText')}
            </Typography>
            <Paper className={classes.sectionPaper}>
              <TextField
                className={classes.input}
                label={l('detailsTitleLabel')}
                margin="normal"
                variant="outlined"
                value={survey.title}
                onChange={handleTitleUpdate}
              />
              <TextField
                className={classes.input}
                label={l('detailsDescriptionLabel')}
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                helperText={l('detailsDescriptionInfo')}
                value={survey.description}
                onChange={handleDescriptionUpdate}
              />
            </Paper>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              {l('introText')}
            </Typography>
            <Paper className={classes.sectionPaper}>
              <TextField
                className={classes.input}
                label={l('introTextLabel')}
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                helperText={l('introTextInfo')}
                value={survey.intro}
                onChange={handleIntroUpdate}
              />
            </Paper>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              {l('questionsText')}
            </Typography>

            <Box>
              {survey.questions.map((x, i) => (
                <Question
                  key={x.id}
                  index={i}
                  survey={survey}
                  question={x}
                  setSurvey={setSurvey}
                  expanded={expanded === i}
                  handleExpandChange={handleChange}
                />
              ))}

              <Box
                style={{
                  display: 'flex',
                  flexDirection: isFirstQuestion ? 'row' : 'row-reverse'
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.questionButton}
                  startIcon={<AddIcon />}
                  size={isFirstQuestion ? 'large' : 'medium'}
                  onClick={handleQuestionCreate}
                >
                  {isFirstQuestion ? 'Add First Question' : 'Add Question'}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Scoring & Grading
            </Typography>

            <Paper className={classes.sectionPaperScore}>
              <Typography variant="h6">Defined Scores</Typography>
              <Typography variant="body2" className={classes.sectionSubtitle}>
                See all defined scores from all questions in this survey
              </Typography>

              <SurveyScoreTable survey={survey} />

              <HelpBox>
                The values from scores with the "Saved" checkbox ticked will be
                saved to the system after a user completes this survey. All
                other values will be lost. The unsaved score values, however,
                can still be used while calculating other score values.
              </HelpBox>

              <Typography variant="h6">Custom Scores</Typography>
              <Typography variant="body2" className={classes.sectionSubtitle}>
                Combine scores from questions into new custom scores with
                logical and mathematical statements.
              </Typography>
            </Paper>
          </Box>
        </Grid>
        <Grid item md={6} sm={12} xs={12}></Grid>
      </Grid>

      <QuestionScoreInputDialog survey={survey} />
      <QuestionScoreDialog survey={survey} />

      <Menu
        id="question-type-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleQuestionTypeClose(null)}
      >
        {Object.keys(enabledQuestionTypes).map(x => (
          <MenuItem onClick={handleQuestionTypeClose(x)} key={x}>
            <ListItemIcon>{enabledQuestionTypes[x]}</ListItemIcon>
            <Typography variant="inherit">{l`questionsType`[x]}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
