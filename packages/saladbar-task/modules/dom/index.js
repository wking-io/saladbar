import Task from 'data.task';
import isTask from '../utils/is-task';
import { dom } from 'saladbar-core';

// _dom :: String -> DOM Element -> Future Error DOM Element
const _dom = (cs, root = false) => {
  const getDom = parent =>
    new Task((rej, res) => {
      const elm = dom(cs, parent);
      return elm
        ? res(elm)
        : rej({
            error: `An element with the following selector was not found: ${cs}`,
          });
    });

  const withTask = parent =>
    parent.chain(el => getDom(el)).rejectedMap(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  return isTask(root) ? withTask(root) : getDom(root);
};

export default _dom;
