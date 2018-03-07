import { curry } from 'ramda';
import Result from 'folktale/result';
import { findParent } from 'saladbar-core';

// futureFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
const eitherFindParent = curry((global, pred, dom) => {
  const doc = global ? global : window.document;

  if (dom === doc.body) {
    return Result.Ok(dom);
  }

  return pred(dom.parentElement).chain(
    res =>
      res
        ? Result.Ok(dom.parentElement)
        : eitherFindParent(global, pred, dom.parentElement)
  );
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
const _findParent = (global, pred, dom) =>
  Result.hasInstance(pred(dom))
    ? eitherFindParent(global, pred, dom)
    : Result.Ok(findParent(global, pred, dom));

export default curry(_findParent);
