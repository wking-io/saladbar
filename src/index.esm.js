import addClass from './add-class';
import classList from './class-list';
import dom from './dom';
import domAll from './dom-all';
import findParent from './find-parent';
import getAttr from './get-attr';
import getClass from './get-class';
import getClasses from './get-classes';
import getData from './get-data';
import getProp from './get-prop';
import hasAttr from './has-attr';
import hasClass from './has-class';
import hasData from './has-data';
import hasProp from './has-prop';
import removeAttr from './remove-attr';
import removeClass from './remove-class';
import removeData from './remove-data';
import serialize from './serialize';
import setAttr from './set-attr';
import setData from './set-data';
import setProp from './set-prop';
import toggleClass from './toggle-class';

const noop = () => {}; // eslint-disable-line no-empty-function
const globalFindParent = findParent();

export {
  addClass,
  classList,
  dom,
  domAll,
  globalFindParent as findParent,
  getAttr,
  getClass,
  getClasses,
  getData,
  getProp,
  hasAttr,
  hasClass,
  hasData,
  hasProp,
  noop,
  removeAttr,
  removeClass,
  removeData,
  serialize,
  setAttr,
  setData,
  setProp,
  toggleClass,
};
