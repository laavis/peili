import React from 'react';
import {
  Typography,
  Button,
  Box,
  ExpansionPanel,
  ExpansionPanelSummary
} from '@material-ui/core';
import Locale from '../Locale';
import Translation from './organizationLocale';
import { makeStyles } from '@material-ui/styles';

import styles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  }
}));

export default () => {
  const classes = useStyles();
  const globalClasses = styles();

  return (
    <Box className={classes.wrapper}>
      <ExpansionPanel>
        <ExpansionPanelSummary></ExpansionPanelSummary>
      </ExpansionPanel>
    </Box>
  );
};
