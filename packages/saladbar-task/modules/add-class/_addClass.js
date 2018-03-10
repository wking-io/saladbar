import { curry } from 'ramda';
import Task from 'data.task';
import { addClass } from 'saladbar-core';

// _addClass :: String -> DOM Element -> Future Error DOM Element
const _addClass = (cn, dom) => Task.of(addClass(cn, dom));

export default curry(_addClass);
