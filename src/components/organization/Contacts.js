import React from 'react';
import { Typography, Button, Box } from '@material-ui/core';

import Contact from './Contact';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';

const l = Locale(Translation);

export default ({ editable, contacts, setContacts }) => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);

  React.useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem('contacts') || '[]');
    setContacts(storedContacts);
  }, [setContacts]);

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
      </Typography>
      <Button
        className={editable ? globalClasses.buttonAdd : globalClasses.hide}
        color="primary"
      >
        {l('addLocationButtonText')}
      </Button>
    </Box>
  );
};
