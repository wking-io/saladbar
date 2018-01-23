import { difference } from 'ramda';

const createElement = ({
  classes = ['default-class'],
  attrs = { 'attr-default': 'true' },
  data = { 'data-default': 'true' },
  styles = { height: '100px' },
} = {}) => ({
  attributes: attrs,
  style: styles,
  dataset: {
    values: data,
  },
  setAttribute: () => {},
  classList: {
    values: classes,
    add(val) {
      let newClasses;
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
    remove(val) {
      let newClassList;
      if (typeof val === 'string') {
        newClassList = difference(this.values, [val]);
      } else if (Array.isArray(val)) {
        newClassList = difference(this.values, val);
      } else {
        return this.values;
      }
      this.values = newClassList;
      return this.values;
    },
    toggle(val) {
      const classExists = difference([val], this.values).length === 0;
      if (classExists) {
        const newClassList = difference(this.values, [val]);
        this.values = newClassList;
      } else {
        const newClasses = difference([val], this.values);
        this.values = this.values.concat(newClasses);
      }
      return this.values;
    },
    contains(val) {
      return difference([val], this.values).length === 0;
    },
  },
});

export default createElement;
