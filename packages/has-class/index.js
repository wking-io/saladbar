import _hasClass from './_hasClass';
import branch from 'saladbar.utils/branch';
import { curry } from 'ramda';

// _hasClass :: String -> DOM Element -> Bool
const hasClass = curry((className, el) => branch(_hasClass(className))(el));

export default hasClass;
