import React from 'react';
import { Typography, Box } from '@material-ui/core';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default () => {
  return (
    <Box>
      <Typography>{l('emptySectionTitle')}</Typography>
    </Box>
  );
};
