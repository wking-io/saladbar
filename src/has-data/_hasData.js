import { curry, has } from 'ramda';
import { of } from 'fluture';

const _hasData = (prop, el) => of(has(prop, el.dataset));

export default curry(_hasData);
