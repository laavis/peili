import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import CallSplitIcon from '@material-ui/icons/CallSplit';
import React from 'react';
import TextField from './CachedInput';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import { getDefaultRouteNumber, listPossibleRoutes } from './QuestionUtil';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  optionInputMenu: {
    maxWidth: 500
  },
  optionInputMenuItem: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  optionIconLabel: {
    display: 'flex',
    alignItems: 'center',
    marginTop: -4
  },
  optionIconLabelIcon: {
    marginRight: theme.spacing(0.75)
  }
}));

export const QuestionOptionRoute = ({
  survey,
  index,
  value,
  onChange,
  helperText = l('questionOptionRouteInfo'),
  className
}) => {
  const classes = useStyles();

  const defaultNextQuestionNumber = getDefaultRouteNumber(
    survey.questions,
    index
  );

  const possibleRoutes = listPossibleRoutes(survey.questions, index);

  return (
    <TextField
      select
      className={className}
      value={value}
      onChange={onChange}
      label={
        <span className={classes.optionIconLabel}>
          <CallSplitIcon
            style={{ color: '#CD5B5B' }}
            className={classes.optionIconLabelIcon}
          />{' '}
          {l('questionOptionRouteLabel')}
        </span>
      }
      InputLabelProps={{
        shrink: true
      }}
      SelectProps={{
        MenuProps: {
          className: classes.optionInputMenu
        }
      }}
      helperText={helperText}
      margin="normal"
    >
      <MenuItem value={null} className={classes.optionInputMenuItem}>
        <em>Default ({defaultNextQuestionNumber || 'End'})</em>
      </MenuItem>

      {possibleRoutes.map(x => (
        <MenuItem value={x.id} key={x.id}>
          {x.index + 1}. {x.title}
        </MenuItem>
      ))}

      <MenuItem value="end">End Survey</MenuItem>
    </TextField>
  );
};
