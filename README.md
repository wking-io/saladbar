# saladbar 🥗

Welcome to saladbar, a library of DOM functions built for composition that takes a functional approach to working with the DOM.

**Why the name saladbar?** This library is used by combining smaller functions to build up chained DOM interactions and then consume it with a fork:

```js
// See point A below.
const changeTheme = curry((color, dom) => compose(addClass(`theme--${color}`), setData('theme', color)(dom));

// See point B below.
const changeThemeMenuBlue = changeTheme('blue', '.menu');

// See point C below.
changeThemeMenuBlue.fork(console.error, console.log);
```

#### A: Combine individual building blocks for common use cases

Let's pretend that you have a site where users can change the theme to a color they select. This function combines both the `addClass` and `setData` functions so that you now have one function that sets a class and a data attribute for any passed in DOM Element.

You no longer have to define both of them separately on every DOM Element where you want this action to happen. You have one reusable function to pass around that take the dom element you want to change and the color you want to change it to.

#### B: Load the composed function with arguments to reuse when you want

Here we have now loaded our `changeTheme` function with a color and an element to make the changes to. However, none of the changes have happened at this point. That is because all functions in the library return a [Future](https://github.com/fluture-js/Fluture).

#### C: Consume the built up transformation by forking it

This is where it all happens. Up to this point we have just been building up transformations. The DOM has not been queried, there are no changes to DOM Elements. However, when we fork the built up function everything will be run.

The method is called fork for a reason. With Futures we are now responsible and able to handle any errors that happen while trying to run our built up functions.

If you are not familiar with some of the functional programming techniques seen above check out these awesome resources:

* [Professor Frisby’s Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
* [Professor Frisby’s Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)
* [Master The JavaScript Interview: What Is Function Composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

## Usage

> `npm install --save saladbar`

Saladbar is bundled to work with EcmaScript version 5.

For older environments you may need to polyfill one or more of the following
functions: [`Object.assign`][js:object.assign] and [`Array.isArray`][js:array.isarray].

### CommonJS Module

```js
var compose = require('ramda');
var { hasClass, dom } = require('saladbar');

// Given this html
// <div class="default test"></div>

var hasClassTest = hasClass('test');

hasClassTest('.default').fork(console.error, console.log);
//> true
```

### EcmaScript Module

The `package.json` sets a `module`-field for build-tools like [Rollup](https://rollupjs.org/guide/en) or [Webpack](https://webpack.js.org/).

```js
import { hasClass } from 'saladbar';

// Given this html
// <div class="default test"></div>

const hasClassTest = hasClass('test');

hasClassTest('.default').fork(console.error, console.log);
//> true
```

### Global Bundle (CDN)

Saladbar is hosted in full with all of its dependencies at: [https://cdn.rawgit.com/wking-io/saladbar/f561e05b/packages/saladbar/lib/umd/saladbar.min.js](https://cdn.rawgit.com/wking-io/saladbar/f561e05b/packages/saladbar/lib/umd/saladbar.min.js)

This script will add `saladbar` to the global scope.

## Overview

If you are looking for the API Documentation for the core package that info is located in the packages own [README](https://github.com/wking-io/saladbar/tree/master/packages/saladbar-core).

### Motivation

**tl;dr**

I wanted an easier way to write more functional, imperative code on the Front End for projects that didn’t have the option of working with a View library like React or Vue.

If you wnat a deeper dive you can check out the blog post here:

[**Why Saladbar?**](http://google.com)

### Examples

Play around with the API that solve the problems below.

* [Accordion](https://codesandbox.io/s/ykrm04qzkz)
* [Open Menu](https://codesandbox.io/s/n30j1m1wkj)
* [Get form data](https://codesandbox.io/s/n30j1m1wkj)
* [Change style on scroll position](https://codesandbox.io/s/0yy9j3n8wl)

## Documentation

### Table Of Contents

<details><summary>Grabbing elements from the DOM</summary>

* [`dom`: Grab a single element from the DOM. Equivalent to `querySelector`.](#dom)
* [`domAll`: Grab all matching elements from the DOM. Equivalent to `querySelectorAll`.](#domall)
* [`findParent`: Search all parent elements of passed in element based on a predicate function.](#findparent)

</details>

<details><summary>Setter Functions</summary>

* [`addClass`: Add class/classes on all passed in Elements.](#addclass)
* [`removeClass`: Remove class/classes on all passed in Elements.](#removeclass)
* [`replaceClass`: Replace a class with another class on all passed in Elements.](#replaceclass)
* [`toggleClass`: Add a class on all passed in Elements if it doesn’t already exist or remove it if it does.](#toggleclass)
* [`setAttr`: Set the value of an attribute on all passed in Elements.](#setattr)
* [`setData`: Set the value of a data-attribute on all passed in Elements.](#setdata)
* [`setProp`: Set the value of a property on all passed in Elements.](#setprop)
* [`setStyle`: Set the value of a style-property on all passed in Elements.](#setstyle)

</details>

<details><summary>Getter Functions</summary>

* [`getClass`: Return the class at the index from all passed in elements.](#getclass)
* [`getClasses`: Return all the classes from all passed in elements.](#getclasses)
* [`getAttr`: Return the value of an attribute from all passed in elements.](#getattr)
* [`getData`: Return the value of a data-attribute from all passed in elements.](#getdata)
* [`getProp`: Return the value of a property from all passed in elements.](#getprop)
* [`getStyle`: Return the value of a style-property from all passed in elements.](#getstyle)
* [`serialize`: Return name and value pairs for all inputs of the passed in form as a data object.](#serialize)

</details>

<details><summary>Predicate Functions</summary>

* [`hasClass`: Check if a class exists for all passed in elements.](#hasclass)
* [`hasAttr`: Check if an attribute exists for all passed in elements.](#hasattr)
* [`isAttr`: Check if an attribute‘s value matches the passed in value for all passed in elements.](#isattr)
* [`hasData`: Check if a data-attribute exists for all passed in elements.](#hasdata)
* [`isData`: Check if a data-attribute’s value matches passed in value for all passed in elements.](#isdata)
* [`hasProp`: Check if a property exists on all passed in elements.](#hasprop)
* [`isProp`: Check if a property’s value matches passed in value for all passed in elements.](#isprop)
* [`hasStyle`: Check if a style-property exists on all passed in elements.](#hasstyle)
* [`isStyle`: Check if a style-property’s value matches passed in value for all passed in elements.](#isstyle)

</details>

<details><summary>Utility Functions</summary>

* [`fork`: composable way to fork the result of a Future.](#fork)
* [`identity`: A function that returns exactly what is put in. It’s great for success forks that you don’t want to do anything with.](#identity)

</details>

### Type signatures

[Hindley-Milner][guide:hm] type signatures are used to document functions. You
might encounter some additional syntax that we use to describe JavaScript
specific stuff, like functions that take
[multiple arguments at once](#brackets).

#### Brackets

Most functions exposed by Fluture are curried. This is reflected in their type
signatures by using an arrow at each step where partial application is possible.
For example, the following line signifies a _curried_ function, because it has
an arrow after each function argument:

```hs
add :: Number -> Number -> Number
```

We could have chosen to write the above line with "groups of one argument", but
we usually leave the grouping brackets out for brevity:

```hs
add :: (Number) -> (Number) -> Number
```

In order to document functions and methods that are _not_ curried, we use
grouping to show which arguments have to be provided at the same time:

```hs
add :: (Number, Number) -> Number
```

#### Types

You'll find that some signatures refer to concrete types, such as `Future`.
This is reference of the types used throughout the documentation:

* **Future** - Instances of Future provided by Fluture.
* **Pair a b** - An array with exactly two elements: `[a, b]`.
* **Error** - An object with a key of error and a string value that represents the error received.
* **DOM Element** - Object representing an [Element Instance][js:element] in the JS Standard.
* **DOM** - Global representing the browser [Document][js:dom]
* **Selector** - Valid [CSS Selector][js:selector] as defined in the spec.
* **Cancel** - The nullary [cancellation](#future) functions returned from computations.

### Grabbing elements from the DOM

#### dom

`dom :: (Selector, DOM Element) -> Future Error DOM Element`

Returns first element that matches the passed in Selector. If no element is found with that Selector the function will return an `Error` into the rejection branch. You can optionally pass another element as a parent similiar to how you can run `querySelector` method on any element in the DOM.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 * </div>
 *
 */

const title = dom('.pick-me');

title.fork(console.error, console.log);
//> <h1 class="pick-me">Title</h1>
```

#### domAll

`domAll :: (Selector, DOM Element) -> Future Error [ DOM Element ]`

Returns all elements that match the passed in Selector in an array. If no elements are found with that Selector the function will return an `Error` into the rejection branch. You can optionally pass another element as a parent similiar to how you can run `querySelectorAll` method on any element in the DOM.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <ul>
 *     <li class="item">Item One</li>
 *     <li class="item">Item Two</li>
 *     <li class="item">Item Three</li>
 *   </ul>
 * </div>
 *
 */

const listItems = domAll('.item');

title.fork(console.error, console.log);
//> [<li class="item">Item One</li>, <li class="item">Item Two</li>, <li class="item">Item Three</li>]
```

#### findParent

```js
findParent :: pred -> DOM Element -> Future Error DOM Element
           :: pred -> [DOM Element] -> Future Error [DOM Element]
```

Returns parent element that matches the predicate passed into the function. If no parent is found the Body element will be returned. If you pass an array of elements to the function each element will be mapped over and replaced with the parent element found by the predicate for that element.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <ul class="wrapper">
 *     <li class="item pick-me">Item One</li>
 *     <li class="item">Item Two</li>
 *     <li class="item">Item Three</li>
 *   </ul>
 * </div>
 *
 */

const getSingleWrapper = compose(findParent(hasClass('wrapper')), dom);
const getAllWrapper = compose(findParent(hasClass('wrapper')), domAll);

getSingleWrapper('.pick-me').fork(console.error, console.log);
//> <div class="wrapper">...</div>
getAllWrapper('.pick-me').fork(console.error, console.log);
//> [<div class="wrapper">...</div>, <ul class="wrapper">...</ul>]
```

### Setter Functions

#### addClass

```js
addClass :: String -> DOM Element -> Future Error DOM Element
         :: [String] -> DOM Element -> Future Error DOM Element
         :: String -> [DOM Element] -> Future Error [DOM Element]
         :: [String] -> [DOM Element] -> Future Error [DOM Element]
```

Adds class/classes to passed in elements. You can pass in either a single class or an array of classes to be added to a single element or an array of elements.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p class="pick-me">Paragraph One</p>
 *   <p class="pick-me">Paragraph Two</p>
 * </div>
 *
 */

const addClassGreen = compose(addClass('green'), dom);
const addColorClasses = compose(addClass(['green', 'blue']), dom);
const addClassGreenAll = compose(addClass('green'), domAll);
const addColorClassesAll = compose(addClass(['green', 'blue']), domAll);

addClassGreen('.pick-me').fork(console.error, console.log);
//> <h1 class="pick-me green">Title</h1>

addClassGreen('.pick-me').fork(console.error, console.log);
//> <h1 class="pick-me green blue">Title</h1>

addClassGreen('.pick-me').fork(console.error, console.log);
//> [<h1 class="pick-me green">Title</h1>, <p class="pick-me green">Paragraph One</p>, <p class="pick-me green">Paragraph Two</p>]

addClassGreen('.pick-me').fork(console.error, console.log);
//> [<h1 class="pick-me green blue">Title</h1>, <p class="pick-me green blue">Paragraph One</p>, <p class="pick-me green blue">Paragraph Two</p>]
```

#### addClass

```js
addClass :: String -> DOM Element -> Future Error DOM Element
         :: [String] -> DOM Element -> Future Error DOM Element
         :: String -> [DOM Element] -> Future Error [DOM Element]
         :: [String] -> [DOM Element] -> Future Error [DOM Element]
```

Adds class/classes to passed in elements. You can pass in either a single class or an array of classes to be added to a single element or an array of elements.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p class="pick-me">Paragraph One</p>
 *   <p class="pick-me">Paragraph Two</p>
 * </div>
 *
 */

const addClassGreen = compose(addClass('green'), dom);
const addColorClasses = compose(addClass(['green', 'blue']), dom);
const addClassGreenAll = compose(addClass('green'), domAll);
const addColorClassesAll = compose(addClass(['green', 'blue']), domAll);

addClassGreen('.pick-me').fork(console.error, console.log);
//> <h1 class="pick-me green">Title</h1>

addClassGreen('.pick-me').fork(console.error, console.log);
//> <h1 class="pick-me green blue">Title</h1>

addClassGreen('.pick-me').fork(console.error, console.log);
//> [<h1 class="pick-me green">Title</h1>, <p class="pick-me green">Paragraph One</p>, <p class="pick-me green">Paragraph Two</p>]

addClassGreen('.pick-me').fork(console.error, console.log);
//> [<h1 class="pick-me green blue">Title</h1>, <p class="pick-me green blue">Paragraph One</p>, <p class="pick-me green blue">Paragraph Two</p>]
```

## License

[Apache-2.0](LICENSE)

<!-- References -->

[js:selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
[js:dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[js:element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[js:object.create]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[js:object.assign]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
[js:array.isarray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
[rollup]: https://rollupjs.org/
[guide:hm]: https://drboolean.gitbooks.io/mostly-adequate-guide/content/ch7.html
[z]: https://github.com/sanctuary-js/sanctuary-type-classes#readme
[z:functor]: https://github.com/sanctuary-js/sanctuary-type-classes#Functor
[z:bifunctor]: https://github.com/sanctuary-js/sanctuary-type-classes#Bifunctor
[z:chain]: https://github.com/sanctuary-js/sanctuary-type-classes#Chain
[z:apply]: https://github.com/sanctuary-js/sanctuary-type-classes#Apply
[z:alt]: https://github.com/sanctuary-js/sanctuary-type-classes#Alt
[fl]: https://github.com/fantasyland/fantasy-land
[fl:alt]: https://github.com/fantasyland/fantasy-land#alt
[fl:alternative]: https://github.com/fantasyland/fantasy-land#alternative
[fl:functor]: https://github.com/fantasyland/fantasy-land#functor
[fl:chain]: https://github.com/fantasyland/fantasy-land#chain
[fl:apply]: https://github.com/fantasyland/fantasy-land#apply
[fl:applicative]: https://github.com/fantasyland/fantasy-land#applicative
[fl:bifunctor]: https://github.com/fantasyland/fantasy-land#bifunctor
[fl:chainrec]: https://github.com/fantasyland/fantasy-land#chainrec
