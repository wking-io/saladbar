import { curry } from 'ramda';

const fork = (rej, res, task) => task.fork(rej, res);

export default curry(fork);
