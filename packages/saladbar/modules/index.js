import addClass from './add-class';
import classList from './class-list';
import dom from './dom';
import domAll from './dom-all';
import findParent from './find-parent';
import fork from './fork';
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
import serialize from './serialize';
import setAttr from './set-attr';
import setData from './set-data';
import setProp from './set-prop';
import toggleClass from './toggle-class';

const identity = a => a; // eslint-disable-line no-empty-function
const globalFindParent = findParent(false);

export {
  addClass,
  classList,
  dom,
  domAll,
  globalFindParent as findParent,
  fork,
  getAttr,
  getClass,
  getClasses,
  getData,
  getProp,
  hasAttr,
  hasClass,
  hasData,
  hasProp,
  identity,
  removeAttr,
  removeClass,
  serialize,
  setAttr,
  setData,
  setProp,
  toggleClass,
};
