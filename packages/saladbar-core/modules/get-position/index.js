import { curry } from 'ramda';

// _getData :: String -> DOM Element -> String | Null
const _getPosition = dom => {
  const { top, right, bottom, left } = dom.getBoundingClientRect();
  return top && right && bottom && left ? { top, right, bottom, left } : null;
};

export default curry(_getPosition);
