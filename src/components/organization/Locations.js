/**
 * @file Create, edit & remove logic for locations
 * @author Sara Suviranta <sara.suviranta@metropolia.fi>
 */

import { Box, Button, IconButton, Typography } from '@material-ui/core';
import React from 'react';
import Locale from '../Locale';
import Location from './Location';
import Translation from './organizationLocale';
import styles from './styles';
import EditIcon from '@material-ui/icons/Edit';

const l = Locale(Translation);

export default () => {
  const globalClasses = styles();

  const [locations, setLocations] = React.useState([]);
  const [open, setOpen] = React.useState(null);
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    // get locations (or empty array if there are no locations) from local storage
    const storedLocations = JSON.parse(
      localStorage.getItem('locations') || '[]'
    );
    // display retrieved locations on the screen
    setLocations(storedLocations);
  }, [setLocations]);

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

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('locations', JSON.stringify(locations));
    setOpen(false);
    setEditable(false);
  };

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('locationsHeader')}
        </Typography>
        <IconButton
          onClick={handleEditClick}
          className={globalClasses.editSectionButton}
          aria-label="language"
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </Box>
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

      <Box
        className={
          editable ? globalClasses.sectionButtonsContainer : globalClasses.hide
        }
      >
        <Button
          className={editable ? globalClasses.buttonAdd : globalClasses.hide}
          color="primary"
          onClick={handleAddLocation}
        >
          {l('addLocationButtonText')}
        </Button>

        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
