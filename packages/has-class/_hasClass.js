import { curry } from 'ramda';
import { of } from 'fluture';

// _hasClass :: String -> DOM Element -> Future Bool
const _hasClass = curry((classname, el) =>
  of(el.classList.contains(classname))
);

export default _hasClass;
