import { curry } from 'ramda';
import Result from 'folktale/result';
import { hasData } from 'saladbar-core';

// _hasData :: String -> DOM Element -> Future Error Bool
const _hasData = (prop, dom) =>
  Result.fromNullable(hasData(prop, dom), {
    error: 'Error running hasData function.',
  });

export default curry(_hasData);
