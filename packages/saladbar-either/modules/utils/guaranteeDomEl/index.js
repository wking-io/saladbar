import { all, ifElse } from 'ramda';
import Result from 'folktale/result';
import isArray from '../is-array';
import isElmNode from '../is-elm-node';

const guaranteeDomEl = el => {
  if (isArray(el)) {
    return ifElse(all(isElmNode), Result.Ok, () =>
      Result.Error({
        error: `The one or more values in the array you passed in is not a valid DOM Element.`,
      })
    )(el);
  }
  return ifElse(isElmNode, Result.Ok, () =>
    Result.Error({
      error: `The value you passed in is not a valid DOM Element.`,
    })
  )(el);
};

export default guaranteeDomEl;
