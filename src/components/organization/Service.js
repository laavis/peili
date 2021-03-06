/**
 * @file Composition and functionality of single service
 * @author Sara Suviranta <sara.suviranta@metropolia.fi>
 */

import {
  Box,
  Button,
  Checkbox,
  ExpansionPanel,
  ExpansionPanelDetails,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Radio,
  Switch,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import TextField from '../CachedInput';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';

import { StyledExpansionPanelSummary } from './StyledExpansionPanelSummary';

import globalStyles from './styles';

import GenderCriteria from './GenderCriteria';
import AgeCriteria from './AgeCriteria';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  description: {
    marginTop: '0.75rem'
  },
  criterias: {
    marginTop: '0.75rem'
  }
}));

export default ({
  name,
  description,
  openService,
  requirements,
  open,
  editable,
  handleOpen,
  handleEdit,
  handleRemove
}) => {
  const globalClasses = globalStyles();
  const classes = useStyles();

  const [openState, setOpenState] = React.useState(false);
  const [criteriaMenuAnchorEl, setCriteriaMenuAnchorEl] = React.useState(null);
  // const [ageValue, setAgeValue] = React.useState([18, 30]);

  const handleCheckedChange = event => {
    setOpenState({ openState: event.target.checked });
    handleEdit({ openService: openState });
  };

  const enabledCriterias = {
    age: 'age',
    gender: 'gender',
    kelaRehabilitee: 'kelaRehabilitee'
  };
  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    handleOpen(isExpanded);
  };

  const handleNameChange = name => {
    handleEdit({ name });
  };

  const handleDescriptionChange = description => {
    handleEdit({ description });
  };

  const handleOpenAddCriteriaMenu = event => {
    setCriteriaMenuAnchorEl(event.currentTarget);
  };

  const handleGenderChange = event => {
    setGenderValue(event.target.value === 'male');
  };

  const setGenderValue = isMale => {
    const requirementsCache = requirements;
    const genderIndex = requirementsCache.findIndex(x => x.type === 'gender');
    if (genderIndex < 0) {
      requirementsCache.push({ type: 'gender', isMale });
    } else {
      requirementsCache[genderIndex].isMale = isMale;
    }

    handleEdit({ requirements: requirementsCache });
  };

  const setAgeValues = (min, max) => {
    const requirementsCache = requirements;
    const ageIndex = requirementsCache.findIndex(x => x.type === 'age');
    if (ageIndex < 0) {
      requirementsCache.push({ type: 'age', min, max });
    } else {
      requirementsCache[ageIndex].min = min;
      requirementsCache[ageIndex].max = max;
    }
  };

  const handleAgeChange = (event, newValue) => {
    // setAgeValue(newValue);
    setAgeValues(newValue[0], newValue[1]);
  };

  const setKelaValue = isRequired => {
    const requirementsCache = requirements;
    const kelaIndex = requirementsCache.findIndex(x => x.type === 'kela');

    if (kelaIndex < 0) {
      requirementsCache.push({ type: 'kela', isRequired });
    } else {
      requirementsCache[kelaIndex].isRequired = isRequired;
    }

    handleEdit({ requirements: requirementsCache });
  };

  const kela = value => {
    return (
      <Box>
        <Typography className={globalClasses.textCapitalizedSmall}>
          {l('serviceCriteriaKelaRehabilitee')}
        </Typography>
        <FormControl>
          <FormControlLabel
            label={l('serviceCriteriaKelaRehabilitee')}
            control={
              <Checkbox
                checked={value}
                onChange={setKelaValue}
                value={value}
                color="primary"
              />
            }
          />
        </FormControl>
      </Box>
    );
  };

  const handleCloseAddCriteriaMenu = type => () => {
    setCriteriaMenuAnchorEl(null);

    switch (type) {
      case 'gender':
        setGenderValue(true);
        break;
      case 'age':
        setAgeValues(0, 1);
        break;
      case 'kelaRehabilitee':
        setKelaValue(true);
        break;
      default:
        return;
    }
  };

  const handleConfirmationDialog = async () => {
    const action = await openDialog({
      title: l('removeServiceConfirmationTitle'),
      description: l('confirmationWarning')
    });

    if (action === 'confirm') handleRemove();
  };

  const summary = () => {
    return (
      <StyledExpansionPanelSummary
        className={globalClasses.expansionPanelPaddingReset}
      >
        <Box className={globalClasses.summaryWrapper}>
          <Typography className={globalClasses.textCapitalizedSmall}>
            {openService ? l('serviceOpen') : l('serviceClosed')}
          </Typography>
          <Typography className={globalClasses.textEmphasis}>{name}</Typography>
          <Typography className={classes.description}>{description}</Typography>
          <Box className={classes.criterias}>
            <Typography className={globalClasses.textCapitalizedSmall}>
              {l('criterias')}
            </Typography>
            <Grid container spacing={1}>
              {requirements.map(x => {
                if (x.type === 'gender')
                  return (
                    <Grid item xs={12}>
                      <FormControlLabel
                        checked={true}
                        label={x.isMale ? l('forMen') : l('forWomen')}
                        control={<Radio color="primary" />}
                      />
                    </Grid>
                  );
                if (x.type === 'kela')
                  return (
                    <Grid item xs={12}>
                      <FormControlLabel
                        checked={true}
                        label={l('forKelaRehabs')}
                        control={<Radio color="primary" />}
                      />
                    </Grid>
                  );
                if (x.type === 'age')
                  return (
                    <Grid item xs={12}>
                      <Typography>
                        {'Ikäraja: ' + x.min + ' - ' + x.max}
                      </Typography>
                    </Grid>
                  );

                return null;
              })}
            </Grid>
          </Box>
        </Box>
      </StyledExpansionPanelSummary>
    );
  };

  const isFirstRequirement = !requirements.length;

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel
        className={globalClasses.expansionPanel}
        expanded={editable ? open : false}
        onChange={handleExpandedChange}
      >
        {!editable ? summary() : null}
        <ExpansionPanelDetails
          className={globalClasses.expansionPanelPaddingReset}
        >
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Grid
                container
                spacing={2}
                className={globalClasses.detailsWrapper}
              >
                <Grid item xs={6}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('name')}
                      value={name}
                      onChange={handleNameChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl className={globalClasses.formControl}>
                    <TextField
                      label={l('inputDescription')}
                      value={description}
                      onChange={handleDescriptionChange}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Switch
                          onChange={handleCheckedChange}
                          value={openState}
                          color="primary"
                        />
                      }
                      label={l('serviceClosedRadioButtonHelper')}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  {requirements.map(x => {
                    if (x.type === 'gender')
                      return (
                        <GenderCriteria
                          value={x.isMale}
                          handleGenderChange={handleGenderChange}
                        />
                      );
                    if (x.type === 'age')
                      return (
                        <AgeCriteria
                          value={x.ageValue}
                          handleAgeChange={handleAgeChange}
                        />
                      );
                    if (x.type === 'kela') return kela(x.isRequired);
                    return null;
                  })}
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    size="small"
                    onClick={handleOpenAddCriteriaMenu}
                  >
                    {isFirstRequirement
                      ? l('serviceCriteriaAddFirstButton')
                      : l('serviceCriteriaAddButton')}
                  </Button>
                  <Menu
                    id="service-menu-criteria-type"
                    anchorEl={criteriaMenuAnchorEl}
                    keepMounted
                    open={Boolean(criteriaMenuAnchorEl)}
                    onClose={handleCloseAddCriteriaMenu}
                  >
                    {Object.keys(enabledCriterias).map(x => (
                      <MenuItem onClick={handleCloseAddCriteriaMenu(x)} key={x}>
                        <Typography variant="inherit">
                          {l`serviceCriteriaType`[x]}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              xs={2}
              className={globalClasses.expansionPanelRemoveActionContainer}
            >
              <Tooltip title={l('removeText')}>
                <IconButton
                  className={globalClasses.removeIconButton}
                  onClick={handleConfirmationDialog}
                  aria-label={l('removeText')}
                  size="small"
                >
                  <DeleteIcon fontSize="inherit" />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Box>
  );
};
