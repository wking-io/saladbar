import { curry } from 'ramda';
import Task from 'data.task';
import { toggleClass } from 'saladbar-core';

// _toggleClass :: String -> DOM Element -> Future Error DOM Element
const _toggleClass = (cn, dom) => of(toggleClass(cn, dom));

export default curry(_toggleClass);
