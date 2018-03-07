import Result from 'folktale/result';
import { curry } from 'ramda';
import { getData } from 'saladbar-core';

// _getData :: String -> DOM Element -> Future Error String
const _getData = (prop, dom) =>
  Result.fromNullable(getData(prop, dom), {
    error: `No attribute was found with the following name: ${prop}`,
  });

export default curry(_getData);
