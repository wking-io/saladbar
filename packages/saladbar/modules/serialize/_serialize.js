import { of, reject } from 'fluture';
import { serialize } from 'saladbar-core';

// _serialize :: Form Element -> Future e {Input Name: Input Value}
const _serialize = form => {
  const result = serialize(form);

  return result
    ? of(result)
    : reject({ error: `Element supplied is not a valid DOM Form Element.` });
};

export default _serialize;
