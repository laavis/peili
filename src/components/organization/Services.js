import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

import Service from './Service';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ editable, services, setServices, changed, setChanged }) => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);

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

  return (
    <Box className={globalClasses.section}>
      <Typography className={globalClasses.sectionTitle}>
        {l('servicesHeader')}
        <span
          className={changed ? globalClasses.unsavedChangesIcon : ''}
        ></span>
      </Typography>
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
      <Button
        className={editable ? globalClasses.buttonAdd : globalClasses.hide}
        color="primary"
        onClick={handleAdd}
      >
        {l('addServiceButtonText')}
      </Button>
    </Box>
  );
};
