import { chain, compose, ifElse, traverse } from 'ramda';
import Either from 'data.either';
import isArray from '../utils/is-array';
import isEither from '../utils/is-either';
import _toBool from './_toBool';

const makeEither = str => {
  const isString = s => typeof s === 'string';

  if (isEither(str)) {
    return str;
  } else if (isArray(str) && str.map(isString)) {
    return Either.of(str);
  } else if (isString(str)) {
    return Either.of(str);
  }
  return Either.Left({
    error: `Argument ${str} is not a String or Array String.`,
  });
};

const _branch = fn => ifElse(isArray, traverse(Either.of, fn), fn);

const branchBool = (fn, str) => compose(chain(_branch(fn)), makeEither)(str);

const toBool = str => branchBool(_toBool, str);

export default toBool;
