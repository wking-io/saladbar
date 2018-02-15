import { curry } from 'ramda';
import isArray from '../utils/is-array';

// _classList :: String -> String | [String] -> DOM Element -> DOM Element
const _classList = (method, cn, dom) => {
  isArray(cn) ? dom.classList[method](...cn) : dom.classList[method](cn);
  return dom;
};

export default curry(_classList);
