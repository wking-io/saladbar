import { curry } from 'ramda';
import { isFormNode } from 'saladbar-utils';

// prop :: k -> {k: v} -> v
const prop = curry((p, obj) => obj[p]);
// fromPairs :: [[k, v]] -> {k: v}
const fromPairs = pairs =>
  pairs.reduce((acc, [key, val]) => Object.assign(acc, { [key]: val }));
// toArray :: Iter -> [*]
const toArray = iter => Array.from(iter);
// notSubmit :: DOM Element -> Bool
const notSubmit = el => el.type !== 'submit';
// hasName :: DOM Element -> Bool
const hasName = obj => (obj.name && obj.name.length > 0) || false;
// isValidInput :: DOM Element -> Bool
const isValidInput = dom => notSubmit(dom) && hasName(dom);

// ([], DOM Element) -> [[Input Name, Input Value]]
const formReducer = (acc, dom) => {
  if (isValidInput(dom)) {
    return [...acc, [dom.name, dom.value]];
  }
  return acc;
};
// Form Element -> [Input Elements]
const inputsToArray = dom => toArray(prop('elements', dom));
// (([], DOM Element) → [[Input Name, Input Value]]) → [] → [Input Elements] → [[Input Name, Input Value]]
const buildFormObject = arr => arr.reduce(formReducer, []);

// Form Element -> {Input Name: Input Value} | Null
const _serialize = form => {
  if (isFormNode(form)) {
    return fromPairs(buildFormObject(inputsToArray(form)));
  }
  return null;
};

export default _serialize;
