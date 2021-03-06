/**
 * @file A neat little helper box with text and an info icon.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import InfoIcon from '@material-ui/icons/Info';
import React from 'react';

const useStyles = makeStyles(theme => ({
  infoSection: {
    display: 'flex',
    marginTop: theme.spacing(2),
    color: theme.palette.text.secondary
  },
  infoIcon: {
    width: 16,
    height: 16,
    marginRight: theme.spacing(1),
    fill: theme.palette.primary.main
  }
}));

export const HelpBox = ({ className = '', children }) => {
  const classes = useStyles();

  return (
    <Box className={`${classes.infoSection} ${className}`}>
      <InfoIcon className={classes.infoIcon} />
      <Typography variant="body2">{children}</Typography>
    </Box>
  );
};
