import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import React from 'react';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import Typography from '@material-ui/core/Typography';

import StarRoundedIcon from '@material-ui/icons/StarRounded';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';

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

export const SurveyScoreTable = ({ survey }) => {
  const classes = useStyles();

  const scoreList = survey.questions
    .map(x =>
      x.source
        .filter(y => y.length > 1 && y[1].value.length)
        .map(y => ({
          source: y,
          question: x,
          isAnswerScore: y[0].locked
        }))
    )
    .flat();

  return (
    <Box className={classes.routeSection}>
      {/*
      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
        Route Table
      </InputLabel>
      */}

      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell width={16}></TableCell>
            <TableCell width="45%">Question</TableCell>
            <TableCell width="45%">Score</TableCell>
            <TableCell width="10%" align="right">
              Save
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scoreList.map((x, i) => (
            <TableRow key={x.source[0].id}>
              <TableCell
                width={16}
                className={classes.routeIconCell}
                component="th"
                scope="row"
              >
                {x.isAnswerScore ? (
                  <StarRoundedIcon className={classes.routeIconCellIcon} />
                ) : (
                  <StarBorderRoundedIcon
                    className={classes.routeIconCellIcon}
                  />
                )}
              </TableCell>
              <TableCell
                width="45%"
                className={classes.routeCell}
                component="th"
                scope="row"
              >
                {x.question.index + 1}. {x.question.title}
              </TableCell>
              <TableCell
                width="45%"
                className={classes.routeCell}
                component="th"
                scope="row"
              >
                <Typography variant="body2" style={{ fontWeight: 'bold' }}>
                  {x.source[0].value}
                </Typography>
                <Typography variant="caption" component="div">
                  {x.isAnswerScore
                    ? l`questionScoreSourceDynamicDefaultTitle`
                    : l`questionScoreSourceDynamicCustomDescription`}
                </Typography>
              </TableCell>
              <TableCell
                width="10%"
                className={classes.routeCell}
                component="th"
                scope="row"
                align="right"
              >
                [x]
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
};
