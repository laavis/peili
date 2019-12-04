/**
 * @file Handle everything to do with the custom score data.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Locale from '../Locale';
import Translation from './questionLocale.json';

const l = Locale(Translation);

export const SCORE_TYPE = {
  ID: 1,
  VALUE: 2,
  CONDITIONAL: 3,
  OPERATOR: 4,
  COMPARATOR: 5
};

export const OPERATOR_TYPE = {
  ADD: 'addition',
  SUBTRACT: 'subtraction',
  MULTIPLY: 'multiplication',
  DIVIDE: 'division'
};

export const OPERATOR_SIGN = {
  '+': OPERATOR_TYPE.ADD,
  '-': OPERATOR_TYPE.SUBTRACT,
  '*': OPERATOR_TYPE.MULTIPLY,
  '/': OPERATOR_TYPE.DIVIDE
};

export const COMPARATOR_TYPE = {
  GREATER_THAN: 1,
  LESS_THAN: 2,
  GREATER_THAN_OR_EQUAL: 3,
  LESS_THAN_OR_EQUAL: 4,
  EQUAL: 5,
  AND: 6,
  OR: 7
};

export const COMPARATOR_SIGN = {
  '>': COMPARATOR_TYPE.GREATER_THAN,
  '<': COMPARATOR_TYPE.LESS_THAN,
  '>=': COMPARATOR_TYPE.GREATER_THAN_OR_EQUAL,
  '<=': COMPARATOR_TYPE.LESS_THAN_OR_EQUAL,
  '=': COMPARATOR_TYPE.EQUAL,
  '&': COMPARATOR_TYPE.AND,
  '|': COMPARATOR_TYPE.OR
};

export const parseScore = score => {
  const parsedScore = {
    id: null,
    name: '',
    steps: []
  };

  for (const row of score) {
    const parts = row.split('.');
    const type = parts[0];

    if (type === 'id') {
      parsedScore.id = parts[1];
      parsedScore.name = row
        .split('.')
        .splice(2)
        .join('.');

      if (parsedScore.id === 'score') {
        parsedScore.name = l`questionScoreSourceDynamicDefaultTitle`;
      }
    }

    if (type === 'value') {
      const from = parts[1];

      if (from === 'static') {
        parsedScore.steps.push({
          type: SCORE_TYPE.VALUE,
          from: null,
          value: `${parts[2]}.${parts[3] || '0'}`
        });
      } else if (from === 'placeholder') {
        parsedScore.steps.push({
          type: SCORE_TYPE.VALUE,
          from: null,
          value: null
        });
      } else {
        parsedScore.steps.push({
          type: SCORE_TYPE.VALUE,
          from: parts[1],
          value: parts[2]
        });
      }
    }

    if (type === 'operator') {
      parsedScore.steps.push({
        type: SCORE_TYPE.OPERATOR,
        sign: OPERATOR_SIGN[parts[1]]
      });
    }

    if (type === 'conditional') {
      parsedScore.steps.push({
        type: SCORE_TYPE.CONDITIONAL,
        step: parts[1]
      });
    }

    if (type === 'comparator') {
      parsedScore.steps.push({
        type: SCORE_TYPE.COMPARATOR,
        compare: COMPARATOR_SIGN[parts[1]]
      });
    }
  }

  return parsedScore;
};

export const createValue = ({ from = null, value }) => {
  if (from === null && value === null) return 'value.placeholder';
  return `value.${from ? from : 'static'}.${value}`;
};

export const createOperator = type => {
  return `operator.${Object.keys(OPERATOR_SIGN).find(
    key => OPERATOR_SIGN[key] === type
  )}`;
};

export const createConditional = () => {
  return [
    'conditional.if',
    'value.placeholder',
    'conditional.then',
    'value.placeholder',
    'conditional.else',
    'value.placeholder',
    'conditional.end'
  ];
};

export const createComparator = type => {
  return `comparator.${Object.keys(COMPARATOR_SIGN).find(
    key => COMPARATOR_SIGN[key] === type
  )}`;
};
