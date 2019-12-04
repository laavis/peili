import React from 'react';
import { Typography, Button, Box, IconButton } from '@material-ui/core';

import Contact from './Contact';
import EditIcon from '@material-ui/icons/Edit';
import Locale from '../Locale';
import Translation from './organizationLocale';

import EmptySection from './EmptySection';

import styles from './styles';

const l = Locale(Translation);

export default ({ contacts, setContacts, changed, setChanged }) => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);
  const [editable, setEditable] = React.useState(false);

  React.useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setContacts(storedContacts);
  }, [setContacts]);

  const handleOpen = index => isOpen => {
    setOpen(isOpen ? index : null);
  };

  const handleEdit = index => data => {
    setChanged(true);
    let newContacts = [...contacts];
    newContacts[index] = { ...newContacts[index], ...data };
    setContacts(newContacts);
  };

  const handleAddContact = () => {
    let lastIndex = contacts.length;

    setContacts([
      ...contacts,
      {
        name: '',
        phone: '',
        email: '',
        description: '',
        internal_msg: ''
      }
    ]);

    setOpen(lastIndex);
  };

  const handleRemove = index => () => {
    let newLocations = [...contacts];
    newLocations.splice(index, 1);
    setContacts(newLocations);
  };

  let hasData = contacts.length;

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
    setOpen(false);
    setEditable(false);
  };

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('contactsHeader')}
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

      {!hasData ? <EmptySection /> : null}
      {contacts.map((contact, index) => (
        <Contact
          {...contact}
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
        <Button color="primary" onClick={handleAddContact}>
          {l('addLocationButtonText')}
        </Button>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
