import _hasAttr from './_hasAttr';
import { branch } from 'saladbar.utils';
import { curry } from 'ramda';

// _hasClass :: String -> DOM Element -> Bool
const hasAttr = curry((attr, el) => branch(_hasAttr(attr))(el));

export default hasAttr;
