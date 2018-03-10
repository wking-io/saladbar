import { curry } from 'ramda';
import Task from 'data.task';
import { setStyle } from 'saladbar-core';

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = (prop, val, dom) => Task.of(setStyle(prop, val, dom));

export default curry(_setStyle);
