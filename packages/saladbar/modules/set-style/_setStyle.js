import { setStyle } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = prop => ({
  error: `There is not a data-attribute with the following name on this element: ${prop}`,
});

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = branchAgain(setStyle, error);

export default _setStyle;
