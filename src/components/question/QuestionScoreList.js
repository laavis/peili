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
import { parseScore, SCORE_TYPE } from './Score';

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

export const QuestionScoreList = ({
  survey,
  index,
  questionId,
  scoreList,
  setSurvey
}) => {
  const classes = useStyles();

  const handleScoreUpdate = score => {
    setSurvey(
      handleSurveyQuestionUpdate(survey, index, {
        score
      })
    );
  };

  const handleValueUpdate = p => async () => {
    const value = await openDialog(questionId, scoreList[p]);

    if (value) {
      const dataCache = [...scoreList];
      dataCache[p] = value;
      handleScoreUpdate([...dataCache]);
    }
  };

  return scoreList.map((line, p) => {
    // const locked = !!line[0].locked;

    const scoreStepList = parseScore(line);
    const labelParts = l`questionScoreVariable`.split('SCORE');

    const actualStepCount = scoreStepList.steps.filter(
      x => x.type !== SCORE_TYPE.OPERATOR && x.type !== SCORE_TYPE.COMPARATOR
    ).length;
    const hasBadge = actualStepCount > 1;
    const hasContent = !!actualStepCount;
    const isDefault = scoreStepList.id === 'score';

    const currentQuestion = survey.questions.find(x => x.id === questionId);

    let name = l`questionScorePickValue`;
    if (hasContent && scoreStepList.steps[0].type === SCORE_TYPE.VALUE) {
      if (scoreStepList.steps[0].from === null) {
        name = scoreStepList.steps[0].value;
      } else {
        const question = survey.questions.find(
          x => x.id === scoreStepList.steps[0].from
        );
        const score = parseScore(
          question.score.find(
            x => x[0].split('.')[1] === scoreStepList.steps[0].value
          )
        );

        name = score.name;
      }
    }

    if (hasBadge) {
      name += '…';
    }

    const createAnswerScoreName = () => {
      const answerList = [
        ...new Set(currentQuestion.options.map(x => `${x.score}`))
      ];
      return (
        answerList.slice(0, -1).join(',') +
        ` ${l`questionScoreListOr`} ` +
        answerList.slice(-1)
      );
    };

    const chip = (
      <Chip
        icon={<AttachmentIcon className={classes.value} />}
        label={isDefault ? createAnswerScoreName() : name}
        style={{
          borderRadius: '0 16px 16px 0'
        }}
        color={hasContent || isDefault ? 'primary' : 'secondary'}
        variant="outlined"
        onClick={isDefault ? null : handleValueUpdate(p)}
        onDelete={isDefault ? null : () => {}}
      />
    );

    return (
      <Box className={classes.row} key={`line-${p}`}>
        <Chip
          icon={<ArrowForwardIcon className={classes.value} />}
          label={
            <>
              {labelParts[0]}
              <span className={classes.label}>{scoreStepList.name}</span>
              {labelParts[1]}
            </>
          }
          style={{
            borderRadius: '16px 0 0 16px'
          }}
          color="primary"
        />
        {hasBadge && (
          <Badge badgeContent={actualStepCount} max={9} color="secondary">
            {chip}
          </Badge>
        )}
        {!hasBadge && chip}
        {/*
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
        */}

        {isDefault && (
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
