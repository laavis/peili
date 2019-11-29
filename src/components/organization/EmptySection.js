import { Box, Typography } from '@material-ui/core';
import React from 'react';
import Locale from '../Locale';
import Translation from './organizationLocale';

const l = Locale(Translation);

export default () => {
  return (
    <Box>
      <Typography>{l('emptySectionTitle')}</Typography>
    </Box>
  );
};
