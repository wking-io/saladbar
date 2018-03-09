import { curry } from 'ramda';
import Task from 'data.task';
import { classList } from 'saladbar-core';

// _classList :: String -> String -> DOM Element -> Future Error DOM Element
const _classList = (method, cn, dom) => Task.of(classList(method, cn, dom));

export default curry(_classList);
