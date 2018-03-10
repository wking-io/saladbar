import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasProp from './_hasStyle';

// hasStyle :: String -> DOM Element -> Future Error Bool
const hasStyle = (prop, dom) => branch(_hasProp(prop))(dom);

export default curry(hasStyle);
