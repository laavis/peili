/**
 * @file Target section. Handles adding and removing targets
 * @author Sara Suviranta <sara.suviranta@metropolia.fi>
 */

import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import {
  Box,
  Chip,
  Button,
  Card,
  IconButton,
  CardContent,
  Typography
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';

import Locale from '../Locale';
import Translation from './organizationLocale';
import styles from './styles';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  chip: {
    marginRight: '0.25rem'
  },
  saveBtnContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  targetBox: {
    marginBottom: '1rem'
  }
}));

export default () => {
  const globalClasses = styles();
  const classes = useStyles();

  const [editable, setEditable] = React.useState(false);
  const [targets, setTargets] = React.useState([]);
  const [chipData, setChipData] = React.useState([
    { key: 0, label: l('loneliness') },
    { key: 1, label: l('exclusion') },
    { key: 2, label: l('socialIssues') },
    { key: 3, label: l('mentalHealthProblems') }
  ]);

  React.useEffect(() => {
    const storedTargets = JSON.parse(localStorage.getItem('targets') || '[]');
    setTargets(storedTargets);
  }, [setTargets]);

  const handleChipClick = chip => () => {
    if (!targets.includes(chip.label)) {
      targets.push(chip.label);
    }
    setTargets([...targets]);
  };

  const handleChipRemove = index => () => {
    targets.splice(index, 1);
    setTargets([...targets]);
  };

  const handleEditClick = () => {
    setEditable(true);
  };

  const handleSaveClick = () => {
    localStorage.setItem('targets', JSON.stringify(targets));
    setEditable(false);
  };

  console.log(targets);

  return (
    <Box className={globalClasses.section}>
      <Box className={globalClasses.sectionTitleContainer}>
        <Typography className={globalClasses.sectionTitle}>
          {l('targetsHeader')}
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
      <Box className={globalClasses.expansionPanelContainer}>
        <Card className={globalClasses.outerContainerPadding}>
          <CardContent className={globalClasses.expansionPanelPaddingReset}>
            <Box className={editable ? classes.targetBox : null}>
              <Typography className={globalClasses.textCapitalizedSmall}>
                Valitut kohdesanat
              </Typography>
              {targets.map((target, index) => {
                return (
                  <Chip
                    label={target}
                    className={classes.chip}
                    key={index}
                    color="primary"
                    onDelete={editable ? handleChipRemove(index) : null}
                  />
                );
              })}
            </Box>
            <Box
              className={
                editable ? classes.availableTargets : globalClasses.hide
              }
            >
              <Typography className={globalClasses.textCapitalizedSmall}>
                Valittavissa olevat kohdesanat
              </Typography>
              {chipData.map(data => {
                return (
                  <Chip
                    label={data.label}
                    className={classes.chip}
                    key={data.key}
                    onClick={handleChipClick(data)}
                    color="primary"
                    variant="outlined"
                  />
                );
              })}
            </Box>
          </CardContent>
        </Card>
      </Box>
      <Box className={editable ? classes.saveBtnContainer : globalClasses.hide}>
        <Button onClick={handleSaveClick} color="primary" variant="contained">
          {l('save')}
        </Button>
      </Box>
    </Box>
  );
};
