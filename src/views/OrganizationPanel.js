import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Card from '@material-ui/core/Card';
import DefaultImage from '../img/Image.png';

// Components
import { LocationCard } from '../components/LocationCard';

const data = {
  locations: [
    {
      country: 'FI',
      city: 'Helsinki',
      postalCode: '00550',
      address: 'Inarintie 35'
    },
    {
      country: 'FI',
      city: 'Vantaa',
      postalCode: '12345',
      address: 'Korsonkatu 6'
    },
    {
      country: 'FI',
      city: 'Kotka',
      postalCode: '48410',
      address: 'Kasilanpolku 20'
    }
  ]
};

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
    margin: theme.spacing(1)
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },
  profileImage: {
    minWidth: 80
  },
  wrapper: {
    padding: '32px 64px'
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
    padding: '32px 64px'
  },
  root: {
    background: '#f3f3f3'
  },
  sectionTitle: {
    fontSize: '1.125rem', // 18px
    fontWeight: 600,
    marginLeft: '1rem',
    marginBottom: '0.5rem'
  }
}));

export const OrganizationPanel = () => {
  const classes = useStyles();

  const [editable, setEditable] = React.useState(false);

  const handleEditClick = () => {
    setEditable(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.topSection}>
        <Grid className={classes.grid} container spacing='4'>
          <Grid item xs='12'>
            <Typography variant='h5'>Kohtaus Ry</Typography>
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
            Other stuff
          </Grid>
        </Grid>
      </div>
      <div className={classes.bottomSection}>
        <Grid className={classes.grid} container spacing='4'>
          <Grid item xs='6'>
            <div>
              <Typography className={classes.sectionTitle}>Locations</Typography>
              {data.locations.map(x => (
                <LocationCard editable={editable} {...x} />
              ))}
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Fab onClick={handleEditClick} className={classes.fab} color='primary' variant='extended' aria-label='edit'>
          <EditIcon className={classes.extendedIcon} />
          Edit
        </Fab>
      </div>
    </div>
  );
};
