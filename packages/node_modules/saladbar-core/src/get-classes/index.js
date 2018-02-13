// _getClasses :: DOM Element -> {k: v} | Null
const _getClasses = dom => (dom.classList.length > 0 ? dom.classList : null);

export default _getClasses;
