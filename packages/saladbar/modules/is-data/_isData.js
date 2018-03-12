import { isData } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = prop => ({
  error: `There is not a data-attribute with the following name on this element: ${prop}`,
});

// _isData :: String -> String -> DOM Element -> Future Error Bool
const _isData = branchAgain(isData, error);

export default _isData;
