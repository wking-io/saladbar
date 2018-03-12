import { isStyle } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = prop => ({
  error: `There is not a style property with the following name on this element: ${prop}`,
});

// _isStyle :: String -> String -> DOM Element -> Future Error Bool
const _isStyle = branchAgain(isStyle, error);

export default _isStyle;
