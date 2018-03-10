import { curry } from 'ramda';
import Task from 'data.task';
import { hasStyle } from 'saladbar-core';

// _hasStyle :: String -> DOM Element -> Future Error Bool
const _hasStyle = (prop, dom) => Task.of(hasStyle(prop, dom));

export default curry(_hasStyle);
