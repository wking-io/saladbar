import { setStyle } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = () => ({
  error: `Error while trying to run setStyle function.`,
});

// _setStyle :: String -> String -> DOM Element -> Future Error DOM Element
const _setStyle = branchAgain(setStyle, error);

export default _setStyle;
