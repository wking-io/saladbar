import { compose, curry } from 'ramda';
import fork from '../fork';

// runOnEvent :: (Error -> c) -> (a -> b) -> (Event -> Future Error a) -> (Event -> Cancel)
const runOnEvent = (rej, res, fn) => compose(fork(rej, res), fn);

export default curry(runOnEvent);
