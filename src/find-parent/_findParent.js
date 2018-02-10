import { curry, ifElse, identity, chain, compose } from 'ramda';
import { of, isFuture } from 'fluture';

const _findParent = (pred, dom, el) => {
  const doc = dom ? dom : document;
  if (el === doc.body) {
    return of(el);
  }

  return isFuture(pred(el.parentElement))
    ? compose(
        chain(
          ifElse(
            identity,
            () => of(el.parentElement),
            () => _findParent(pred, dom, el.parentElement)
          )
        ),
        pred
      )(el.parentElement)
    : ifElse(pred, of, _findParent(pred, dom))(el.parentElement);
};

export default curry(_findParent);
