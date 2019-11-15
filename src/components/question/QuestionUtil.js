import Translation from './questionLocale.json';
import Locale from '../Locale';

const l = Locale(Translation, 'fi');

export const listPossibleRoutes = (questionList, questionIndex) => {
  return [...questionList.filter((x, i) => i > questionIndex)];
};

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

export const getDefaultRouteNumber = (questionList, questionIndex) => {
  const route = getDefaultRoute(questionList, questionIndex);
  if (route === 'end') return null;
  return route ? `${route.index + 1}.` : null;
};

export const checkRouteStatus = question => {
  if (question.defaultRoute) return true;
  for (const option of question.options) {
    if (option.route) return true;
  }

  return false;
};

export const handleSurveyQuestionUpdate = (survey, index, question) => {
  let surveyUpdate = { ...survey };
  surveyUpdate.questions[index] = {
    ...surveyUpdate.questions[index],
    ...question
  };

  return surveyUpdate;
};

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

export const handleSurveyOptionReorder = (survey, index, a, b) => {
  let surveyUpdate = { ...survey };
  let questionUpdate = { ...surveyUpdate.questions[index] };
  let optionCache = questionUpdate.options[a];

  questionUpdate.options[a] = questionUpdate.options[b];
  questionUpdate.options[b] = optionCache;

  surveyUpdate.questions[index] = questionUpdate;

  return surveyUpdate;
};
