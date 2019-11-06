import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import DragIndicatorIcon from '@material-ui/icons/DragIndicator';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import React from 'react';

const data = {
  options: ['Option #1', 'Option #2', 'Option #3', 'Option #4', 'Option #5']
};

const useStyles = makeStyles(theme => ({
  box: {
    width: '100%'
  },
  section: {
    marginBottom: theme.spacing(3)
  },
  input: {
    width: '100%',
    flex: 1
  },
  menu: {
    width: 200
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

export const QuestionDetails = () => {
  const classes = useStyles();

  return (
    <Box className={classes.box}>
      <Box className={classes.section}>
        <Typography variant="subtitle2">Details</Typography>
        <TextField
          className={classes.input}
          label="Title"
          value="Question #1"
          margin="normal"
        />
        <TextField
          select
          label="Type"
          className={classes.input}
          value={'selectOne'}
          SelectProps={{
            MenuProps: {
              className: classes.menu
            }
          }}
          helperText="Question type cannot be changed"
          margin="normal"
          disabled
        >
          <MenuItem key={'selectOne'} value={'selectOne'}>
            Select One
          </MenuItem>
        </TextField>
      </Box>

      <Box className={classes.section}>
        <Typography variant="subtitle2">Options</Typography>
        {data.options.map(x => (
          <Box className={classes.option}>
            <RadioButtonUncheckedIcon />
            <TextField
              className={classes.optionInput}
              margin="dense"
              value={x}
            />
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
    </Box>
  );
};
