import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import TextField from './CachedInput';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';

import {
  listPossibleRoutes,
  listIncomingRoutes,
  listOutgoingRoutes,
  handleSurveyQuestionUpdate
} from './QuestionUtil';

import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { QuestionChooseOne } from './QuestionChooseOne';
import { QuestionChooseMultiple } from './QuestionChooseMultiple';

import Translation from './questionLocale.json';
import Locale from './Locale';

const l = Locale(Translation, 'fi');

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
  routeSection: {
    marginBottom: theme.spacing(3)
  },
  routeSectionInput: {
    width: '100%',
    maxWidth: 518
  },
  table: {
    tableLayout: 'fixed'
  },
  routeCell: {
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  },
  routeIconCell: {},
  routeIconCellIcon: {
    width: 16,
    height: 16
  },
  subtitle: {
    fontSize: '0.75em',
    marginBottom: theme.spacing(1.5)
  },
  divider: {
    padding: 0,
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
    height: 0,
    backgroundColor: theme.palette.divider,
    border: 'none'
  },
  inputMenu: {
    maxWidth: 500
  },
  inputMenuItem: {
    maxWidth: '100%',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden'
  }
}));

export const QuestionDetails = ({ index, survey, setSurvey }) => {
  const classes = useStyles();

  const question = survey.questions[index];

  let content = null;
  switch (question.type) {
    case 'chooseOne':
      content = (
        <QuestionChooseOne
          index={index}
          survey={survey}
          setSurvey={setSurvey}
        />
      );
      break;
    case 'chooseMultiple':
      content = (
        <QuestionChooseMultiple
          index={index}
          survey={survey}
          setSurvey={setSurvey}
        />
      );
      break;
    default:
      break;
  }

  const handleTitleUpdate = title => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        title
      })
    );
  };

  const handleRouteUpdate = route => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        defaultRoute: route
      })
    );
  };

  return (
    <Box className={classes.box}>
      {/* Details */}
      <Box className={classes.section}>
        <Typography variant="h6">{l('questionDetailsText')}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {l('questionDetailsInfo')}
        </Typography>

        <Grid container spacing={4}>
          <Grid item md={8} sm={12} xs={12}>
            <TextField
              variant="outlined"
              className={classes.input}
              label={l('questionDetailsTitleLabel')}
              value={question.title}
              margin="normal"
              onChange={handleTitleUpdate}
            />
          </Grid>
          <Grid item md={4} sm={12} xs={12}>
            <TextField
              variant="outlined"
              select
              label={l('questionDetailsTypeLabel')}
              className={classes.input}
              value={'selectOne'}
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
              helperText={l('questionDetailsTypeInfo')}
              margin="normal"
              disabled
            >
              <MenuItem key={'selectOne'} value={'selectOne'}>
                Select One
              </MenuItem>
            </TextField>
          </Grid>
        </Grid>
      </Box>

      <hr className={classes.divider} />

      {/* Options */}
      <Box className={classes.section}>{content}</Box>

      <hr className={classes.divider} />

      {/* Routing */}
      <Box className={classes.section}>
        <Typography variant="h6">{l('questionRouteText')}</Typography>
        <Typography variant="body2" className={classes.subtitle}>
          {l('questionRouteInfo')}
        </Typography>

        <Box className={classes.routeSection}>
          <TextField
            select
            label="Default Next Question"
            className={classes.routeSectionInput}
            value={question.defaultRoute}
            onChange={handleRouteUpdate}
            SelectProps={{
              MenuProps: {
                className: classes.inputMenu
              }
            }}
            helperText="Next question for options without custom route rules"
            margin="normal"
            variant="outlined"
          >
            {listPossibleRoutes(survey.questions, index).map(x => (
              <MenuItem
                className={classes.inputMenuItem}
                key={x.id}
                value={x.id}
              >
                {x.index + 1}. {x.title}
              </MenuItem>
            ))}

            <MenuItem key="end" value="end">
              End Survey
            </MenuItem>
          </TextField>
        </Box>

        <Box className={classes.routeSection}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Route Table
          </InputLabel>

          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableBody>
              {listIncomingRoutes(survey.questions, index).map(x => (
                <TableRow>
                  <TableCell
                    width={16}
                    className={classes.routeIconCell}
                    component="th"
                    scope="row"
                  >
                    <ArrowForwardIcon
                      className={classes.routeIconCellIcon}
                      style={{ fill: '#56B47C' }}
                    />
                  </TableCell>
                  <TableCell
                    width="50%"
                    className={classes.routeCell}
                    component="th"
                    scope="row"
                  >
                    <span>{x.question.index + 1}.</span> {x.question.title}
                  </TableCell>
                  <TableCell
                    width="50%"
                    className={classes.routeCell}
                    component="th"
                    scope="row"
                  >
                    {x.option ? x.option.name : 'Default'}
                  </TableCell>
                </TableRow>
              ))}
              {listOutgoingRoutes(survey.questions, index).map(x => (
                <TableRow>
                  <TableCell
                    width={16}
                    className={classes.routeIconCell}
                    component="th"
                    scope="row"
                  >
                    <ArrowBackIcon
                      className={classes.routeIconCellIcon}
                      style={{ fill: '#CD5B5B' }}
                    />
                  </TableCell>
                  <TableCell
                    width="50%"
                    className={classes.routeCell}
                    component="th"
                    scope="row"
                  >
                    {x.option ? x.option.name : 'Default'}
                  </TableCell>
                  <TableCell
                    width="50%"
                    className={classes.routeCell}
                    component="th"
                    scope="row"
                  >
                    {(x.option && x.option.route === 'end') || !x.question ? (
                      'End Survey'
                    ) : (
                      <>
                        <span>{x.question.index + 1}.</span> {x.question.title}
                      </>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Box>
    </Box>
  );
};
