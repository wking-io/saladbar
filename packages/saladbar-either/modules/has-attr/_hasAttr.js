import { curry } from 'ramda';
import Result from 'folktale/result';
import { hasAttr } from 'saladbar-core';

// _hasAttr :: String -> DOM Element -> Future Error Bool
const _hasAttr = (attr, dom) =>
  Result.fromNullable(hasAttr(attr, dom), {
    error: 'Error running hasAttr function.',
  });

export default curry(_hasAttr);
