import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import React from 'react';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import { listIncomingRoutes, listOutgoingRoutes } from './QuestionUtil';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  routeSection: {
    marginBottom: theme.spacing(3)
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
  }
}));

export const QuestionRouteTable = ({ index, survey }) => {
  const classes = useStyles();

  const incomingRoutes = listIncomingRoutes(survey.questions, index);
  const outgoingRoutes = listOutgoingRoutes(survey.questions, index);

  return (
    <Box className={classes.routeSection}>
      {/*
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Route Table
      </InputLabel>
      */}

      <Table className={classes.table} size="small" aria-label="a dense table">
        {!!incomingRoutes.length && (
          <TableHead>
            <TableRow>
              <TableCell width={16}>In</TableCell>
              <TableCell width="50%">Question</TableCell>
              <TableCell width="50%">Option</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {incomingRoutes.map((x, i) => (
            <TableRow key={i}>
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
        </TableBody>
        {!!outgoingRoutes.length && (
          <TableHead>
            <TableRow>
              <TableCell width={16}>Out</TableCell>
              <TableCell width="50%">Option</TableCell>
              <TableCell width="50%">Question</TableCell>
            </TableRow>
          </TableHead>
        )}
        <TableBody>
          {outgoingRoutes.map((x, i) => (
            <TableRow key={i}>
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
  );
};
