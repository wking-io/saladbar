import Either from 'data.either';
import { domAll } from 'saladbar-core';
import isEither from '../utils/is-either';

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
const _domAll = (cs, root = false) => {
  const getDomAll = parent =>
    Either.fromNullable(domAll(cs, parent)).leftMap(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  const withFuture = parent => parent.chain(el => getDomAll(el));

  return isEither(root) ? withFuture(root) : getDomAll(root);
};

export default _domAll;
