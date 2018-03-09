import Either from 'data.either';
import { dom } from 'saladbar-core';
import isEither from '../utils/is-either';

// _dom :: String -> DOM Element -> Future Error DOM Element
const _dom = (cs, root = false) => {
  const getDom = parent =>
    Either.fromNullable(dom(cs, parent)).leftMap(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  const withFuture = parent => parent.chain(el => getDom(el));

  return isEither(root) ? withFuture(root) : getDom(root);
};

export default _dom;
