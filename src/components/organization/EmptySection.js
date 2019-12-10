import { Box, Card, Typography } from '@material-ui/core';
import React from 'react';
import Locale from '../Locale';
import Translation from './organizationLocale';
import { makeStyles } from '@material-ui/core/styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  container: {
    background: '#dcdde7',
    padding: '1rem',
    margin: '0 1rem',
    marginBottom: '1rem'
  }
}));

export default () => {
  const classes = useStyles();
  return (
    <Card className={classes.container}>
      <Typography>{l('emptySectionTitle')}</Typography>
      <Typography>{l('emptySectionText')}</Typography>
    </Card>
  );
};
