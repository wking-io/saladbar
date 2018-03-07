import Result from 'folktale/result';
import { dom } from 'saladbar-core';

// _dom :: String -> DOM Element -> Future Error DOM Element
const _dom = (cs, root = false) => {
  const getDom = parent =>
    Result.fromNullable(dom(cs, parent), {
      error: `An element with the following selector was not found: ${cs}`,
    });

  const withFuture = parent => parent.chain(el => getDom(el));

  return Result.hasInstance(root) ? withFuture(root) : getDom(root);
};

export default _dom;
