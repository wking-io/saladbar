import { compose, curry } from 'ramda';
import getProp from '../get-prop';
import hasProp from '../has-prop';

const hasData = curry((prop, el) =>
  compose(hasProp(prop), getProp('dataset'))(el)
);

export default hasData;
