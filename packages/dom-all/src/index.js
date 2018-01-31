import future from 'fluture';
import { isElmNode } from 'saladbar.utils';

const emptyArray = 0;
const domAll = (selector, root = false) =>
  future((rej, res) => {
    const elms = isElmNode(root)
      ? root.querySelectorAll(selector)
      : document.querySelectorAll(selector);
    elms.length > emptyArray
      ? res(Array.from(elms))
      : rej({ error: `Elements with selector ${selector} not found.` });
  });

export default domAll;
