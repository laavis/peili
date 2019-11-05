import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  card: {
    padding: '10px 16px',
    marginBottom: 8
  },
  city: {
    fontSize: '0.625rem', // 10px
    fontWeight: 600,
    letterSpacing: '1.5px',
    lineHeight: 2
  },
  address: {
    fontWeight: 600,
    fontSize: '1.25rem', // 20px
    letterSpacing: '0.15px',
    lineHeight: 1
  }
}));

export const LocationCard = ({ city, address }) => {
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <Typography className={classes.city} variant='overline'>
        {city}
      </Typography>
      <Typography className={classes.address}>{address}</Typography>
    </Card>
  );
};
