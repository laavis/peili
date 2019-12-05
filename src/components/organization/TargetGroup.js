// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import React from 'react';
import { Typography, Box, ExpansionPanel } from '@material-ui/core';
import { StyledExpansionPanelSummary } from './StyledExpansionPanelSummary';
// styles
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  todo: {}
}));

export default ({ name, criteria, editable }) => {
  const classes = useStyles();
  const globalClasses = styles();

  const enabledTargetGroups = {
    age: 'age',
    gender: 'gender'
  };

  const summary = () => {
    return (
      <StyledExpansionPanelSummary
        className={globalClasses.expansionPanelPaddingReset}
      >
        <Box className={globalClasses.summaryWrapper}>
          <Typography className={globalClasses.textEmphasis}></Typography>
        </Box>
      </StyledExpansionPanelSummary>
    );
  };

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel>
        <Typography className={globalClasses.textEmphasis}>{name}</Typography>

        <Box className={classes.todo} />
      </ExpansionPanel>
    </Box>
  );
};
