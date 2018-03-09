import Either from 'data.either';
import { getPosition } from 'saladbar-core';

// _getPosition :: String -> DOM Element -> Future Error String
const _getPosition = dom =>
  Either.fromNullable(getPosition(dom)).leftMap(() => ({
    error: `Element position was not able to be found was found.`,
  }));

export default _getPosition;
