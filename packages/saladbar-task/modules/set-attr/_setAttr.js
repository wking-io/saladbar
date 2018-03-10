import { curry } from 'ramda';
import Task from 'data.task';
import { setAttr } from 'saladbar-core';

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = (attr, val, dom) => Task.of(setAttr(attr, val, dom));

export default curry(_setAttr);
