import { curry } from 'ramda';
import branch from '../utils/branch';
import _getData from './_getData';

// getData :: String -> DOM Element -> Future Error String
const getData = (prop, dom) => branch(_getData(prop))(dom);

export default curry(getData);
