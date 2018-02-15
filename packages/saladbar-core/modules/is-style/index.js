import { curry } from 'ramda';

// _isStyle :: String -> String -> DOM Element -> Bool
const _isStyle = (prop, val, dom) => {
  const domStyles = window.getComputedStyle(dom, null);
  return domStyles.hasOwnProperty(prop) ? domStyles[prop] === val : null;
};

export default curry(_isStyle);
