import { curry } from 'ramda';
import Task from 'data.task';
import { removeAttr } from 'saladbar-core';

// _removeAttr :: String -> DOM Element -> Future Error DOM Element
const _removeAttr = (attr, dom) => Task.of(removeAttr(attr, dom));

export default curry(_removeAttr);
