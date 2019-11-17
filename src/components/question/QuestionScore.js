import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip';
import uuid from 'uuid/v4';

import TrafficIcon from '@material-ui/icons/Traffic';
import AttachmentIcon from '@material-ui/icons/Attachment';
import AddIcon from '@material-ui/icons/Add';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import LockIcon from '@material-ui/icons/Lock';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import Badge from '@material-ui/core/Badge';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { handleSurveyQuestionUpdate } from './QuestionUtil';

import { openDialog } from './QuestionScoreDialog';
import QuestionScoreSourceDialog, * as sourceDialog from './QuestionScoreSourceDialog';

import Translation from './questionLocale.json';
import Locale from '../Locale';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  statement: {
    borderColor: '#565AD7',
    fill: '#565AD7'
  },
  variable: {
    borderColor: theme.palette.primary.main,
    fill: theme.palette.primary.main
  },
  value: {
    // borderColor: '#1FC98C',
    // backgroundColor: '#1FC98C'
    // fill: '#1FC98C'
  },
  label: {
    margin: '0 3px',
    padding: '0 3px',
    backgroundColor: '#FFFFFF',
    fontWeight: 'bold',
    color: theme.palette.text.primary,
    borderRadius: 3
  },
  row: {
    marginBottom: theme.spacing(1)
  }
}));

export const QuestionScore = ({ survey, index, question, setSurvey }) => {
  const classes = useStyles();

  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const handleSourceUpdate = source => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        source
      })
    );
  };

  const handleMenuClick = event => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = action => async () => {
    setMenuAnchorEl(null);

    if (action === 'variable') {
      const name = await sourceDialog.openDialog();
      if (!name) return;

      handleSourceUpdate([
        ...question.source,
        [
          {
            id: uuid(),
            type: 'set',
            value: name
          },
          {
            type: 'value',
            value: []
          }
        ]
      ]);
    }
  };

  const handleValueUpdate = (p, i) => async () => {
    const value = await openDialog(
      question.source[p][0].id,
      question.id,
      question.source[p][1].value
    );
    if (value) {
      const dataCache = [...question.source];
      dataCache[p][i].value = value;
      handleSourceUpdate([...dataCache]);
    }
  };

  return (
    <>
      <Box>
        <Box>
          {(() => {
            let trailing = false;

            return question.source.map((line, p) => {
              const locked = !!line[0].locked;

              return (
                <Box className={classes.row} key={`line-${p}`}>
                  {line.map((point, i) => {
                    const props = { key: `point-${i}` };
                    const corner = {
                      left: !trailing,
                      right: true
                    };

                    if (point.type === 'return') {
                      props.icon = (
                        <ArrowForwardIcon className={classes.value} />
                      );
                      props.label = 'Return';
                      props.color = 'primary';

                      trailing = true;
                    }

                    if (point.type === 'set') {
                      props.icon = (
                        <ArrowForwardIcon className={classes.value} />
                      );

                      const labelParts = l`questionScoreVariable`.split(
                        'SCORE'
                      );
                      props.label = (
                        <>
                          {labelParts[0]}
                          <span className={classes.label}>{point.value}</span>
                          {labelParts[1]}
                        </>
                      );
                      props.color = 'primary';

                      trailing = true;
                    }

                    if (point.type === 'value') {
                      props.icon = <AttachmentIcon className={classes.value} />;
                      props.color = 'primary';
                      props.variant = 'outlined';

                      if (!locked) {
                        props.onClick = handleValueUpdate(p, i);
                      }

                      if (!point.value.length) {
                        props.label = l`questionScorePickValue`;
                        props.color = 'secondary';
                      } else {
                        const parts = point.value[0].split('.');
                        if (parts[0] === 'question') {
                          const question = survey.questions.find(
                            x => x.id === parts[1]
                          );
                          const position = question.index + 1;
                          const name =
                            parts[2] === 'score'
                              ? l`questionScoreSourceDynamicDefaultTitle`
                              : question.source.find(
                                  x => x[0].id === parts[2]
                                )[0].value;

                          props.label = locked
                            ? l`questionScoreSourceDynamicDefaultTitle`
                            : `${position}. ${name}`;
                        } else {
                          props.label = `${parts[1]}.${parts[2] || 0}`;
                        }

                        if (point.value.length > 1) {
                          props.label += ' …';
                        }
                      }

                      trailing = false;
                    }

                    if (!locked && i === line.length - 1) {
                      props.onDelete = () => {};
                    }

                    if (trailing) {
                      corner.right = false;
                    }

                    const chip = (
                      <Chip
                        {...props}
                        style={{
                          borderRadius: `${corner.left ? '16px' : 0} ${
                            corner.right ? '16px' : 0
                          } ${corner.right ? '16px' : 0} ${
                            corner.left ? '16px' : 0
                          }`
                        }}
                      />
                    );

                    if (point.type === 'value' && point.value.length > 1) {
                      return (
                        <Badge
                          key={`point-${i}-badge`}
                          badgeContent={
                            point.value.filter(
                              x => x.split('.')[0] !== 'operator'
                            ).length
                          }
                          max={9}
                          color="secondary"
                        >
                          {chip}
                        </Badge>
                      );
                    } else {
                      return chip;
                    }
                  })}

                  {locked && (
                    <Tooltip
                      title={`Every question will output the default "Score" source`}
                      placement="right"
                    >
                      <LockIcon />
                    </Tooltip>
                  )}
                </Box>
              );
            });
          })()}

          <Chip
            icon={<AddIcon />}
            label={l`questionScoreVariableCreateButton`}
            onClick={handleMenuClose('variable')}
            // onDelete={() => {}}
            variant="outlined"
            style={{ marginRight: 8 }}
          />

          <Chip
            icon={<DonutLargeIcon />}
            label="Modify User Meters"
            onClick={handleMenuClose('meter')}
            // onDelete={() => {}}
            variant="outlined"
          />
        </Box>
      </Box>

      <Menu
        id="simple-menu"
        anchorEl={menuAnchorEl}
        keepMounted
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose(null)}
        style={{ zIndex: 2000 }}
      >
        <MenuItem onClick={handleMenuClose('variable')}>
          <ListItemIcon>
            <AttachmentIcon />
          </ListItemIcon>
          Create Score
        </MenuItem>
        <MenuItem onClick={handleMenuClose('meter')}>
          <ListItemIcon>
            <DonutLargeIcon />
          </ListItemIcon>
          Move Meter
        </MenuItem>
      </Menu>

      <QuestionScoreSourceDialog
        survey={survey}
        index={index}
        question={question}
      />
    </>
  );
};
