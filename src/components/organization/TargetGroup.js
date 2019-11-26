// Component for target groups eg. criteria: Age from 18 to 30
// One criteria per component

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

// styles
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  wrapper: {
    marginBottom: 8
  },
  summary: {
    display: 'flex',
    flexDirection: 'column'
  },
  formControl: {
    margin: theme.spacing(1),
    width: '100%'
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  },
  selectFormCtrl: {
    margin: theme.spacing(1),
    width: '45%'
  }
}));

export default ({ targetGroupType, editable }) => {
  const classes = useStyles();
  const globalClasses = styles();
  const [age, setAge] = React.useState('');

  // Editable
  const icon = editable ? <ExpandMoreIcon /> : null;
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandedChange = (event, isExpanded) => {
    if (!editable) return;
    setExpanded(isExpanded);
  };

  const handleChange = e => {
    setAge(e.target.value);
  };

  return (
    <Box className={globalClasses.expansionPanelContainer}>
      <ExpansionPanel>
        <Typography className={globalClasses.textEmphasis}>
          {targetGroupType}
        </Typography>
      </ExpansionPanel>
    </Box>
  );
};
