import { curry } from 'ramda';

// _getStyle :: String -> DOM Element -> String
const _getStyle = (prop, dom) =>
  window.getComputedStyles(dom, null)[prop] || null;

export default curry(_getStyle);
