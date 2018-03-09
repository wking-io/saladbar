import { curry } from 'ramda';
import Either from 'data.either';
import { findParent } from 'saladbar-core';
import isEither from '../utils/is-either';

// futureFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
const eitherFindParent = curry((global, pred, dom) => {
  const doc = global ? global : window.document;

  if (dom === doc.body) {
    return Either.Right(dom);
  }

  return pred(dom.parentElement).chain(
    res =>
      res
        ? Either.Right(dom.parentElement)
        : eitherFindParent(global, pred, dom.parentElement)
  );
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
const _findParent = (global, pred, dom) =>
  isEither(pred(dom))
    ? eitherFindParent(global, pred, dom)
    : Either.Right(findParent(global, pred, dom));

export default curry(_findParent);
