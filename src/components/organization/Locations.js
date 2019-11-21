import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';
import Location from './Location';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ editable, locations, setLocations }) => {
  const classes = styles();

  const [open, setOpen] = React.useState(null);

  React.useEffect(() => {
    // get locations (or empty array if there are no locations) from local storage
    const storedLocations = JSON.parse(localStorage.getItem('locations') || '[]');
    // display retrieved locations on the screen
    setLocations(storedLocations);
  }, []);

  // Handles opening of expandable cards
  const handleOpen = index => isOpen => {
    setOpen(isOpen ? index : null);
  };

  // Save changes to the edited location(s)
  const handleLocationEdit = index => data => {
    let newLocations = [...locations];
    newLocations[index] = { ...newLocations[index], ...data };
    setLocations(newLocations);
  };

  // Remove selected location by index
  const handleLocationRemove = index => () => {
    let newLocations = [...locations];
    newLocations.splice(index, 1);
    setLocations(newLocations);
  };

  // Create new location
  const handleAddLocation = () => {
    let lastIndex = locations.length;

    setLocations([
      ...locations,
      {
        country: 'FI',
        city: '',
        address: '',
        postalCode: ''
      }
    ]);

    // Set created location card to be expanded
    setOpen(lastIndex);
  };

  return (
    <Box className={classes.section}>
      <Typography className={classes.sectionTitle}>{l('locationsHeader')}</Typography>
      {locations.map((location, index) => (
        <Location
          {...location}
          key={index}
          editable={editable}
          open={open === index}
          handleOpen={handleOpen(index)}
          handleEdit={handleLocationEdit(index)}
          handleRemove={handleLocationRemove(index)}
        />
      ))}
      <Button className={editable ? classes.buttonAdd : classes.hide} color='primary' onClick={handleAddLocation}>
        {l('addLocationButtonText')}
      </Button>
    </Box>
  );
};
