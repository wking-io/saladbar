import { Future } from 'fluture';
import { _domAll } from 'saladbar-core';

// domAll :: String -> DOM Element -> Future Error [DOM Element]
const domAll = (cs, root = false) =>
  Future((rej, res) => {
    const elms = _domAll(cs, root);
    return elms
      ? res(elms)
      : rej({
          error: `An element with the following selector was not found: ${cs}`,
        });
  });

export default domAll;
