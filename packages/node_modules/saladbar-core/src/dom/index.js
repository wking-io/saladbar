import { isElmNode } from 'saladbar-utils';

// _dom :: (CSS Selector, DOM Element) -> DOM Element | Null
const _dom = (cs, root = false) =>
  isElmNode(root) ? root.querySelector(cs) : document.querySelector(cs);

export default _dom;
