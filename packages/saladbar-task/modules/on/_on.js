import { curry } from 'ramda';
import Task from 'data.task';
import { on } from 'saladbar-core';

// _on :: String -> Future Error a -> DOM Element -> Future Error DOM Element
const _on = (event, handler, dom) => Task.of(on(event, handler, dom));

export default curry(_on);
