import { all, ifElse } from 'ramda';
import Either from 'data.either';
import isArray from '../is-array';
import isElmNode from '../is-elm-node';

const guaranteeDomEl = el => {
  if (isArray(el)) {
    return ifElse(all(isElmNode), Either.Right, () =>
      Either.Left({
        error: `The one or more values in the array you passed in is not a valid DOM Element.`,
      })
    )(el);
  }
  return ifElse(isElmNode, Either.Right, () =>
    Either.Left({
      error: `The value you passed in is not a valid DOM Element.`,
    })
  )(el);
};

export default guaranteeDomEl;
