// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import React from 'react';
import {
  Typography,
  Box,
  ExpansionPanel,
  ExpansionPanelDetails
} from '@material-ui/core';
import { StyledExpansionPanelSummary } from './StyledExpansionPanelSummary';
// styles
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';

import GenderCriteria from './GenderCriteria';
import AgeCriteria from './AgeCriteria';

const useStyles = makeStyles(theme => ({
  todo: {
    flexDirection: 'column'
  },
  wrapper: {
    width: '60%'
  },
  summary: {
    width: '60%'
  }
}));

export default ({ name, criteria, editable }) => {
  const classes = useStyles();
  const globalClasses = styles();

  const [ageValue, setAgeValue] = React.useState([18, 30]);

  const setAgeValues = (min, max) => {
    const requirementsCache = criteria;
    const ageIndex = requirementsCache.findIndex(x => x.type === 'age');
    if (ageIndex < 0) {
      requirementsCache.push({ type: 'age', min, max });
    } else {
      requirementsCache[ageIndex].min = min;
      requirementsCache[ageIndex].max = max;
    }
  };

  const handleAgeChange = (event, newValue) => {
    setAgeValue(newValue);
    setAgeValues(newValue[0], newValue[1]);
  };

  const handleType = () => {
    if (name === 'gender') {
      return <GenderCriteria value="" handleGenderChange={null} />;
    } else if (name === 'age') {
      return <AgeCriteria value={ageValue} handleAgeChange={handleAgeChange} />;
    }
  };

  const summary = () => {
    return (
      <StyledExpansionPanelSummary
        className={globalClasses.expansionPanelPaddingReset}
      >
        <Box className={classes.summary}>
          {name === 'age' ? (
            <Typography className={globalClasses.textEmphasis}>ikä</Typography>
          ) : null}
        </Box>
      </StyledExpansionPanelSummary>
    );
  };

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel className={globalClasses.expansionPanel}>
        {!editable ? summary() : null}
        <ExpansionPanelDetails
          className={globalClasses.expansionPanelPaddingReset}
        >
          <Box className={classes.wrapper}>{handleType()}</Box>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
