/**
 * @file The route table for a single question. Will display all incoming and outgoing routes.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Box from '@material-ui/core/Box';
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
      <Table className={classes.table} size="small" aria-label="a dense table">
        {!!incomingRoutes.length && (
          <TableHead>
            <TableRow>
              <TableCell
                width={16}
              >{l`questionRouteTableDirectionIn`}</TableCell>
              <TableCell width="50%">{l`questionRouteTableSource`}</TableCell>
              <TableCell width="50%">{l`questionRouteTableOption`}</TableCell>
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
                style={{ color: x.option ? 'inherit' : 'rgba(0, 0, 0, 0.54)' }}
                width="50%"
                className={classes.routeCell}
                component="th"
                scope="row"
              >
                {x.option ? x.option.name : l`questionRouteTableDefault`}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        {!!outgoingRoutes.length && (
          <TableHead>
            <TableRow>
              <TableCell
                width={16}
              >{l`questionRouteTableDirectionOut`}</TableCell>
              <TableCell width="50%">{l`questionRouteTableOption`}</TableCell>
              <TableCell width="50%">{l`questionRouteTableDestination`}</TableCell>
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
                style={{ color: x.option ? 'inherit' : 'rgba(0, 0, 0, 0.54)' }}
                width="50%"
                className={classes.routeCell}
                component="th"
                scope="row"
              >
                {x.option ? x.option.name : l`questionRouteTableDefault`}
              </TableCell>
              <TableCell
                width="50%"
                className={classes.routeCell}
                component="th"
                scope="row"
              >
                {(x.option && x.option.route === 'end') || !x.question ? (
                  l`questionRouteTableEndSurvey`
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
