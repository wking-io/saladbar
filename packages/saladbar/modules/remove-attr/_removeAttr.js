import { curry } from 'ramda';
import Either from 'data.either';
import { removeAttr } from 'saladbar-core';

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
const _removeAttr = (attr, dom) =>
  Either.fromNullable(removeAttr(attr, dom)).leftMap(() => ({
    error: 'Error running removeAttr function.',
  }));

export default curry(_removeAttr);
