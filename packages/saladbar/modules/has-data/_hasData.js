import { curry } from 'ramda';
import Either from 'data.either';
import { hasData } from 'saladbar-core';

// _hasData :: String -> DOM Element -> Future Error Bool
const _hasData = (prop, dom) =>
  Either.fromNullable(hasData(prop, dom)).leftMap(() => ({
    error: 'Error running hasData function.',
  }));

export default curry(_hasData);
