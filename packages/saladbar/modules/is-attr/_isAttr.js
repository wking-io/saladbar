import { isAttr } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = attr => ({
  error: `There is not an attribute with the following name on this element: ${attr}`,
});

// _isAttr :: String -> String -> DOM Element -> Future Error Bool
const _isAttr = branchAgain(isAttr, error);

export default _isAttr;
