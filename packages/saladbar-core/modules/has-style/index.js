import { curry } from 'ramda';

const _hasStyle = (prop, dom) =>
  window.getComputedStyle(dom, null).hasOwnProperty(prop);

export default curry(_hasStyle);
