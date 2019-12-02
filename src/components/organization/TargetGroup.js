// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

import React from 'react';
import { Typography, Box, ExpansionPanel } from '@material-ui/core';

// styles
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  todo: {}
}));

export default ({ targetGroupType, editable }) => {
  const classes = useStyles();
  const globalClasses = styles();

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel>
        <Typography className={globalClasses.textEmphasis}>
          {targetGroupType}
        </Typography>

        <Box className={classes.todo} />
      </ExpansionPanel>
    </Box>
  );
};
