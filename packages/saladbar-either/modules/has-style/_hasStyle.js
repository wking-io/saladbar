import { curry } from 'ramda';
import Either from 'data.either';
import { hasStyle } from 'saladbar-core';

// _hasStyle :: String -> DOM Element -> Future Error Bool
const _hasStyle = (prop, dom) =>
  Either.fromNullable(hasStyle(prop, dom)).leftMap(() => ({
    error: 'Error running hasStyle function.',
  }));

export default curry(_hasStyle);
