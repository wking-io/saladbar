import { curry, has } from 'ramda';
import { of } from 'fluture';

const _hasData = curry((prop, el) => of(has(prop, el.dataset)));

export default _hasData;
