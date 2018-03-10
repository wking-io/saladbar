import { curry } from 'ramda';
import Task from 'data.task';
import { setProp } from 'saladbar-core';

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
const _setProp = (prop, val, dom) => Task.of(setProp(prop, val, dom));

export default curry(_setProp);
