const elNodeType = 1;
const formNodeName = 'FORM';
const isFormNode = el =>
  el && el.nodeType === elNodeType && el.nodeName === formNodeName;

export default isFormNode;
