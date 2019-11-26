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
  Slider
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import TextField from '../question/CachedInput';
import { openDialog } from '../ConfirmationDialog';

import Locale from '../Locale';
import Translation from './organizationLocale';
import { makeStyles } from '@material-ui/styles';

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
  const [genderValue, setGenderValue] = React.useState('male');

  const [criteriaType, setCriteriaType] = React.useState(null);

  const icon = editable ? <ExpandMoreIcon /> : null;
  console.log(openState);

  const handleCheckedChange = event => {
    setOpenState({ openState: event.target.checked });
    handleEdit({ openService: openState });
    console.log(openState);
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
    setGenderValue(event.target.value);
    if (event.target.value === 'male') {
      handleEdit({ requirements: { gender: { isMale: true } } });
    } else {
      handleEdit({ requirements: { gender: { isMale: false } } });
    }
  };

  const gender = () => {
    return (
      <Box>
        <Typography className={globalClasses.textCapitalizedSmall}>
          {l('gender')}
        </Typography>
        <FormControl>
          <RadioGroup value={genderValue} onChange={handleGenderChange}>
            <FormControlLabel
              value="female"
              label="female"
              control={<Radio />}
            />
            <FormControlLabel value="male" label="male" control={<Radio />} />
          </RadioGroup>
        </FormControl>
      </Box>
    );
  };

  const [ageValue, setAgeValue] = React.useState([18, 30]);

  const handleAgeChange = (event, newValue) => {
    setAgeValue(newValue);
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

  const handleCloseAddCriteriaMenu = type => () => {
    setCriteriaMenuAnchorEl(null);

    switch (type) {
      case 'gender':
        setCriteriaType('gender');
        break;
      case 'age':
        setCriteriaType('age');
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

  const [kelaState, setKelaState] = React.useState(true);

  const kela = () => {
    return (
      <Box>
        <Typography className={globalClasses.textCapitalizedSmall}>
          {l('serviceCriteriaKelaRehabilitee')}
        </Typography>
      </Box>
    );
  };

  const isFirstRequirement = !requirements.length;

  return (
    <Box className={globalClasses.wrapper}>
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
                  {requirements.gender ? gender() : null}
                  {criteriaType === 'gender' && !requirements.gender
                    ? gender()
                    : null}
                  {criteriaType === 'age' && !requirements.age ? age() : null}
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
