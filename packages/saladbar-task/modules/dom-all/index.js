import Task from 'data.task';
import isTask from '../utils/is-task';
import { domAll } from 'saladbar-core';

// _domAll :: String -> DOM Element -> Future Error [DOM Element]
const _domAll = (cs, root = false) => {
  const getDomAll = parent =>
    new Task((rej, res) => {
      const elms = domAll(cs, parent);
      return elms
        ? res(elms)
        : rej({
            error: `An element with the following selector was not found: ${cs}`,
          });
    });

  const withTask = parent =>
    parent.chain(el => getDomAll(el)).rejectedMap(() => ({
      error: `An element with the following selector was not found: ${cs}`,
    }));

  return isTask(root) ? withTask(root) : getDomAll(root);
};

export default _domAll;
