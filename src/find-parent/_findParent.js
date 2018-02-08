import { curry, ifElse } from 'ramda';
import { of } from 'fluture';

const _findParent = curry((pred, el) => {
  if (el === document.body) {
    return of(el);
  }

  return ifElse(pred, of, _findParent(pred))(el.parentElement);
});

export default _findParent;
