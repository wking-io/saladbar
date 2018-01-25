import { difference } from 'ramda';

const noDiff = 0;
const createElement = ({
  classes = ['default-class'],
  attrs = { 'attr-default': 'true' },
  data = { 'data-default': 'true' },
  styles = { height: '100px' },
} = {}) => ({
  attributes: attrs,
  classList: {
    add(val) {
      let newClasses = [];
      if (typeof val === 'string') {
        newClasses = difference([val], this.values);
      } else if (Array.isArray(val)) {
        newClasses = difference(val, this.values);
      } else {
        return this.values;
      }
      this.values = this.values.concat(newClasses);
      return this.values;
    },
    contains(val) {
      return difference([val], this.values).length === noDiff;
    },
    remove(val) {
      let newClasses = [];
      if (typeof val === 'string') {
        newClasses = difference(this.values, [val]);
      } else if (Array.isArray(val)) {
        newClasses = difference(this.values, val);
      } else {
        return this.values;
      }
      this.values = newClasses;
      return this.values;
    },
    toggle(val) {
      const classExists = difference([val], this.values).length === noDiff;
      if (classExists) {
        const newClassList = difference(this.values, [val]);
        this.values = newClassList;
      } else {
        const newClasses = difference([val], this.values);
        this.values = this.values.concat(newClasses);
      }
      return this.values;
    },
    values: classes,
  },
  dataset: {
    values: data,
  },
  getAttribute(key) {
    return this.attributes.hasOwnProperty(key) ? this.attributes[key] : null;
  },
  hasAttribute(val) {
    return difference([val], Object.keys(this.attributes)).length === noDiff;
  },
  setAttribute(key, val) {
    Object.assign(this.attributes, { key: val });
    return 'done';
  },
  style: styles,
});

export default createElement;
