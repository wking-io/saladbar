import { setAttr } from 'saladbar-core';
import branchAgain from '../utils/branchAgain';

const error = () => ({
  error: `Error while trying to run setAttr function.`,
});

// _setAttr :: String -> String -> DOM Element -> Future Error DOM Element
const _setAttr = branchAgain(setAttr, error);

export default _setAttr;
