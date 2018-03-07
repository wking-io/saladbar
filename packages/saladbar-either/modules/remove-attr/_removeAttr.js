import { curry } from 'ramda';
import Result from 'folktale/result';
import { removeAttr } from 'saladbar-core';

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
const _removeAttr = (attr, dom) =>
  Result.fromNullable(removeAttr(attr, dom), {
    error: 'Error running removeAttr function.',
  });

export default curry(_removeAttr);
