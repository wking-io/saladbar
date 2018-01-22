import { difference } from 'ramda';

const createElement = ({
  classes = ['default-class'],
  attrs = { 'attr-default': 'true' },
  data = { 'data-default': 'true' },
  styles = { height: '100px' },
} = {}) => ({
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
      if (typeof val === 'string') {
        const newClasses = difference([val], this.values);
      } else if (Array.isArray(val)) {
        const newClasses = difference(val, this.classes);
      } else {
        return false;
      }
      this.classes.concat(newClasses);
    },
  },
});

export default createElement;
