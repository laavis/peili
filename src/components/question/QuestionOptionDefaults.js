import Translation from './questionLocale.json';
import Locale from '../Locale';
import uuid from 'uuid/v4';

const l = Locale(Translation);

const defaults = {
  selectOne: {
    one: index => ({
      id: uuid(),
      name: `${l('questionOptionDefaultName')} #${index + 1}`,
      score: index,
      route: null
    }),
    many: [
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #1`,
        score: 0,
        route: null
      },
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #2`,
        score: 1,
        route: null
      },
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #3`,
        score: 2,
        route: null
      }
    ]
  },
  selectMultiple: {
    one: index => ({
      id: uuid(),
      name: `${l('questionOptionDefaultName')} #${index + 1}`,
      score: index,
      route: null
    }),
    many: [
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #1`,
        score: 0,
        route: null
      },
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #2`,
        score: 1,
        route: null
      },
      {
        id: uuid(),
        name: `${l('questionOptionDefaultName')} #3`,
        score: 2,
        route: null
      }
    ]
  },
  text: {
    many: [
      {
        id: uuid(),
        name: l('questionOptionNameLabel'),
        score: 0,
        route: null
      }
    ]
  }
};

export default defaults;
