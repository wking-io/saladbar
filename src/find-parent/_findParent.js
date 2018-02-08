import { curry, ifElse, identity, chain, compose } from 'ramda';
import { of, isFuture } from 'fluture';

const _findParent = curry((pred, dom, el) => {
  if (el === dom.body) {
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
});

export default _findParent;
