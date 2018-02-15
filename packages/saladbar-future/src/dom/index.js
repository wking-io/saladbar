import { Future } from 'fluture';
import { _dom } from 'saladbar-core';

// dom :: String -> DOM Element -> Future Error DOM Element
const dom = (cs, root = false) =>
  Future((rej, res) => {
    const elm = _dom(cs, root);
    return elm
      ? res(elm)
      : rej({
          error: `An element with the following selector was not found: ${cs}`,
        });
  });

export default dom;
