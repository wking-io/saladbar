import branch from '../utils/branch';
import _serialize from './_serialize';

// serialize :: Form Element -> Future e {Input Name: Input Value}
const serialize = form => branch(_serialize)(form);

export default serialize;
