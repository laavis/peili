import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { QuestionDetails } from './QuestionDetails';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { checkRouteStatus } from './QuestionUtil';

import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CallSplitIcon from '@material-ui/icons/CallSplit';

const typeTitle = {
  chooseOne: 'Choose One',
  chooseMultiple: 'Choose Multiple'
};

const useStyles = makeStyles(theme => ({
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  header: {
    maxWidth: 'calc(100% - 70px)'
  },
  statusIconContainer: {
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    height: '100%',
    top: 0,
    right: theme.spacing(8)
  },
  statusIcon: {
    padding: 3,
    marginLeft: theme.spacing(1),
    borderRadius: '50%',
    width: 20,
    height: 20
    // backgroundColor: '#eee'
    //fill: '#fff'
  }
}));

const StyledExpansionPanelSummary = withStyles({
  content: {
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
})(ExpansionPanelSummary);

export const Question = ({
  index,
  survey,
  setSurvey,
  expanded,
  handleExpandChange
}) => {
  const classes = useStyles();

  const question = survey.questions[index];

  return (
    <ExpansionPanel expanded={expanded} onChange={handleExpandChange(index)}>
      <StyledExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box className={classes.header}>
          <Typography variant="h6" display="block" className={classes.title}>
            {question.title}
          </Typography>
          <Typography variant="caption" display="block">
            {typeTitle[question.type]}
          </Typography>

          <Box className={classes.statusIconContainer}>
            <SpellcheckIcon
              style={{ fill: '#56B47C' }}
              className={classes.statusIcon}
            />
            {checkRouteStatus(question) && (
              <CallSplitIcon
                style={{ fill: '#CD5B5B' }}
                className={classes.statusIcon}
              />
            )}
          </Box>
        </Box>
      </StyledExpansionPanelSummary>
      <ExpansionPanelDetails>
        <QuestionDetails index={index} survey={survey} setSurvey={setSurvey} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
