import { curry } from 'ramda';
import branch from '../utils/branch';
import _on from './_on';

// _replaceClass :: String -> Future Error a -> DOM Element -> Future Error DOM Element
const _removeClass = (event, handler, dom) => branch(_on(event, handler))(dom);

export default curry(_removeClass);
