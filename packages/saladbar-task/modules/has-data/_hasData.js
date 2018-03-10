import { curry } from 'ramda';
import Task from 'data.task';
import { hasData } from 'saladbar-core';

// _hasData :: String -> DOM Element -> Future Error Bool
const _hasData = (prop, dom) => Task.of(hasData(prop, dom));

export default curry(_hasData);
