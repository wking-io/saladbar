import { curry } from 'ramda';
import Task from 'data.task';
import { removeClass } from 'saladbar-core';

// _removeClass :: String -> String -> DOM Element -> Future Error DOM Element
const _removeClass = (cn, dom) => of(removeClass(cn, dom));

export default curry(_removeClass);
