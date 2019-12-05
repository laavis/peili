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
  RadioGroup,
  Slider,
  Switch,
  Tooltip,
  Typography,
  makeStyles
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';
import TextField from '../CachedInput';
import { openDialog } from '../ConfirmationDialog';
import Locale from '../Locale';
import Translation from './organizationLocale';

import { StyledExpansionPanelSummary } from './StyledExpansionPanelSummary';

import globalStyles from './styles';

import GenderCriteria from './GenderCriteria';

const l = Locale(Translation);

export default ({}) => {
  const globalClasses = globalStyles();

  const [openState, setOpenState] = React.useState(false);
  const [criteriaMenuAnchorEl, setCriteriaMenuAnchorEl] = React.useState(null);
};
