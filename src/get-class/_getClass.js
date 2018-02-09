import { of, reject } from 'fluture';
import { curry } from 'ramda';

// _getAttr :: String -> DOM Element -> Future Error String
const _getClass = (index, el) => {
  const className = el.classList.item(index);
  if (className) {
    return of(className);
  }

  return reject({
    error: `Sorry, there is not a class with an index of ${index}.`,
  });
};

export default curry(_getClass);
