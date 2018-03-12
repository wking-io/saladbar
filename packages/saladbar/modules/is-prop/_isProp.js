import { isProp } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = prop => ({
  error: `There is not a property with the following name on this element: ${prop}`,
});

// _isProp :: String -> String -> DOM Element -> Future Error Bool
const _isProp = branchAgain(isProp, error);

export default _isProp;
