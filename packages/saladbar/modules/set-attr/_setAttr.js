import { setAttr } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = () => ({
  error: 'Error running setAttr function.',
});

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = branchAgain(setAttr, error);

export default _setAttr;
