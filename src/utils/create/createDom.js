import { JSDOM } from 'jsdom';

const createDom = classname =>
  new JSDOM(
    `<!DOCTYPE html><div class="wrapper"><p class="${classname}">Hello world</p></div>`
  );

export default createDom;
