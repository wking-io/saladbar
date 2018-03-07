import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasData from './_hasData';

// hasData :: String -> DOM Element -> Future Error Bool
const hasData = (prop, dom) => branch(_hasData(prop))(dom);

export default curry(hasData);
