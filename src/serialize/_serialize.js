import {
  __,
  append,
  both,
  complement,
  compose,
  fromPairs,
  ifElse,
  isEmpty,
  prop,
  props,
  reduce,
  values,
} from 'ramda';
import { of, reject } from 'fluture';
import isFormNode from '../utils/is-form-node';

// DOM Element -> Bool
const notSubmit = el => el.type !== 'submit';
// DOM Element -> Bool
const hasName = compose(complement(isEmpty), prop('name'));
// DOM Element -> Bool
const isValidInput = both(notSubmit, hasName);
// ([], DOM Element) -> [[Input Name, Input Value]]
const formReducer = (acc, el) =>
  ifElse(
    isValidInput,
    compose(append(__, acc), props(['name', 'value'])),
    () => acc
  )(el);
// Form Element -> [Input Elements]
const inputsToArray = compose(values, prop('elements'));
// (([], DOM Element) → [[Input Name, Input Value]]) → [] → [Input Elements] → [[Input Name, Input Value]]
const buildFormObject = reduce(formReducer, []);
// Form Element -> Future e {Input Name: Input Value}
const _serialize = ifElse(
  isFormNode,
  compose(of, fromPairs, buildFormObject, inputsToArray),
  () => reject({ error: `Element supplied is not a valid DOM Form Element.` })
);

export default _serialize;
