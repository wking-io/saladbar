import { curry } from 'ramda';
import Task from 'data.task';
import isTask from '../utils/is-task';
import { findParent } from 'saladbar-core';

// taskFindParent :: DOM -> Future Error Bool -> DOM Element -> Future Error DOM Element
const taskFindParent = curry((global, pred, dom) => {
  const doc = global ? global : window.document;

  if (dom === doc.body) {
    return Task.of(dom);
  }

  return pred(dom.parentElement).chain(
    res =>
      res
        ? Task.of(dom.parentElement)
        : taskFindParent(global, pred, dom.parentElement)
  );
});

// _findParent :: DOM -> (DOM Element -> Bool) -> DOM Element -> Future Error DOM Element
const _findParent = (global, pred, dom) =>
  isTask(pred(dom))
    ? taskFindParent(global, pred, dom)
    : Task.of(findParent(global, pred, dom));

export default curry(_findParent);
