import future from 'fluture';
import isElmNode from 'saladbar.utils/is-elm-node';

const dom = (selector, root = false) =>
  future((rej, res) => {
    const el = isElmNode(root)
      ? root.querySelector(selector)
      : document.querySelector(selector);
    el
      ? res(el)
      : rej({ error: `Element with selector ${selector} not found.` });
  });

export default dom;
