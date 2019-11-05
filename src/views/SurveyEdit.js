import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import MoreIcon from '@material-ui/icons/MoreVert';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { Question } from '../components/question/Question';
import { QuestionDetails } from '../components/question/QuestionDetails';

const useStyles = makeStyles(theme => ({
  root: {
    padding: 64
  },
  title: {
    marginLeft: 16,
    marginBottom: theme.spacing(1)
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
  sectionPaper: {
    padding: '0 16px 16px 16px'
  }
}));

export const SurveyEdit = () => {
  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h3" className={classes.title}>
            New Survey
          </Typography>
          <Typography
            variant="subtitle1"
            color="textSecondary"
            className={classes.subtitle}
          >
            2 Questions – Published
          </Typography>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Details
            </Typography>
            <Paper className={classes.sectionPaper}>
              <TextField
                className={classes.input}
                label="Title"
                margin="normal"
                variant="outlined"
              />
              <TextField
                className={classes.input}
                label="Description"
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                helperText="Shown to the user while browsing for surveys"
              />
            </Paper>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Intro
            </Typography>
            <Paper className={classes.sectionPaper}>
              <TextField
                className={classes.input}
                label="Text"
                multiline
                rows="4"
                margin="normal"
                variant="outlined"
                helperText="Shown to the user when starting the survey"
              />
            </Paper>
          </Box>

          <Box className={classes.section}>
            <Typography variant="h6" className={classes.sectionTitle}>
              Questions
            </Typography>

            <Box>
              <Question
                index={1}
                title="Question #1"
                type="Choose One"
                expanded={expanded === 1}
                handleExpandChange={handleChange}
              />
              <Question
                index={2}
                title="Question #2"
                type="Choose Multiple"
                expanded={expanded === 2}
                handleExpandChange={handleChange}
              />
            </Box>
          </Box>
        </Grid>
        <Grid item md={6} sm={12} xs={12}></Grid>
      </Grid>
    </div>
  );
};
