/**
 * @file Helper functions for question logic and data that are used in multiple different components.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

import Translation from './questionLocale.json';
import Locale from '../Locale';
import uuid from 'uuid/v4';
import OptionDefaults from './QuestionOptionDefaults';

const l = Locale(Translation);

/**
 * List all possible outgoing routes for a question.
 */
export const listPossibleRoutes = (questionList, questionIndex) => {
  return [...questionList.filter((x, i) => i > questionIndex)];
};

/**
 * List all active incoming routes for a question.
 */
export const listIncomingRoutes = (questionList, questionIndex) => {
  const question = questionList[questionIndex];

  let routeList = [];
  for (const q of questionList) {
    routeList = [
      ...routeList,
      ...q.options
        .filter(x => x.route === question.id)
        .map(x => ({ question: q, option: x }))
    ];
  }

  if (questionIndex !== 0 && !questionList[questionIndex - 1].defaultRoute) {
    routeList.unshift({
      option: null,
      question: questionList[questionIndex - 1]
    });
  }

  for (const route of routeList) {
    if (route.question && route.question.type === 'text' && route.option) {
      route.option.name = l('questionOptionEmptyRouteLabel');
    }
  }

  return routeList;
};

/**
 * List all active outgoing routes for a question.
 */
export const listOutgoingRoutes = (questionList, questionIndex) => {
  const question = questionList[questionIndex];

  const routeList = question.options
    .filter(x => x.route)
    .map(x => ({
      option: x,
      question: questionList.find(y => y.id === x.route)
    }));

  let defaultRoute = getDefaultRoute(questionList, questionIndex);
  if (defaultRoute === 'end' || !defaultRoute) {
    defaultRoute = { option: null, question: null };
  } else {
    defaultRoute = {
      option: null,
      question: questionList.find(x => x.id === defaultRoute.id)
    };
  }

  if (routeList.length < question.options.length || question.type === 'text') {
    routeList.push(defaultRoute);
  }

  if (question.type === 'text') {
    for (let route of routeList) {
      if (route.option) {
        route.option.name = l('questionOptionEmptyRouteLabel');
      }
    }
  }

  return routeList;
};

/**
 * Get the default next question for a specific question.
 */
export const getDefaultRoute = (questionList, questionIndex) => {
  const question = questionList[questionIndex];

  let defaultRoute = null;
  if (
    question.defaultRoute === 'end' ||
    (!question.defaultRoute && questionList.length === questionIndex + 1)
  ) {
    defaultRoute = 'end';
  } else if (question.defaultRoute) {
    defaultRoute = questionList.find(x => x.id === question.defaultRoute);
  } else {
    defaultRoute = questionList[questionIndex + 1];
  }

  return defaultRoute;
};

/**
 * Get the number of a default next question for a specific question.
 */
export const getDefaultRouteNumber = (questionList, questionIndex) => {
  const route = getDefaultRoute(questionList, questionIndex);
  if (route === 'end') return null;
  return route ? `${route.index + 1}.` : null;
};

/**
 * Decide if a "modified score" badge should be visible in a question.
 */
export const checkScoreStatus = question => {
  // TODO: Add support for custom score

  if (question.type === 'text') return false;
  if (question.type === 'selectOne' || question.type === 'selectMultiple') {
    for (let i = 0; i < question.options.length; i++) {
      if (question.options[i].score !== i) return true;
    }
  }
};

/**
 * Decide if a "modified route" badge should be visible in a question.
 */
export const checkRouteStatus = question => {
  if (question.defaultRoute) return true;
  for (const option of question.options) {
    if (option.route) return true;
  }

  return false;
};

/**
 * Generate the data for a new empty question with default values fo type.
 */
export const generateEmptyQuestion = (index, type) => {
  const id = uuid();

  return {
    id,
    index,
    title: `${l('questionDefaultName')} #${index + 1}`,
    type,
    defaultRoute: null,
    options: [...OptionDefaults[type].many],
    score: [['id.score']]
  };
};

/**
 * Create a new empty question of type.
 */
export const handleSurveyQuestionCreate = (survey, type) => {
  let surveyUpdate = { ...survey };
  surveyUpdate.questions = [
    ...surveyUpdate.questions,
    { ...generateEmptyQuestion(surveyUpdate.questions.length, type) }
  ];

  return surveyUpdate;
};

/**
 * Update a specific question.
 */
export const handleSurveyQuestionUpdate = (survey, index, question) => {
  let surveyUpdate = { ...survey };
  surveyUpdate.questions[index] = {
    ...surveyUpdate.questions[index],
    ...question
  };

  return surveyUpdate;
};

/**
 * Switch places of two specific questions.
 */
export const handleSurveyQuestionReorder = (survey, a, b) => {
  let surveyUpdate = { ...survey };
  let questionCache = surveyUpdate.questions[a];

  surveyUpdate.questions[a] = surveyUpdate.questions[b];
  surveyUpdate.questions[b] = questionCache;

  surveyUpdate.questions = surveyUpdate.questions.map((x, i) => ({
    ...x,
    index: i
  }));

  return surveyUpdate;
};

/**
 * Create a new empty option with default values fo type.
 */
export const handleSurveyOptionCreate = (survey, questionIndex, type) => {
  let surveyUpdate = { ...survey };
  let questionUpdate = { ...surveyUpdate.questions[questionIndex] };

  questionUpdate.options.push(
    OptionDefaults[type].one(questionUpdate.options.length)
  );

  surveyUpdate.questions[questionIndex] = questionUpdate;

  return surveyUpdate;
};

/**
 * Update a specific option.
 */
export const handleSurveyOptionUpdate = (
  survey,
  questionIndex,
  optionIndex,
  option
) => {
  let surveyUpdate = { ...survey };
  let questionUpdate = { ...surveyUpdate.questions[questionIndex] };

  questionUpdate.options[optionIndex] = {
    ...questionUpdate.options[optionIndex],
    ...option
  };

  surveyUpdate.questions[questionIndex] = questionUpdate;

  return surveyUpdate;
};

/**
 * Switch places of two specific options.
 */
export const handleSurveyOptionReorder = (survey, index, a, b) => {
  let surveyUpdate = { ...survey };
  let questionUpdate = { ...surveyUpdate.questions[index] };
  let optionCache = questionUpdate.options[a];

  questionUpdate.options[a] = questionUpdate.options[b];
  questionUpdate.options[b] = optionCache;

  surveyUpdate.questions[index] = questionUpdate;

  return surveyUpdate;
};

/**
 * Remove a specific option.
 */
export const handleSurveyOptionRemove = (
  survey,
  questionIndex,
  optionIndex
) => {
  let surveyUpdate = { ...survey };
  let questionUpdate = { ...surveyUpdate.questions[questionIndex] };

  questionUpdate.options.splice(optionIndex, 1);

  surveyUpdate.questions[questionIndex] = questionUpdate;

  return surveyUpdate;
};
