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

  let defaultRoute = question.defaultRoute;
  if (defaultRoute === 'end' || questionIndex === questionList.length - 1) {
    defaultRoute = { option: null, question: null };
  } else {
    defaultRoute = {
      option: null,
      question: questionList.find(x => x.id === defaultRoute)
    };
  }

  routeList.push(defaultRoute);

  return routeList;
};

export const getDefaultRouteNumber = (questionList, questionIndex) => {
  const question = questionList[questionIndex];

  let defaultNextQuestionNumber = null;
  if (question.defaultRoute === 'end') {
    defaultNextQuestionNumber = null;
  } else if (question.defaultRoute) {
    defaultNextQuestionNumber = `${questionList.find(
      x => x.id === question.defaultRoute
    ).index + 1}.`;
  } else if (questionList.length - 1 < questionIndex) {
    defaultNextQuestionNumber = `${questionIndex + 2}.`;
  }

  return defaultNextQuestionNumber;
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
