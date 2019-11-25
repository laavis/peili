import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

import Contact from './Contact';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ editable, contacts, setContacts, changed, setChanged }) => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);
  // const [changed, setChanged] = React.useState(false);

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
        method: '',
        contact: '',
        internal_msg: ''
      }
    ]);

    setOpen(lastIndex);
  };

  return (
    <Box className={globalClasses.section}>
      <Typography className={globalClasses.sectionTitle}>
        {l('contactsHeader')}
        <span
          className={changed ? globalClasses.unsavedChangesIcon : ''}
        ></span>
      </Typography>

      {contacts.map((contact, index) => (
        <Contact
          {...contact}
          key={index}
          editable={editable}
          open={open === index}
          handleOpen={handleOpen(index)}
          handleEdit={handleEdit(index)}
        />
      ))}
      <Button
        className={editable ? globalClasses.buttonAdd : globalClasses.hide}
        color="primary"
        onClick={handleAddContact}
      >
        {l('addLocationButtonText')}
      </Button>
    </Box>
  );
};
