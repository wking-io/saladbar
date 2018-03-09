import Either from 'data.either';
import { curry } from 'ramda';
import { getData } from 'saladbar-core';

// _getData :: String -> DOM Element -> Future Error String
const _getData = (prop, dom) =>
  Either.fromNullable(getData(prop, dom)).leftMap(() => ({
    error: `No attribute was found with the following name: ${prop}`,
  }));

export default curry(_getData);
