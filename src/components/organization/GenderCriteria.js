import React from 'react';
import {
  Typography,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  Box
} from '@material-ui/core';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ value, handleGenderChange }) => {
  const globalClasses = styles();

  return (
    <Box>
      <Typography className={globalClasses.textCapitalizedSmall}>
        {l('gender')}
      </Typography>
      <FormControl>
        <RadioGroup
          value={value ? 'male' : 'female'}
          onChange={handleGenderChange}
        >
          <FormControlLabel
            value="female"
            label="female"
            control={<Radio color="primary" />}
          />
          <FormControlLabel
            value="male"
            label="male"
            control={<Radio color="primary" />}
          />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};
