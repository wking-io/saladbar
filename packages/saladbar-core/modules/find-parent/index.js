import { curry } from 'ramda';

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> DOM Element
const _findParent = (global = false, pred, dom) => {
  const doc = global ? global : window.document;

  if (dom === doc.body) {
    return dom;
  }

  return pred(dom.parentElement)
    ? dom.parentElement
    : _findParent(doc, pred, dom.parentElement);
};

export default curry(_findParent);
