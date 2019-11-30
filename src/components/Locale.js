/**
 * @file A tiny but handy translation library that uses JSON files to translate between different languages.
 * @author Tuomas Pöyry <tuomas.poyry@metropolia.fi>
 */

export default (dataset, language = null) => option => {
  if (!language) language = localStorage.getItem('lang') || 'en';

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
