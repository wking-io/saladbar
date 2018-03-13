import { curry } from 'ramda';

// _getPosition :: String -> DOM Element -> String | Null
const _getPosition = dom => {
  const { top, right, bottom, left } = dom.getBoundingClientRect();
  return top !== null && right !== null && bottom !== null && left !== null
    ? { top, right, bottom, left }
    : null;
};

export default curry(_getPosition);
