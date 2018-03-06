import { Future, isFuture } from 'fluture';
import { domAll } from 'saladbar-core';

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
const _domAll = (cs, root = false) => {
  const getDomAll = parent =>
    Future((rej, res) => {
      const elms = domAll(cs, parent);
      return elms
        ? res(elms)
        : rej({
            error: `An element with the following selector was not found: ${cs}`,
          });
    });

  const withFuture = parent =>
    parent.chain(el => getDomAll(el)).mapRej(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  return isFuture(root) ? withFuture(root) : getDomAll(root);
};

export default _domAll;
