import { curry } from 'ramda';
import Either from 'data.either';
import { hasAttr } from 'saladbar-core';

// _hasAttr :: String -> DOM Element -> Future Error Bool
const _hasAttr = (attr, dom) =>
  Either.fromNullable(hasAttr(attr, dom)).leftMap(() => ({
    error: 'Error running hasAttr function.',
  }));

export default curry(_hasAttr);
