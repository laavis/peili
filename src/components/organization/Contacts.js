import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default () => {
  const classes = styles();

  return (
    <Box className={classes.section}>
      <Typography className={classes.sectionTitle}>{l('contactsHeader')}</Typography>
    </Box>
  );
};
