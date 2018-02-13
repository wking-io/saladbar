import { curry } from 'ramda';

const fork = (rej, res, future) => future.fork(rej, res);

export default curry(fork);
