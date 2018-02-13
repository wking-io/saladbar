/* eslint-disable */
// POLYFILLS
if (typeof Object.assign !== 'function') {
  // Must be writable: true, enumerable: false, configurable: true
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      // .length of function is 2

      if (target == null) {
        // TypeError if undefined or null
        throw new TypeError('Cannot convert undefined or null to object');
      }

      const to = Object(target);

      for (let index = 1; index < arguments.length; index++) {
        const nextSource = arguments[index];

        if (nextSource != null) {
          // Skip over if undefined or null
          for (const nextKey in nextSource) {
            // Avoid bugs when hasOwnProperty is shadowed
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
}

if (!Object.entries) {
  Object.entries = function(obj) {
    let ownProps = Object.keys(obj),
      i = ownProps.length,
      resArray = new Array(i); // Preallocate the Array
    while (i--) resArray[i] = [ownProps[i], obj[ownProps[i]]];

    return resArray;
  };
}
/* eslint-enable */

// MODULE

const notProp = not => prop => prop !== not;
const pairToObj = (acc, [key, value]) => Object.assign(acc, { [key]: value });

const removeProp = (prop, obj) =>
  Object.entries(obj)
    .filter(notProp(prop))
    .reduce(pairToObj, {});

export default removeProp;
