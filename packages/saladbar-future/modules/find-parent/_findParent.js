import { curry } from 'ramda';
import { isFuture } from 'fluture';
import { of } from 'fluture';
import { findParent } from 'saladbar-core';

// futureFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
const futureFindParent = curry((global, pred, dom) => {
  const doc = global ? global : window.document;

  if (dom === doc.body) {
    return of(dom);
  }

  return pred(dom.parentElement).chain(
    res =>
      res
        ? of(dom.parentElement)
        : futureFindParent(global, pred, dom.parentElement)
  );
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
const _findParent = (global, pred, dom) =>
  isFuture(pred(dom))
    ? futureFindParent(global, pred, dom)
    : of(findParent(global, pred, dom));

export default curry(_findParent);
