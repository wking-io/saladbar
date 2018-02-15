import { curry } from 'ramda';

// _replaceClass :: String -> String -> DOM Element -> DOM Element
const _replaceClass = (ocn, ncn, dom) => {
  dom.classList.replace(ocn, ncn);
  return dom;
};

export default curry(_replaceClass);
