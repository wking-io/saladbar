import { difference } from 'ramda';

const makeElement = ({
  classes = ['default-class'],
  attrs = { 'attr-default': 'true' },
  dataset = { 'data-default': 'true' },
  style = { height: '100px' },
} = {}) => ({
  classList: {
    values: classes,
    add: val => {
      this.classList.values.concat(val);
    },
    remove: val => {
      if (typeof val === 'string') {
        const newClasses = difference([val], this.classList.values);
      } else if (Array.isArray(val)) {
        const newClasses = difference(val, this.classList.values);
      } else {
        return false;
      }
      this.classList.values.concat(newClasses);
    },
  },
});
