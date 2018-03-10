import { curry } from 'ramda';
import Task from 'data.task';
import { hasAttr } from 'saladbar-core';

// _hasAttr :: String -> DOM Element -> Future Error Bool
const _hasAttr = (attr, dom) => Task.of(hasAttr(attr, dom));

export default curry(_hasAttr);
