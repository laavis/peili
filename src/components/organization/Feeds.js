import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import TwitterIcon from '@material-ui/icons/Twitter';
import React from 'react';
import EditIcon from '@material-ui/icons/Edit';

import EmptySection from './EmptySection';
import Locale from '../Locale';
import Feed from './Feed';
import Translation from './organizationLocale';
import styles from './styles';

const l = Locale(Translation);

export default ({ changed, setChanged }) => {
  const globalClasses = styles();

  const enabledFeeds = {
    instagram: <InstagramIcon fontSize="small" />,
    facebook: <FacebookIcon fontSize="small" />,
    twitter: <TwitterIcon fontSize="small" />
  };

  const [editable, setEditable] = React.useState(false);
  const [feeds, setFeeds] = React.useState([]);

  React.useEffect(() => {
    const storedFeeds = JSON.parse(localStorage.getItem('feeds') || '[]');
    setFeeds(storedFeeds);
  }, [setFeeds]);

  const handleEdit = index => data => {
    setChanged(true);
    let newFeeds = [...feeds];
    newFeeds[index] = { ...newFeeds[index], ...data };
    setFeeds(newFeeds);
  };

  const handleAdd = type => {
    setFeeds([
      ...feeds,
      {
        type: type,
        username: '',
        identifiers: []
      }
    ]);
  };

  const handleRemove = index => () => {
    let newFeeds = [...feeds];
    newFeeds.splice(index, 1);
    setFeeds(newFeeds);
  };

  let hasData = feeds.length;

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('feeds', JSON.stringify(feeds));
    setEditable(false);
  };

  // New feed creation
  const [feedSelectMenuAnchorEl, setFeedSelectMenuAnchorEl] = React.useState(
    null
  );
  const handleOpenFeedSelectMenu = event => {
    setFeedSelectMenuAnchorEl(event.currentTarget);
  };

  const handleCloseFeedSelectMenu = type => () => {
    setFeedSelectMenuAnchorEl(null);
    console.log(type);

    switch (type) {
      case 'instagram':
        handleAdd(type);
        console.log(feeds);
        break;
      case 'facebook':
        handleAdd(type);
        break;
      case 'twitter':
        handleAdd(type);
        break;
      default:
        return;
    }
  };

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('feedsHeader')}
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
      {feeds.map((feed, index) => (
        <Feed
          {...feed}
          key={index}
          editable={editable}
          type={feeds[index].type}
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
          onClick={handleOpenFeedSelectMenu}
        >
          {l('addFeedButtonText')}
        </Button>
        <Menu
          id="add-feed-type-menu"
          anchorEl={feedSelectMenuAnchorEl}
          keepMounted
          open={Boolean(feedSelectMenuAnchorEl)}
          onClose={handleCloseFeedSelectMenu}
        >
          {Object.keys(enabledFeeds).map(x => (
            <MenuItem onClick={handleCloseFeedSelectMenu(x)} key={x}>
              <ListItemIcon>{enabledFeeds[x]}</ListItemIcon>
              <Typography>{l`feedType`[x]}</Typography>
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
