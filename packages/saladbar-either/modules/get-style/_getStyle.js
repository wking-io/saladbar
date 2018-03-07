import Result from 'folktale/result';
import { curry } from 'ramda';
import { getStyle } from 'saladbar-core';

// _getStyle :: String -> DOM Element -> Future Error String
const _getStyle = (prop, dom) =>
  Result.fromNullable(getStyle(prop, dom), {
    error: `No style property was found with the following name: ${prop}`,
  });

export default curry(_getStyle);
