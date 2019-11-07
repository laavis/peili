import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { QuestionChooseOne } from './QuestionChooseOne';
import { QuestionChooseMultiple } from './QuestionChooseMultiple';

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
  }
}));

export const QuestionDetails = ({ type }) => {
  const classes = useStyles();

  let content = null;
  switch (type) {
    case 'chooseOne':
      content = <QuestionChooseOne />;
      break;
    case 'chooseMultiple':
      content = <QuestionChooseMultiple />;
      break;
    default:
      break;
  }

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

      <Box className={classes.section}>{content}</Box>
    </Box>
  );
};
