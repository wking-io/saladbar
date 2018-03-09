import { curry } from 'ramda';
import Either from 'data.either';
import { setStyle } from 'saladbar-core';

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = (prop, val, dom) =>
  Either.fromNullable(setStyle(prop, val, dom)).leftMap(() => ({
    error: 'Error running setStyle function.',
  }));

export default curry(_setStyle);
