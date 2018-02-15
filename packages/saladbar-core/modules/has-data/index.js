import { curry } from 'ramda';

const hasData = (prop, dom) => dom.dataset.hasOwnProperty(prop);

export default curry(hasData);
