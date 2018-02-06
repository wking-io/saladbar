import { of, reject } from 'fluture';

// _getAttr :: String -> DOM Element -> Future Error String
const _getClasses = el => {
  const classes = el.classList;
  if (classes.length > 0) {
    return of(classes);
  }

  return reject({
    error: `Sorry, there are no classes on this element.`,
  });
};

export default _getClasses;
