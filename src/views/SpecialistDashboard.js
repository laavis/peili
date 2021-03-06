/**
 * @file A placeholder view for the specialists that lists all their surveys.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoreIcon from '@material-ui/icons/MoreVert';
import React from 'react';

const data = {
  ongoing: [
    {
      title: 'Test Survey #1',
      date: '10.12.2020'
    },
    {
      title: 'Test Survey #2',
      date: '10.12.2020'
    },
    {
      title: 'Test Survey #3',
      date: '10.12.2020'
    },
    {
      title: 'Test Survey #4',
      date: '10.12.2020'
    }
  ]
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: 64
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  list: {
    width: '100%'
  },
  fab: {
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  }
}));

export const SpecialistDashboard = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3} direction="row-reverse">
        <Grid item xs={12} className={classes.header}>
          <div>
            <Typography variant="h3">Survey Dashboard</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Create, Edit and Follow your surveys
            </Typography>
          </div>
          <div>
            <Fab
              color="primary"
              variant="extended"
              aria-label="like"
              className={classes.fab}
            >
              <AddIcon className={classes.extendedIcon} />
              Create Survey
            </Fab>
          </div>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h6">Upcoming Surveys</Typography>
          <List className={classes.list}>
            {data.ongoing.map(x => (
              <ListItem>
                <ListItemText primary={x.title} secondary={x.date} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="options">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h6">Ongoing Surveys</Typography>
          <List className={classes.list}>
            {data.ongoing.map(x => (
              <ListItem>
                <ListItemText primary={x.title} secondary={x.date} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="options">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item md={6} sm={12} xs={12}>
          <Typography variant="h6">Past Surveys</Typography>
          <List className={classes.list}>
            {data.ongoing.map(x => (
              <ListItem>
                <ListItemText primary={x.title} secondary={x.date} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="options">
                    <MoreIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
};
