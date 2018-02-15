import { curry } from 'ramda';

// _getClass :: Int -> DOM Element -> String | Null
const _getClass = (index, dom) => dom.classList.item(index);

export default curry(_getClass);
