import Result from 'folktale/result';
import { domAll } from 'saladbar-core';

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
const _domAll = (cs, root = false) => {
  const getDomAll = parent =>
    Result.fromNullable(domAll(cs, parent), {
      error: `An element with the following selector was not found: ${cs}`,
    });

  const withFuture = parent => parent.chain(el => getDomAll(el));

  return Result.hasInstance(root) ? withFuture(root) : getDomAll(root);
};

export default _domAll;
