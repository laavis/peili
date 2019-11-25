import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';
import Card from '@material-ui/core/Card';
import DefaultImage from '../img/Image.png';
import Button from '@material-ui/core/Button';

// Components
import { Feeds, Keywords, TargetGroup } from '../components/organization';

import Locations from '../components/organization/Locations';
import Contacts from '../components/organization/Contacts';

// Localization
import Locale from '../components/Locale';
import Translation from '../components/organization/organizationLocale';

const l = Locale(Translation);

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

  const [locations, setLocations] = React.useState([]);
  const [contacts, setContacts] = React.useState([]);

  const [editable, setEditable] = React.useState(false);

  const [changed, setChanged] = React.useState(false);

  // Enables editing
  const handleEditClick = () => {
    setEditable(true);
  };

  // Save
  const handleSaveClick = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setChanged(false);
    setEditable(false);
  };

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
            Other stuff
          </Grid>
        </Grid>
      </div>
      <div className={classes.bottomSection}>
        <Grid className={classes.grid} container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Locations
              editable={editable}
              locations={locations}
              setLocations={setLocations}
            />
            <Contacts
              editable={editable}
              contacts={contacts}
              setContacts={setContacts}
              changed={changed}
              setChanged={setChanged}
            />
          </Grid>
          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <div className={classes.sectionWrapper}>
              <Typography className={classes.sectionTitle}>
                Target Groups
              </Typography>
              <TargetGroup editable={editable} />
              <Button className={classes.buttonAdd} color="primary">
                Add Target Group
              </Button>
            </div>
            <div className={classes.sectionWrapper}>
              <Typography className={classes.sectionTitle}>Keywords</Typography>
              <Keywords editable={editable} />
            </div>
            <div className={classes.sectionWrapper}>
              <Typography className={classes.sectionTitle}>Feeds</Typography>
              <Feeds editable={editable} />
            </div>
          </Grid>
        </Grid>
      </div>
      <div>
        <Fab
          onClick={editable ? handleSaveClick : handleEditClick}
          className={classes.fab}
          color="primary"
          variant="extended"
          aria-label="save"
        >
          {editable ? (
            <SaveIcon className={classes.extendedIcon} />
          ) : (
            <EditIcon className={classes.extendedIcon} />
          )}
          {editable ? 'SAVE' : 'EDIT'}
        </Fab>
      </div>
    </div>
  );
};
