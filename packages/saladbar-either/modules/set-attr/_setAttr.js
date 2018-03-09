import { curry } from 'ramda';
import Either from 'data.either';
import { setAttr } from 'saladbar-core';

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = (attr, val, dom) =>
  Either.fromNullable(setAttr(attr, val, dom)).leftMap(() => ({
    error: 'Error running setAttr function.',
  }));

export default curry(_setAttr);
