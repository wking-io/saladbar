import { compose, curry } from 'ramda';
import getProp from 'saladbar.getprop';
import hasProp from 'saladbar.hasprop';

const hasData = curry((prop, el) =>
  compose(hasProp(prop), getProp('dataset'))(el)
);

export default hasData;
