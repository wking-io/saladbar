import Either from 'data.either';
import { curry } from 'ramda';
import { getStyle } from 'saladbar-core';

// _getStyle :: String -> DOM Element -> Future Error String
const _getStyle = (prop, dom) =>
  Either.fromNullable(getStyle(prop, dom)).leftMap(() => ({
    error: `No style property was found with the following name: ${prop}`,
  }));

export default curry(_getStyle);
