import { all, ifElse } from 'ramda';
import { of, reject } from 'fluture';
import { isArray, isElmNode } from 'saladbar-utils';

const guaranteeDomEl = el => {
  if (isArray(el)) {
    return ifElse(all(isElmNode), of, () =>
      reject({
        error: `The one or more values in the array you passed in is not a valid DOM Element.`,
      })
    )(el);
  }
  return ifElse(isElmNode, of, () =>
    reject({ error: `The value you passed in is not a valid DOM Element.` })
  )(el);
};

export default guaranteeDomEl;
