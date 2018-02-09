import { curry } from 'ramda';
import branch from '../utils/branch';
import _hasAttr from './_hasAttr';

// _hasClass :: String -> DOM Element -> Bool
const hasAttr = (attr, el) => branch(_hasAttr(attr))(el);

export default curry(hasAttr);
