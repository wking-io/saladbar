import { curry } from 'ramda';

// _setStyle :: String -> String -> DOM Element -> DOM Element
const _setStyle = (prop, val, dom) => {
  dom.style[prop] = val;
  return dom;
};

export default curry(_setStyle);
