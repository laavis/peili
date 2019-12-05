import React from 'react';
import { Typography, Button, Box, IconButton } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Service from './Service';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ changed, setChanged }) => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const [services, setServices] = React.useState([]);

  React.useEffect(() => {
    const storedServices = JSON.parse(localStorage.getItem('services') || '[]');
    setServices(storedServices);
  }, [setServices]);

  const handleOpen = index => isOpen => {
    setOpen(isOpen ? index : null);
  };

  const handleEdit = index => data => {
    setChanged(true);
    let newServices = [...services];
    newServices[index] = { ...newServices[index], ...data };
    setServices(newServices);
  };

  const handleAdd = () => {
    let lastIndex = services.length;

    setServices([
      ...services,
      {
        name: '',
        description: '',
        openService: true,
        requirements: []
      }
    ]);

    setOpen(lastIndex);
  };

  const handleRemove = index => () => {
    let newServices = [...services];
    newServices.splice(index, 1);
    setServices(newServices);
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('services', JSON.stringify(services));
    setOpen(false);
    setEditable(false);
  };

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('servicesHeader')}
          <span
            className={changed ? globalClasses.unsavedChangesIcon : ''}
          ></span>
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
      {services.map((service, index) => (
        <Service
          {...service}
          key={index}
          editable={editable}
          open={open === index}
          handleOpen={handleOpen(index)}
          handleEdit={handleEdit(index)}
          handleRemove={handleRemove(index)}
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
          onClick={handleAdd}
        >
          {l('addServiceButtonText')}
        </Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
