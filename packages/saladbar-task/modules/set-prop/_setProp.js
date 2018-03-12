import { setProp } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = () => ({
  error: `Error while trying to run setProp function.`,
});

// _setProp :: String -> String -> DOM Element -> Future Error DOM Element
const _setProp = branchAgain(setProp, error);

export default _setProp;
