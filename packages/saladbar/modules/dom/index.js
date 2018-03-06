import { Future, isFuture } from 'fluture';
import { dom } from 'saladbar-core';

// _dom :: String -> DOM Element -> Future Error DOM Element
const _dom = (cs, root = false) => {
  const getDom = parent =>
    Future((rej, res) => {
      const elm = dom(cs, parent);
      return elm
        ? res(elm)
        : rej({
            error: `An element with the following selector was not found: ${cs}`,
          });
    });

  const withFuture = parent =>
    parent.chain(el => getDom(el)).mapRej(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  return isFuture(root) ? withFuture(root) : getDom(root);
};

export default _dom;
