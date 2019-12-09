import React from 'react';
import {
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  IconButton,
  Tooltip
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import HelpIcon from '@material-ui/icons/HelpOutline';

import Locale from '../Locale';
import Translation from './organizationLocale';

import styles from './styles';
import TargetGroup from './TargetGroup';
import EmptySection from './EmptySection';
import GenderCriteria from './GenderCriteria';

const l = Locale(Translation);

export default () => {
  const globalClasses = styles();

  const [open, setOpen] = React.useState(null);
  const [editable, setEditable] = React.useState(false);
  const [changed, setChanged] = React.useState(false);
  const [targetGroups, setTargetGroups] = React.useState([]);

  const [
    targetGroupTypeMenuAnchorEl,
    setTargetGroupTypeMenuAnchorEl
  ] = React.useState(null);

  React.useEffect(() => {
    const storedTargetGroups = JSON.parse(
      localStorage.getItem('target_groups') || '[]'
    );
    setTargetGroups(storedTargetGroups);
  }, [setTargetGroups]);

  const handleOpen = index => isOpen => {
    setOpen(isOpen ? index : null);
  };

  const handleEdit = index => data => {
    setChanged(true);
    let newTargetGroups = [...targetGroups];
    newTargetGroups[index] = { ...newTargetGroups[index], ...data };
    setTargetGroups(newTargetGroups);
  };

  const handleAdd = type => {
    let lastIndex = targetGroups.length;

    setTargetGroups([
      ...targetGroups,
      {
        name: type,
        criteria: []
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

  const handleOpenTargetGroupTypeMenu = event => {
    setTargetGroupTypeMenuAnchorEl(event.currentTarget);
  };

  const handleCloseTargetGroupTypeMenu = type => () => {
    setTargetGroupTypeMenuAnchorEl(null);

    switch (type) {
      case 'gender':
        handleAdd(type);
        break;
      case 'age': {
        handleAdd(type);
        break;
      }
      default:
        break;
    }
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('target_groups', JSON.stringify(targetGroups));
    setOpen(false);
    setEditable(false);
  };

  let hasTargetGroups = targetGroups.length;

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('targetGroupSectionHeader')}
          <span>
            <Tooltip
              title={l('targetGroupsHelpText')}
              className={globalClasses.infoTooltip}
            >
              <HelpIcon color="primary" className={globalClasses.helpIcon} />
            </Tooltip>
          </span>
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
      {!hasTargetGroups ? <EmptySection /> : null}
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

      <Box
        className={
          editable ? globalClasses.sectionButtonsContainer : globalClasses.hide
        }
      >
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
          onClose={handleCloseTargetGroupTypeMenu()}
        >
          {Object.keys(enabledTypes).map(x => (
            <MenuItem onClick={handleCloseTargetGroupTypeMenu(x)} key={x}>
              <Typography>{l`targetGroupType`[x]}</Typography>
            </MenuItem>
          ))}
        </Menu>

        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
