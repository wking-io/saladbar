import Either from 'data.either';
import { serialize } from 'saladbar-core';

// _serialize :: Form Element -> Future e {Input Name: Input Value}
const _serialize = form =>
  Either.fromNullable(serialize(form)).leftMap(() => ({
    error: `Element supplied is not a valid DOM Form Element.`,
  }));

export default _serialize;
