import { setData } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = prop => ({
  error: `The following data attribute you passed in is not valid: ${prop}`,
});

// _setData :: String -> String -> DOM Element -> Future Error DOM Element
const _setData = branchAgain(setData, error);

export default _setData;
