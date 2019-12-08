import React from 'react';
import { Box, Slider, Typography } from '@material-ui/core';

import styles from './styles';

import Locale from '../Locale';
import Translation from './organizationLocale';
const l = Locale(Translation);

export default ({ value, handleAgeChange }) => {
  const globalClasses = styles();

  return (
    <Box>
      <Typography className={globalClasses.textCapitalizedSmall}>
        {l('age')}
      </Typography>
      <Slider
        value={value}
        onChange={handleAgeChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};
