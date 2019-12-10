/**
 * @file Structure of the organization panel
 * @author Sara Suviranta <sara.suviranta@metropolia.fi>
 * @author Benard Gathimba <benard.gathimba@metropolia.fi>
 */

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Keywords from '../components/organization/Keywords';
import Contacts from '../components/organization/Contacts';
import Feeds from '../components/organization/Feeds';
import Locations from '../components/organization/Locations';
import Services from '../components/organization/Services';
import DefaultImage from '../img/Image.png';
import Targets from '../components/organization/Targets';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  profileImage: {
    minWidth: 80
  },
  wrapper: {
    padding: theme.spacing(1)
  },
  grid: {
    maxWidth: 1320,
    margin: '0 auto'
  },
  topSection: {
    background: '#ffffff',
    padding: '32px 64px'
  },
  bottomSection: {
    padding: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2)
    }
  },
  root: {
    background: '#f3f3f3'
  },
  sectionTitle: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '0.5rem'
  },
  sectionWrapper: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

export const OrganizationPanel = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <Grid className={classes.grid} container spacing={4}>
          <Grid item xs={12}>
            <Typography variant="h5">Kohtaus Ry</Typography>
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Card className={classes.profileImage}>
                  <img alt="Organization Logo" src={DefaultImage} />
                </Card>
              </Grid>
              <Grid item xs={8}>
                <div>
                  <Typography variant="subtitle2" gutterBottom>
                    Short Description
                  </Typography>
                  <Typography variant="body1">
                    Kohtaus ry on vuonna 2014 perustettu yhdistys, jonka
                    tarkoituksena on vähentää nuorten aikuisten yksinäisyyttä ja
                    syrjään jäämistä.
                  </Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6}>
            Pidempi kuvaus
          </Grid>
        </Grid>
      </div>
      <div className={classes.bottomSection}>
        <Grid className={classes.grid} container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Services />
            <Locations />
            <Contacts />
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Targets />
            <Keywords />
            <Feeds />
          </Grid>
        </Grid>
      </div>
      <div></div>
    </div>
  );
};
