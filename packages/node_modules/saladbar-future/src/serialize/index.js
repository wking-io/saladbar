import branch from '../utils/branch';
import _serialize from './_serialize';

const serialize = el => branch(_serialize)(el);

export default serialize;
