import Box from '@material-ui/core/Box';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import { QuestionDetails } from './QuestionDetails';

const typeTitle = {
  chooseOne: 'Choose One',
  chooseMultiple: 'Choose Multiple'
};

export const Question = ({
  index,
  title,
  type,
  expanded,
  handleExpandChange
}) => {
  return (
    <ExpansionPanel expanded={expanded} onChange={handleExpandChange(index)}>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
      >
        <Box>
          <Typography variant="h6" display="block">
            {title}
          </Typography>
          <Typography variant="caption" display="block">
            {typeTitle[type]}
          </Typography>
        </Box>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <QuestionDetails type={type} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};
