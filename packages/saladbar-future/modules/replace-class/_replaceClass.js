import { curry } from 'ramda';
import Task from 'data.task';
import { replaceClass } from 'saladbar-core';

// _replaceClass :: String -> String -> DOM Element -> Future Error DOM Element
const _removeClass = (ocn, ncn, dom) => of(replaceClass(ocn, ncn, dom));

export default curry(_removeClass);
