import { curry } from 'ramda';

// _on :: String -> (a -> b) -> DOM Element -> DOM Element
const _on = (event, handler, dom) => {
  dom.addEventListener(event, handler, dom);
  return dom;
};

export default curry(_on);
