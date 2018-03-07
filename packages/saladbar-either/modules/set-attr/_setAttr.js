import { curry } from 'ramda';
import Result from 'folktale/result';
import { setAttr } from 'saladbar-core';

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = (attr, val, dom) =>
  Result.fromNullable(setAttr(attr, val, dom), {
    error: 'Error running setAttr function.',
  });

export default curry(_setAttr);
