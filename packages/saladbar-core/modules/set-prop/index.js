import { curry } from 'ramda';

// _setProp :: String -> String -> DOM Element -> DOM Element
const _setProp = (attr, val, dom) => {
  dom[attr] = val;
  return dom;
};

export default curry(_setProp);
