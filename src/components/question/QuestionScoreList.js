import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import AttachmentIcon from '@material-ui/icons/Attachment';
import LockIcon from '@material-ui/icons/Lock';
import React from 'react';
import Locale from '../Locale';
import Translation from './questionLocale.json';
import { openDialog } from './QuestionScoreDialog';
import { handleSurveyQuestionUpdate } from './QuestionUtil';

const l = Locale(Translation);

const useStyles = makeStyles(theme => ({
  value: {},
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

export const parseSourceValue = ({ source, survey }) => {
  if (source.type === 'set') {
    return { ...source };
  }

  if (source.type === 'value') {
    const inputList = [];

    for (const input of source.value) {
      const parts = input.split('.');

      const value = {
        type: parts[0],
        source: parts[1],
        value: parts[2]
      };

      if (value.type === 'question') {
        value.source = survey.questions.find(x => x.id === value.source);
      }

      if (value.type === 'question' && value.value !== 'score') {
        value.value = value.source.source.find(x => x[0].id === value.value);
      }

      inputList.push(value);
    }

    return { type: source.type, value: inputList };
  }

  throw new Error('Unknown identifier', source);
};

export const QuestionScoreList = ({
  survey,
  index,
  questionId,
  sourceList,
  setSurvey
}) => {
  const classes = useStyles();

  const handleSourceUpdate = source => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        source
      })
    );
  };

  const handleValueUpdate = (p, i) => async () => {
    const value = await openDialog(
      sourceList[p][0].id,
      questionId,
      sourceList[p][1].value
    );
    if (value) {
      const dataCache = [...sourceList];
      dataCache[p][i].value = value;
      handleSourceUpdate([...dataCache]);
    }
  };

  let trailing = false;

  return sourceList.map((line, p) => {
    const locked = !!line[0].locked;

    return (
      <Box className={classes.row} key={`line-${p}`}>
        {line.map((point, i) => {
          const props = { key: `point-${i}` };
          const corner = {
            left: !trailing,
            right: true
          };

          const source = parseSourceValue({ source: point, survey });

          if (source.type === 'set') {
            props.icon = <ArrowForwardIcon className={classes.value} />;

            const labelParts = l`questionScoreVariable`.split('SCORE');
            props.label = (
              <>
                {labelParts[0]}
                <span className={classes.label}>{source.value}</span>
                {labelParts[1]}
              </>
            );
            props.color = 'primary';

            trailing = true;
          }

          if (source.type === 'value') {
            props.icon = <AttachmentIcon className={classes.value} />;
            props.color = 'primary';
            props.variant = 'outlined';

            if (!locked) {
              props.onClick = handleValueUpdate(p, i);
            }

            if (!source.value.length) {
              props.label = l`questionScorePickValue`;
              props.color = 'secondary';
            } else {
              const firstValue = source.value[0];

              if (firstValue.type === 'question') {
                // Input
                let name = l`questionScoreSourceDynamicDefaultTitle`;
                if (firstValue.value !== 'score') {
                  name = firstValue.value[0].value;
                }

                let label = l`questionScoreSourceDynamicDefaultTitle`;
                if (!locked) {
                  label = `${firstValue.source.index + 1}. ${name}`;
                }

                props.label = label;
              } else {
                // Static value
                props.label = `${firstValue.source}.${firstValue.value || 0}`;
              }

              if (source.value.length > 1) {
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
                } ${corner.right ? '16px' : 0} ${corner.left ? '16px' : 0}`
              }}
            />
          );

          if (point.type === 'value' && point.value.length > 1) {
            return (
              <Badge
                key={`point-${i}-badge`}
                badgeContent={
                  point.value.filter(x => x.split('.')[0] !== 'operator').length
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
};
