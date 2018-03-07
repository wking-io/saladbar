import { curry } from 'ramda';
import Result from 'folktale/result';
import { setStyle } from 'saladbar-core';

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = (prop, val, dom) =>
  Result.fromNullable(setStyle(prop, val, dom), {
    error: 'Error running setStyle function.',
  });

export default curry(_setStyle);
