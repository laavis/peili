import Box from '@material-ui/core/Box';
import uuid from 'uuid/v4';
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
import { Redirect } from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';
import { openDialog } from '../components/ConfirmationDialog';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import SubjectIcon from '@material-ui/icons/Subject';

import Translation from '../components/question/questionLocale.json';
import Locale from '../components/Locale';

import QuestionScoreInputDialog from '../components/question/QuestionScoreInputDialog';
import QuestionScoreDialog from '../components/question/QuestionScoreDialog';

import { HelpBox } from '../components/question/HelpBox';

const l = Locale(Translation);

let data = {
  title: '',
  description: '',
  intro: '',
  questions: []
};

const enabledQuestionTypes = {
  selectOne: <RadioButtonCheckedIcon fontSize="small" />,
  text: <SubjectIcon fontSize="small" />
};

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
  },
  developmentButton: {
    marginBottom: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  scoreHeader: {
    maxWidth: 'calc(100% - 70px)'
  },
  scoreTitle: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  scoreHelpBox: {
    marginTop: 0,
    marginBottom: theme.spacing(3)
  }
}));

export const SurveyEdit = ({ match, history }) => {
  const { id } = match.params;

  const classes = useStyles();

  const [survey, setSurvey] = React.useState({ ...data, id });
  const [expanded, setExpanded] = React.useState([]);
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);
  const [presetMenuAnchorEl, setPresetMenuAnchorEl] = React.useState(null);

  React.useEffect(() => {
    if (!id) return;

    const surveyData = JSON.parse(
      localStorage.getItem(`survey.${id}`) || 'null'
    );
    if (surveyData) {
      setSurvey(surveyData);
    }
  }, [id]);

  // Redirect to new survey ID if none is provided
  if (!id) {
    return <Redirect to={`/survey/${uuid()}`} />;
  }

  const handleChange = panel => (event, isExpanded) => {
    let expandedCache = [...expanded];
    if (expandedCache.includes(panel)) {
      if (!isExpanded) {
        expandedCache.splice(expandedCache.indexOf(expandedCache), 1);
      }
    } else {
      if (isExpanded) {
        expandedCache.push(panel);
      }
    }

    setExpanded([...expandedCache]);
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

  const handlePresetSave = () => {
    localStorage.setItem(`survey.${id}`, JSON.stringify(survey));
  };

  const handlePresetClear = async () => {
    const action = await openDialog({
      description:
        'This will remove the current survey from the local database. You can still continue to edit it and save it untill the window is refreshed.'
    });

    if (action === 'confirm') {
      localStorage.removeItem(`survey.${id}`);
    }
  };

  const handlePresetClearAll = async () => {
    const action = await openDialog({
      description:
        'This will remove ALL survey presets from the local database! This action cannot be undone. Are you absolutely sure?'
    });

    if (action === 'confirm') {
      for (const item in localStorage) {
        if (item && item.includes('survey.')) {
          localStorage.removeItem(item);
        }
      }
    }
  };

  const handlePresetMenuOpen = event => {
    setPresetMenuAnchorEl(event.currentTarget);
  };

  const handlePresetMenuClose = surveyId => () => {
    setPresetMenuAnchorEl(null);

    if (surveyId) {
      // Load saved survey from local storage
      history.push(`/survey/${surveyId}`);
    }
  };

  const surveyPresets = [];
  for (const item in localStorage) {
    if (item && item.includes('survey.')) {
      const survey = JSON.parse(localStorage.getItem(item) || 'null');
      if (!survey) continue;
      surveyPresets.push({
        id: survey.id,
        title: survey.title
      });
    }
  }

  const isFirstQuestion = !survey.questions.length;

  console.log('survey', survey);

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h3" className={classes.title}>
            {survey.title ? survey.title : l`infoText`}
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle}
          >
            {survey.questions.length} {l`infoQuestions`} – {l`infoStateDraft`}
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
                  expanded={expanded.includes(i)}
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
                  size="large"
                  onClick={handleQuestionCreate}
                >
                  {isFirstQuestion
                    ? l`questionCreateButtonFirst`
                    : l`questionCreateButton`}
                </Button>
              </Box>
            </Box>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Scoring & Grading
            </Typography>

            <Box>
              <ExpansionPanel
                expanded={expanded.includes('definedScores')}
                onChange={handleChange('definedScores')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box className={classes.scoreHeader}>
                    <Typography
                      variant="h6"
                      display="block"
                      className={classes.scoreTitle}
                    >
                      Defined Scores
                    </Typography>
                    <Typography variant="caption" display="block">
                      See all defined scores from all questions in this survey
                    </Typography>
                  </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Box>
                    <HelpBox className={classes.scoreHelpBox}>
                      The values from scores with the "Saved" checkbox ticked
                      will be saved to the system after a user completes this
                      survey. All other values will be lost. The unsaved score
                      values, however, can still be used while calculating other
                      score values.
                    </HelpBox>
                    <SurveyScoreTable survey={survey} />
                  </Box>
                </ExpansionPanelDetails>
              </ExpansionPanel>
              <ExpansionPanel
                expanded={expanded.includes('customScores')}
                onChange={handleChange('customScores')}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Box className={classes.scoreHeader}>
                    <Typography
                      variant="h6"
                      display="block"
                      className={classes.scoreTitle}
                    >
                      Custom Scores
                    </Typography>
                    <Typography variant="caption" display="block">
                      Combine scores from questions into new custom scores with
                      logical and mathematical statements.
                    </Typography>
                  </Box>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails></ExpansionPanelDetails>
              </ExpansionPanel>
            </Box>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Development
            </Typography>

            <Paper className={classes.sectionPaperScore}>
              <Button
                variant="contained"
                color="primary"
                className={classes.developmentButton}
                onClick={handlePresetSave}
              >
                Save to presets
              </Button>
              <Button
                variant="contained"
                color="primary"
                className={classes.developmentButton}
                onClick={handlePresetMenuOpen}
              >
                Load from presets
              </Button>
              <br />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.developmentButton}
                onClick={handlePresetClear}
              >
                Discard this survey
              </Button>
              <br />
              <Button
                variant="outlined"
                color="secondary"
                className={classes.developmentButton}
                onClick={handlePresetClearAll}
              >
                Clear survey presets
              </Button>
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

      <Menu
        id="question-preset-menu"
        anchorEl={presetMenuAnchorEl}
        keepMounted
        open={Boolean(presetMenuAnchorEl)}
        onClose={handlePresetMenuClose(null)}
      >
        {surveyPresets.map(x => (
          <MenuItem onClick={handlePresetMenuClose(x.id)} key={x}>
            <ListItemText
              primary={x.title || 'Untitled Survey'}
              secondary={x.id}
            />
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
