import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { QuestionDetails } from './QuestionDetails';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import { checkScoreStatus, checkRouteStatus } from './QuestionUtil';

import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import CallSplitIcon from '@material-ui/icons/CallSplit';

import Translation from './questionLocale.json';
import Locale from '../Locale';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  title: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  panel: {
    width: '100%'
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
  },
  list: {
    margin: 0,
    paddingLeft: 19,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: '0.8em',
    color: theme.palette.text.secondary
  },
  number: {
    position: 'absolute',
    left: -16,
    backgroundColor: theme.palette.primary.main,
    width: 32,
    height: 32,
    borderRadius: '50%',
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    textAlign: 'center',
    lineHeight: '32px',
    fontSize: 16,
    fontWeight: '600',
    color: '#fff'
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
  question,
  setSurvey,
  expanded,
  handleExpandChange
}) => {
  const classes = useStyles();

  const questionTypes = l('questionsType');

  return (
    <ExpansionPanel expanded={expanded} onChange={handleExpandChange(index)}>
      <StyledExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box className={classes.number}>{index + 1}</Box>
        <Box className={classes.panel}>
          <Box className={classes.header}>
            <Typography variant="h6" display="block" className={classes.title}>
              {question.title}
            </Typography>
            <Typography variant="caption" display="block">
              {questionTypes[question.type]}
            </Typography>

            <Box className={classes.statusIconContainer}>
              {checkScoreStatus(question) && (
                <SpellcheckIcon
                  style={{ fill: '#56B47C' }}
                  className={classes.statusIcon}
                />
              )}
              {checkRouteStatus(question) && (
                <CallSplitIcon
                  style={{ fill: '#CD5B5B' }}
                  className={classes.statusIcon}
                />
              )}
            </Box>
          </Box>
          {!expanded && question.type === 'selectOne' && (
            <Box>
              <ul className={classes.list}>
                {question.options.map(x => (
                  <li>{x.name}</li>
                ))}
              </ul>
            </Box>
          )}
        </Box>
      </StyledExpansionPanelSummary>
      <ExpansionPanelDetails>
        {expanded && (
          <QuestionDetails
            index={index}
            survey={survey}
            question={question}
            setSurvey={setSurvey}
          />
        )}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
