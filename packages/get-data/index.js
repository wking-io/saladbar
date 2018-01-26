import { compose, curry } from 'ramda';
import getProp from 'saladbar.getProp';

const getData = curry((prop, el) =>
  compose(getProp(prop), getProp('dataset'))(el)
);

export default getData;
