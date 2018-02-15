import { Future } from 'fluture';
import { dom } from 'saladbar-core';

// _dom :: String -> DOM Element -> Future Error DOM Element
const _dom = (cs, root = false) =>
  Future((rej, res) => {
    const elm = dom(cs, root);
    return elm
      ? res(elm)
      : rej({
          error: `An element with the following selector was not found: ${cs}`,
        });
  });

export default _dom;
