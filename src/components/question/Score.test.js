/**
 * @file Test everything to do with the custom score data.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import * as Score from './Score';
import assert from 'assert';

it('creates a value', () => {
  const value = Score.createValue({ from: 'q', value: 'v' });

  assert.equal(value, 'value.q.v');
});

it('creates a static value', () => {
  const value = Score.createValue({ from: null, value: 5.13 });

  assert.equal(value, 'value.static.5.13');
});

it('creates a placeholder value', () => {
  const value = Score.createValue({ from: null, value: null });

  assert.equal(value, 'value.placeholder');
});

it('creates a operator of type', () => {
  for (const type of Object.values(Score.OPERATOR_TYPE)) {
    const value = Score.createOperator(type);

    assert.equal(
      value,
      `operator.${Object.keys(Score.OPERATOR_SIGN).find(
        x => Score.OPERATOR_SIGN[x] === type
      )}`
    );
  }
});

it('creates a conditional with placeholders', () => {
  const value = Score.createConditional();

  assert.deepEqual(value, [
    'conditional.if',
    'value.placeholder',
    'conditional.then',
    'value.placeholder',
    'conditional.end'
  ]);
});

it('creates a comparator of type', () => {
  for (const type of Object.values(Score.COMPARATOR_TYPE)) {
    const value = Score.createComparator(type);

    assert.equal(
      value,
      `comparator.${Object.keys(Score.COMPARATOR_SIGN).find(
        x => Score.COMPARATOR_SIGN[x] === type
      )}`
    );
  }
});

it('parses a score correctly', () => {
  const score = [
    'id.test.test 1.2.3',
    'conditional.if',
    'value.static.2.12',
    'comparator.>',
    'value.static.2.11',
    'comparator.&',
    'value.q1.v1',
    'comparator.<=',
    'value.q2.v2',
    'conditional.then',
    'value.q1.v1',
    'conditional.else',
    'value.placeholder',
    'conditional.end'
  ];

  const value = Score.parseScore(score);

  assert.deepEqual(value, {
    id: 'test',
    name: 'test 1.2.3',
    steps: [
      { type: 3, step: 'if' },
      { type: 2, from: null, value: '2.12' },
      { type: 5, compare: 1 },
      { type: 2, from: null, value: '2.11' },
      { type: 5, compare: 6 },
      { type: 2, from: 'q1', value: 'v1' },
      { type: 5, compare: 4 },
      { type: 2, from: 'q2', value: 'v2' },
      { type: 3, step: 'then' },
      { type: 2, from: 'q1', value: 'v1' },
      { type: 3, step: 'else' },
      { type: 2, from: null, value: null },
      { type: 3, step: 'end' }
    ]
  });
});
