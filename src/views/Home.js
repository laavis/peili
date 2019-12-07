/**
 * @file The Home view page
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

import React from 'react';
import Button from '@material-ui/core/Button';
import AssignmentIcon from '@material-ui/icons/Assignment';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  page: {
    display: 'flex',
    height: 'calc(100vh - 64px)',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    margin: theme.spacing(1),
    width: 300
  }
}));

function Home() {
  const classes = useStyles();

  return (
    <div className={classes.page}>
      <Link to="/organization">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AssignmentIcon />}
        >
          Organization Editor
        </Button>
      </Link>
      <Link to="/survey">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<AssignmentIndIcon />}
        >
          Survey Editor
        </Button>
      </Link>
    </div>
  );
}

export default Home;
