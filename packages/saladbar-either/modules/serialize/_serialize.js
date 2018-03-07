import Result from 'folktale/result';
import { serialize } from 'saladbar-core';

// _serialize :: Form Element -> Future e {Input Name: Input Value}
const _serialize = form =>
  Result.fromNullable(serialize(form), {
    error: `Element supplied is not a valid DOM Form Element.`,
  });

export default _serialize;
