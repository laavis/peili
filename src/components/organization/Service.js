import React from 'react';
import {
  Typography,
  Button,
  Box,
  Grid,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  FormControl,
  InputLabel,
  Select,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  FormControlLabel,
  Switch,
  RadioGroup,
  Radio,
  Slider,
  Checkbox
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '../question/CachedInput';
import { openDialog } from '../ConfirmationDialog';

import Locale from '../Locale';
import Translation from './organizationLocale';
import { makeStyles } from '@material-ui/styles';

import { handleEditTest } from './actionsHelper';

import globalStyles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  singleCriteriaContainer: {
    marginLeft: '8px',
    background: 'rgba(0, 0, 0, 0.07)'
  }
}));

export default ({
  description,
  openService,
  requirements,
  open,
  editable,
  handleOpen,
  handleEdit,
  handleRemove
}) => {
  const classes = useStyles();
  const globalClasses = globalStyles();

  const criteriaSelect = [
    { id: 'age', criteria: l('age') },
    { id: 'gender', criteria: l('gender') },
    { id: 'kelaRehabilitee', criteria: l('serviceCriteriaKelaRehabilitee') }
  ];

  const [openState, setOpenState] = React.useState(false);
  const [criteriaMenuAnchorEl, setCriteriaMenuAnchorEl] = React.useState(null);

  const icon = editable ? <ExpandMoreIcon /> : null;

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

  const [ageValue, setAgeValue] = React.useState([18, 30]);

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
    setAgeValue(newValue);
    setAgeValues(newValue[0], newValue[1]);
  };

  const setKelaValue = isRequired => {
    const requirementsCache = requirements;
    const kelaIndex = requirementsCache.findIndex(x => x.type === 'kela');

    console.log(requirementsCache);

    if (kelaIndex < 0) {
      requirementsCache.push({ type: 'kela', isRequired });
    } else {
      requirementsCache[kelaIndex].isRequired = isRequired;
    }

    handleEdit({ requirements: requirementsCache });
  };

  const gender = value => {
    return (
      <Box>
        <Typography className={globalClasses.textCapitalizedSmall}>
          {l('gender')}
        </Typography>
        <FormControl>
          <RadioGroup
            value={value ? 'male' : 'female'}
            onChange={handleGenderChange}
          >
            <FormControlLabel
              value="female"
              label="female"
              control={<Radio color="primary" />}
            />
            <FormControlLabel
              value="male"
              label="male"
              control={<Radio color="primary" />}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const age = () => {
    return (
      <Box>
        <Typography className={globalClasses.textCapitalizedSmall}>
          {l('age')}
        </Typography>
        <Slider
          value={ageValue}
          onChange={handleAgeChange}
          valueLabelDisplay="auto"
        />
      </Box>
    );
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

    console.log(type);

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

  const isFirstRequirement = !requirements.length;

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel
        className={globalClasses.expansionPanel}
        expanded={editable ? open : false}
        onChange={handleExpandedChange}
      >
        <ExpansionPanelSummary
          className={globalClasses.expansionPanelPaddingReset}
          expandIcon={icon}
        >
          <Box className={globalClasses.summaryWrapper}>
            <Typography className={globalClasses.textCapitalizedSmall}>
              {openService ? l('serviceOpen') : l('serviceClosed')}
            </Typography>
            <Typography className={globalClasses.textEmphasis}>
              {description}
            </Typography>
          </Box>
        </ExpansionPanelSummary>
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
                    if (x.type === 'gender') return gender(x.isMale);
                    if (x.type === 'age') return age();
                    if (x.type === 'kela') return kela(x.isRequired);
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
