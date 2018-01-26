import { JSDOM } from 'jsdom';

const newElement = (count, { attrs, classes, id, styles }) => {
  const el = `<p class="${classes}" id="${id}" ${attrs.join(
    ' '
  )} style="${styles}">Hello!</p>`;
  return el.repeat(count);
};
const createElement = (
  count,
  {
    attrs = ['aria-expanded="false"', 'data-default="true"'],
    classes = 'default-class',
    id = 'default-id',
    styles = { height: '100px' },
  } = {}
) =>
  JSDOM.fragment(
    `<div class="wrapper">${newElement(count, {
      attrs,
      classes,
      id,
      styles,
    })}</div>`
  );

export default createElement;
