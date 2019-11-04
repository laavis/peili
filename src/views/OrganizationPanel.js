import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import DefaultImage from '../img/Image.png';
const useStyles = makeStyles(theme => ({
  root: {
    padding: 64,
    backgroundColor: '#f3f3f3'
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
  },
  profileImage: {
    minWidth: 80
  },
  organizationGrid: {
    maxWidth: 1320,
    margin: 'auto'
  },
  baseCard: {
    padding: 16
  },
  locationCity: {
    fontWeight: '600'
  }
}));

export const OrganizationPanel = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.organizationGrid}>
        <Grid container spacing='4'>
          <Grid item xs='12'>
            <Typography variant='h5'>Organization</Typography>
          </Grid>
          <Grid item xs='6'>
            <Grid container spacing='2'>
              <Grid item xs='4'>
                <Card className={classes.profileImage}>
                  <img src={DefaultImage} />
                </Card>
              </Grid>
              <Grid item xs='8'>
                <div>
                  <Typography variant='subtitle2' gutterBottom>
                    Name
                  </Typography>
                  <Typography variant='body1'>Kohtaus Ry</Typography>
                </div>
                <div>
                  <Typography variant='subtitle2' gutterBottom>
                    Short Description
                  </Typography>
                  <Typography variant='body1'>
                    Kohtaus ry on vuonna 2014 perustettu yhdistys, jonka tarkoituksena on vähentää nuorten aikuisten
                    yksinäisyyttä ja syrjään jäämistä.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs='6'>
            kack
          </Grid>
        </Grid>
        <Grid container spacing='4'>
          <Grid item xs='6'>
            <Card className={classes.baseCard}>
              <Typography variant='overline' gutterBottom className={classes.locationCity}>
                Helsinki
              </Typography>
              <Typography variant='body1' className={classes.locationCity}>
                Inarintie 35
              </Typography>
            </Card>
          </Grid>
        </Grid>
      </div>
      <div>
        <Fab color='primary' variant='extended' aria-label='edit' className={classes.fab}>
          <EditIcon className={classes.extendedIcon} />
          Edit
        </Fab>
      </div>
    </div>
  );
};
