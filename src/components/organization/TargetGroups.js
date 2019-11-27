import React from 'react';
import { Typography, Button, Box, Menu, MenuItem } from '@material-ui/core';

import targetGroup from './TargetGroup';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';
import TargetGroup from './TargetGroup';
import EmptySection from './EmptySection';

const l = Locale(Translation);

export default ({
  editable,
  targetGroups,
  setTargetGroups,
  changed,
  setChanged
}) => {
  const globalClasses = styles();

  React.useEffect(() => {
    const storedTargetGroups = JSON.parse(
      localStorage.getItem('targetGroups') || '[]'
    );
    setTargetGroups(storedTargetGroups);
  }, [setTargetGroups]);

  const [open, setOpen] = React.useState(null);

  const handleOpen = index => isOpen => {
    setOpen(isOpen ? index : null);
  };

  const handleEdit = index => data => {
    setChanged(true);
    let newTargetGroups = [...targetGroups];
    newTargetGroups[index] = { ...newTargetGroups[index], ...data };
    setTargetGroups(newTargetGroups);
  };

  const handleAdd = criteria => {
    let lastIndex = targetGroups.length;

    setTargetGroups([
      ...targetGroups,
      {
        criteria: criteria
      }
    ]);

    setOpen(lastIndex);
  };

  const handleRemove = index => () => {
    let newTargetGroups = [...targetGroups];
    newTargetGroups.splice(index, 1);
    setTargetGroups(newTargetGroups);
  };

  const enabledTypes = {
    age: 'age',
    gender: 'gender'
  };

  const [
    targetGroupTypeMenuAnchorEl,
    setTargetGroupTypeMenuAnchorEl
  ] = React.useState(null);

  const handleOpenTargetGroupTypeMenu = event => {
    setTargetGroupTypeMenuAnchorEl(event.currentTarget);
  };

  const handleCloseTargetGroupTypeMenu = type => () => {
    setTargetGroupTypeMenuAnchorEl(null);

    console.log(type);

    switch (type) {
      case 'gender':
        handleAdd(type);
        break;
      case 'age': {
        handleAdd(type);
        break;
      }
      default:
        return;
    }
  };

  let hasTargetGroups = targetGroups.length;

  return (
    <Box className={globalClasses.section}>
      <Typography className={globalClasses.sectionTitle}>
        {l('targetGroupSectionHeader')}
        <span
          className={changed ? globalClasses.unsavedChangesIcon : ''}
        ></span>
      </Typography>
      {!hasTargetGroups ? EmptySection() : null}
      {targetGroups.map((targetGroup, index) => (
        <TargetGroup
          {...targetGroup}
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
        onClick={handleOpenTargetGroupTypeMenu}
      >
        {l('addTargetGroupButtonText')}
      </Button>
      <Menu
        id="target-group-type-menu"
        anchorEl={targetGroupTypeMenuAnchorEl}
        keepMounted
        open={Boolean(targetGroupTypeMenuAnchorEl)}
        onClose={handleCloseTargetGroupTypeMenu}
      >
        {Object.keys(enabledTypes).map(x => (
          <MenuItem onClick={handleCloseTargetGroupTypeMenu(x)}>
            <Typography>{l`targetGroupType`[x]}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
