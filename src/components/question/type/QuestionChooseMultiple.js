/**
 * @file Renders and manages the functionality of the "Choose Multiple" question options.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import React from 'react';

const data = {
  options: ['Option #1', 'Option #2', 'Option #3', 'Option #4', 'Option #5']
};

const useStyles = makeStyles(theme => ({
  section: {
    marginBottom: theme.spacing(3)
  },
  option: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 8,
    maxWidth: 500
  },
  optionInput: {
    flex: 1,
    marginLeft: 12,
    marginRight: 20
  },
  optionButton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(4)
  }
}));

export const QuestionChooseMultiple = () => {
  const classes = useStyles();

  return (
    <Box className={classes.section}>
      <Typography variant="subtitle2">Options</Typography>
      {data.options.map(x => (
        <Box className={classes.option}>
          <CheckBoxOutlineBlankIcon />
          <TextField className={classes.optionInput} margin="dense" value={x} />
          <DragIndicatorIcon color="disabled" />
        </Box>
      ))}

      <Button
        color="primary"
        size="small"
        className={classes.optionButton}
        startIcon={<AddIcon />}
      >
        Add Option
      </Button>
    </Box>
  );
};
