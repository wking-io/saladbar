import { curry } from 'ramda';
import Either from 'data.either';
import isEither from '../is-either';

const branchAgain = (fn, errFn, prop, val, dom) =>
  isEither(val)
    ? val
        .chain(v => Either.fromNullable(fn(prop, v, dom)))
        .leftMap(() => errFn(prop))
    : Either.fromNullable(fn(prop, val, dom)).leftMap(() => errFn(prop));

export default curry(branchAgain);
