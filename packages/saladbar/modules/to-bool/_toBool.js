import Either from 'data.either';
import { toBool } from 'saladbar-core';

// _toBool :: String -> Either Error Bool
const _toBool = str =>
  Either.fromNullable(toBool(str)).leftMap(() => ({
    error: `String supplied does not match either true of false.`,
  }));

export default _toBool;
