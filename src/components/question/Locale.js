export default (dataset, language) => option => {
  let section = dataset[option];
  if (!section) return 'Unknown';

  if (typeof section === 'string' && dataset.hasOwnProperty(section)) {
    section = dataset[section];
  }

  let text = 'Unknown';
  if (section.hasOwnProperty(language)) {
    text = section[language];
  } else if (section.hasOwnProperty('en')) {
    text = section['en'];
  }

  return text;
};
