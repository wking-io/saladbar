import { curry } from 'ramda';
import Result from 'folktale/result';
import { hasStyle } from 'saladbar-core';

// _hasStyle :: String -> DOM Element -> Future Error Bool
const _hasStyle = (prop, dom) =>
  Result.fromNullable(hasStyle(prop, dom), {
    error: 'Error running hasStyle function.',
  });

export default curry(_hasStyle);
