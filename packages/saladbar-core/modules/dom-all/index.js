import { isElmNode } from 'saladbar-utils';

// _domAll :: (CSS Selector, DOM Element) -> [DOM Element] | Null
const _domAll = (cs, root = false) => {
  const dom = isElmNode(root)
    ? root.querySelectorAll(cs)
    : document.querySelectorAll(cs);
  return dom.length > 0 ? Array.from(dom) : null;
};

export default _domAll;
