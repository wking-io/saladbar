import isElmNode from '../utils/is-elm-node';

// _dom :: (CSS Selector, DOM Element) -> DOM Element | Null
const _dom = (cs, root = false) =>
  isElmNode(root) ? root.querySelector(cs) : document.querySelector(cs);

export default _dom;
