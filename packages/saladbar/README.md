![logo](./saladbar-logo.png)

Welcome to saladbar, a library of functions built for composition that take a functional approach to working with the DOM.

**Why the name saladbar?** This library is intended to be used by combining smaller functions to build complete programs. That sounds a lot like how a saladbar works. Also, I like food, and I think library names should be fun.

## Usage

> `npm install --save saladbar`

Saladbar is bundled to work with EcmaScript version 5.

For older environments you may need to polyfill one or more of the following
functions: [`Object.assign`][js:object.assign] and [`Array.isArray`][js:array.isarray].

### CommonJS Module

```js
var { hasClass } = require('saladbar');

// Given this html
// <div class="default test"></div>

var hasClassTest = hasClass('test');

hasClassTest('.default')
  .map(console.log); // console.log value
  .leftMap(console.error) // can also leftMap to check for errors
//> true
```

### EcmaScript Module

The `package.json` sets a `module`-field for build-tools like [Rollup](https://rollupjs.org/guide/en) or [Webpack](https://webpack.js.org/).

```js
import { hasClass } from 'saladbar';

// Given this html
// <div class="default test"></div>

const hasClassTest = hasClass('test');

hasClassTest('.default')
  .map(console.log); // console.log value
  .leftMap(console.error) // can also leftMap to check for errors
//> true
```

### Global Bundle (CDN)

Saladbar is hosted in full with all of its dependencies at: [https://cdn.rawgit.com/wking-io/saladbar/8618f175/packages/saladbar/lib/umd/saladbar.min.js](https://cdn.rawgit.com/wking-io/saladbar/8618f175/packages/saladbar/lib/umd/saladbar.min.js)

This script will add `saladbar` to the global scope.

## Overview

> **Disclaimer:** This library revolves around functional programming concepts. I highly recommend [Professor Frisby’s Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/) as an introduction. It covers everything you need to get up an going with the concepts practiced in this library.

The goal of this library is to provide a set of focused, composable functions that cover common DOM interactions. Before diving into the API for each of the individual functions there are some universal guarantees and features for every function that I want to cover.

### All functions are curried by default

A curried function is a function that when called with fewer arguments than expected, returns a new function that takes the remaining arguments. If you are familiar with currying you know the power this gives you when you are composing functions. If you are not familiar with it, here are some examples that show it usefulness.

#### You can partially apply some functions to make a more focused utility

```js
/** setProp expects three arguments.
 *
 * 1. A property to set
 * 2. The value to set it to
 * 3. The element(s) to set it on
 *
 * Since functions are curried by default you can partially apply the
 * innerHTML property to the function and create a new function that
 * you can pass around anytime you want to write a value to an element.
 **/
const write = setProp('innerHTML');

/** toggleClass expects two arguments.
 *
 * 1. A class to toggle
 * 2. The dom element(s) to toggle it on
 *
 * Since functions are curried by default you can partially apply the
 * class 'open' to the function and create a new function that you
 * can pass around when you need to toggle an element's open state.
 **/
const toggleOpen = toggleClass('open');
```

#### You can partially apply functions that take more than one argument so that they can be composed like LEGO blocks

```js
/** This function composes partially applied functions so that all
 * they need is the color to change the theme to and the element(s)
 * to make those transformations on.
 **/
const changeTheme = color =>
  compose(
    write(`Wow, look I am ${color}`),
    addClass(`theme-${color}`),
    setData('theme', color)
  );

/** You can alse partially apply this function with set colors
 * if you want to have more specific use cases.
 **/
const changeThemeToBlue = changeTheme('blue');
const changeThemeToGreen = changeTheme('green');
const changeThemeToOrange = changeTheme('orange');

/** Now when we run the function below the following steps occur
 *
 * 1. Sets the 'data-theme' attribute to blue and returns the '.page-wrapper' element
 * 2. Receives '.page-wrapper' element from setData and adds the class 'theme-blue' and returns the '.page-wrapper' element
 * 3. Receives '.page-wrapper' element from addClass and sets the innerHTML to 'Wow, look I am blue' and returns the '.page-wrapper' element
 **/
changeThemeToBlue('.page-wrapper');
```

### All functions take the target element(s) last

This is a common and powerful technique to make function composition as easy as possible. In function composition each function in the chain takes the return value of the previous function. So, by passing the target element(s) as the last param we can more easily chain together DOM tranformations on said element(s).

```js
// Function that sets a class, attribute, and style on the same element
const addStuff = compose(
  setAttr('aria-hidden', 'false'),
  addClass('show-element'),
  setStyle('display', 'block')
);

/** You can then call the function with any element you want and
 * that element will be passed through each function in the composition.
 **/
addStuff('.element');
```

Since the functions might be used at any part of a composition chain all functions in the library allow the final argument to be any of the following cases:

* If passed a CSS Selector the function will automatically fetch that element from the DOM using the `dom` function.
* If passed an element or elements gotten by running `querySelector` or `querySelectorAll` they will be wrapped in an Either.
* If passed an Either they will be checked to make sure it contains an element then it will move on.

### All functions return an Either Monad

This is the big one. Every function in this library returns an Either. Every function also handles composing these Either wrapped results by default so that you do not have to worry about how each function composes to the next.

Why this approach? There are two main benefits.

**No more runtime errors with “undefined is not a function” issues.** The Either Type is defined by its ability to evaluate actions and capture their results as either a Left(failure) or a Right(success). Then on subsequent actions to that result, functions only run over the success values. This means if there is an error in your runtime the rest of the actions are ignored and that error is capture for you to handle yourself. It will not crash or show during evaluation.

**Guaranteed laws that every value adheres to.** The Either Type used in this library adheres to the following algebraic data types as outlined in the Fantasy-Land Spec:

* Functor
* Monad
* Applicative
* Chain

This means that there are mathematical laws that define how these values can be used and combined. Any implementation that follows these laws is guaranteed to work the exact same.

For a detailed overview of what this means I will point you again to [Professor Frisby’s Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/) specifically chapters 8-12. Also [this](http://www.tomharding.me/2017/06/05/fantas-eel-and-specification-15/) series that breaks down the Fantasy-Land Spec and defines it in plain language.

If you are not familiar with some of the functional programming techniques seen above check out these awesome resources:

* [Professor Frisby’s Introduces Composable Functional JavaScript](https://egghead.io/courses/professor-frisby-introduces-composable-functional-javascript)
* [Professor Frisby’s Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/)
* [Master The JavaScript Interview: What Is Function Composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

### Examples

Play around with the API that solve the problems below.

* [Accordion](https://codesandbox.io/s/ykrm04qzkz)
* [Open Menu](https://codesandbox.io/s/m5ko1466kx)
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
* [`setAttr`: Set the value of an attribute on all passed in Elements.](#setattr)
* [`setData`: Set the value of a data-attribute on all passed in Elements.](#setdata)
* [`setProp`: Set the value of a property on all passed in Elements.](#setprop)
* [`setStyle`: Set the value of a style-property on all passed in Elements.](#setstyle)
* [`toggleClass`: Add a class on all passed in Elements if it doesn’t already exist or remove it if it does.](#toggleclass)

</details>

<details><summary>Getter Functions</summary>

* [`getAttr`: Return the value of an attribute from all passed in elements.](#getattr)
* [`getClass`: Return the class at the index from all passed in elements.](#getclass)
* [`getClasses`: Return all the classes from all passed in elements.](#getclasses)
* [`getData`: Return the value of a data-attribute from all passed in elements.](#getdata)
* [`getProp`: Return the value of a property from all passed in elements.](#getprop)
* [`getPostion`: Return object representing the postion of all passed in elements.](#getposition)
* [`getStyle`: Return the value of a style-property from all passed in elements.](#getstyle)
* [`serialize`: Return name and value pairs for all inputs of the passed in form as a data object.](#serialize)

</details>

<details><summary>Predicate Functions</summary>

* [`hasAttr`: Check if an attribute exists for all passed in elements.](#hasattr)
* [`hasClass`: Check if a class exists for all passed in elements.](#hasclass)
* [`hasData`: Check if a data-attribute exists for all passed in elements.](#hasdata)
* [`hasProp`: Check if a property exists on all passed in elements.](#hasprop)
* [`hasStyle`: Check if a style-property exists on all passed in elements.](#hasstyle)
* [`isAttr`: Check if an attribute‘s value matches the passed in value for all passed in elements.](#isattr)
* [`isData`: Check if a data-attribute’s value matches passed in value for all passed in elements.](#isdata)
* [`isProp`: Check if a property’s value matches passed in value for all passed in elements.](#isprop)
* [`isStyle`: Check if a style-property’s value matches passed in value for all passed in elements.](#isstyle)

</details>

<details><summary>Event Functions</summary>

* [`on`: Add event listener on a dom element.](#on)

</details>

<details><summary>Utility Functions</summary>

* [`identity`: A function that returns exactly what is put in.](#identity)

</details>

### Type signatures

[Hindley-Milner][guide:hm] type signatures are used to document functions. You
might encounter some additional syntax that we use to describe JavaScript
specific stuff, like functions that take
[multiple arguments at once](#brackets).

#### Types

You'll find that some signatures refer to concrete types, such as `Either`.
This is reference of the types used throughout the documentation:

* **Either** - Instances of Either provided by `data.either`.
* **Pair a b** - An array with exactly two elements: `[a, b]`.
* **Error** - An object with a key of error and a string value that represents the error received.
* **DOM Element** - Since functions in this library accept multiple types of DOM Element representations (see Overview section above) this type represents any of those accepted values.
* **DOM** - Global representing the browser [Document][js:dom]
* **Selector** - Valid [CSS Selector][js:selector] as defined in the spec.

### Grabbing elements from the DOM

#### dom

`dom :: (Selector, DOM Element) -> Either Error DOM Element`

Returns first element that matches the passed in Selector. If no element is found with that Selector the function will return an `Error`. You can optionally pass another element to be used as the root of the query similiar to how you can run`querySelector` method on any element in the DOM.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 * </div>
 *
 */

const title = dom('.pick-me');

title.map(console.log);
//> <h1 class="pick-me">Title</h1>
```

#### domAll

`domAll :: (Selector, DOM Element) -> Either Error [ DOM Element ]`

Returns an array of all elements that match the passed in Selector. If no elements are found with that Selector the function will return an `Error`. You can optionally pass another element to be used as the root for the query similar to how you can run `querySelectorAll` method on any element in the DOM.

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

title.map(console.log);
//> [<li class="item">Item One</li>, <li class="item">Item Two</li>, <li class="item">Item Three</li>]
```

#### findParent

`findParent :: pred -> DOM Element -> Either Error DOM Element`

Returns parent element that matches the predicate. If no parent is found the `body` element will be returned. If you pass an array of elements to the function each element will be mapped over and replaced with the parent element found by the predicate for that element.

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

// Find parent of single element
const getSingleWrapper = findParent(hasClass('wrapper'));
getSingleWrapper('.pick-me').map(console.log);
//> <div class="wrapper">...</div>

// Find parent of multiple elements
const getAllWrapper = compose(findParent(hasClass('wrapper')), domAll);
getAllWrapper('.pick-me').map(console.log);
//> [<div class="wrapper">...</div>, <ul class="wrapper">...</ul>]
```

### Setter Functions

#### addClass

`addClass :: String -> DOM Element -> Future Error DOM Element`

Adds class/classes to passed in element(s). You can pass in either a single class or an array of classes to be added to a single element or an array of elements.

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

// Single class to single element
const addClassGreen = addClass('green');
addClassGreen('.pick-me').map(console.log);
//> <h1 class="pick-me green">Title</h1>

// Multiple classes to single element
const addColorClasses = addClass(['green', 'blue']);
addColorClasses('.pick-me').map(console.log);
//> <h1 class="pick-me green blue">Title</h1>

// Single class to multiple elements
const addClassGreenAll = compose(addClass('green'), domAll);
addClassGreenAll('.pick-me').map(console.log);
//> [<h1 class="pick-me green">Title</h1>, <p class="pick-me green">Paragraph One</p>, <p class="pick-me green">Paragraph Two</p>]

// Multiple classes to multiple elements
const addColorClassesAll = compose(addClass(['green', 'blue']), domAll);
addColorClassesAll('.pick-me').map(console.log);
//> [<h1 class="pick-me green blue">Title</h1>, <p class="pick-me green blue">Paragraph One</p>, <p class="pick-me green blue">Paragraph Two</p>]
```

#### removeClass

`removeClass :: String -> DOM Element -> Future Error DOM Element```

Removes class/classes from passed in element(s). You can pass in either a single class or an array of classes to be removed from a single element or an array of elements.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me green blue">Title</h1>
 *   <p class="pick-me green blue">Paragraph One</p>
 *   <p class="pick-me green blue">Paragraph Two</p>
 * </div>
 *
 */

// Single class on single element
const removeClassGreen = removeClass('green');
removeClassGreen('.pick-me').map(console.log);
//> <h1 class="pick-me blue">Title</h1>

// Multiple classes on single element
const removeColorClasses = removeClass(['green', 'blue']);
removeColorClasses('.pick-me').map(console.log);
//> <h1 class="pick-me">Title</h1>

// Single class on multiple elements
const removeClassGreenAll = compose(removeClass('green'), domAll);
removeClassGreenAll('.pick-me').map(console.log);
//> [<h1 class="pick-me blue">Title</h1>, <p class="pick-me blue">Paragraph One</p>, <p class="pick-me blue">Paragraph Two</p>]

// Multiple classes on multiple elements
const removeColorClassesAll = compose(removeClass(['green', 'blue']), domAll);
removeColorClassesAll('.pick-me').map(console.log);
//> [<h1 class="pick-me">Title</h1>, <p class="pick-me">Paragraph One</p>, <p class="pick-me">Paragraph Two</p>]
```

### replaceClass

`replaceClass :: String -> String -> DOM Element -> Either Error DOM Element`

Replaces one class with another on passed in element(s). You replace a class on a single element or an array of elements.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me green">Title</h1>
 *   <p class="pick-me green">Paragraph One</p>
 *   <p class="pick-me green">Paragraph Two</p>
 * </div>
 *
 */

// Replace class on single element
const replaceClassGreen = replaceClass('green', 'blue');
replaceClassGreen('.pick-me').map(console.log);
//> <h1 class="pick-me blue">Title</h1>

// Replace class on multiple elements
const replaceClassGreenAll = compose(replaceClass('green', 'blue'), domAll);
replaceClassGreenAll('.pick-me').map(console.log);
//> [<h1 class="pick-me blue">Title</h1>, <p class="pick-me blue">Paragraph One</p>, <p class="pick-me blue">Paragraph Two</p>]
```

### setAttr

`setAttr :: String -> String -> DOM Element -> Either Error DOM Element`

Sets the value of the specified attribute on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Update aria-expanded on single element
const expandFirst = setAttr('aria-expanded', 'true');
expandFirst('.pick-me').map(console.log);
//> <div class="wrapper pick-me" aria-expanded="true">...</div>

// Update aria-expanded on multiple elements
const expandAll = compose(setAttr('aria-expanded', 'true'), domAll);
expandAll('.pick-me').map(console.log);
//> [<div class="wrapper pick-me" aria-expanded="true">...</div>, <div class="wrapper pick-me" aria-expanded="true">...</div>]
```

### setData

`setData :: String -> String -> DOM Element -> Either Error DOM Element`

Sets the value of the specified data-attribute on the passed in element(s). Sets values using the dataset property on DOM Elements so the data attribute you are setting will follow the naming rules outlined here: [HTMLElement.dataset][js:dataset]

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" data-example="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" data-expample="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Update data-example on single element
const changeFirst = setData('example', 'after');
changeFirst('.pick-me').map(console.log);
//> <div class="wrapper pick-me" data-example="after">...</div>

// Update data-example on multiple elements
const changeAll = compose(setData('example', 'after'), domAll);
changeAll('.pick-me').map(console.log);
//> [<div class="wrapper pick-me" example="after">...</div>, <div class="wrapper pick-me" example="after">...</div>]
```

### setProp

`setProp :: String -> String -> DOM Element -> Either Error DOM Element`

Sets the value of the specified property on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Change innerHTML on single element
const writeFirst = setProp('innerHTML', 'New Title');
writeFirst('.pick-me').map(console.log);
//> <h1 class="pick-me">New Title</h1>

// Change innerHTML class on multiple elements
const writeAll = compose(setProp('innerHTML', 'New Title'), domAll);
writeAll('.pick-me').map(console.log);
//> [<h1 class="pick-me">New Title</h1>, <h1 class="pick-me">New Title</h1>]
```

### setStyle

`setStyle :: String -> String -> DOM Element -> Either Error DOM Element`

Sets the value of the specified style property on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Change color on single element
const highlightFirst = setStyle('color', '#6A5ACD');
highlightFirst('.pick-me').map(console.log);
//> <h1 class="pick-me">New Title</h1>

// Change color on multiple elements
const highlightAll = compose(setStyle('color', '#6A5ACD'), domAll);
highlightAll('.pick-me').map(console.log);
//> [<h1 class="pick-me">New Title</h1>, <h1 class="pick-me">New Title</h1>]
```

#### toggleClass

`toggleClass :: String -> DOM Element -> Either Error DOM Element`

Toggles class from passed in element(s). If the class exists on the element it is removed. If the class doesn't exist on the element it is added

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me green">Title</h1>
 *   <p class="pick-me green">Paragraph One</p>
 *   <p class="pick-me green blue">Paragraph Two</p>
 * </div>
 *
 */

// Toggle class on single element
const toggleClassBlue = toggleClass('blue');
toggleClassBlue('.pick-me').map(console.log);
//> <h1 class="pick-me green blue">Title</h1>

// Toggle class on multiple elements
const toggleClassBlueAll = compose(removeClass('blue'), domAll);
toggleClassBlueAll('.pick-me').map(console.log);
//> [<h1 class="pick-me green blue">Title</h1>, <p class="pick-me green blue">Paragraph One</p>, <p class="pick-me green">Paragraph Two</p>]
```

### Getter Functions

#### getAttr

`getAttr :: String → DOM Element → Either Error String`

Returns the value of the passed in attribute. If attribute does not exist it returns an error.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get value of aria-expanded on single element
const getFirst = getAttr('aria-expanded');
getFirst('.pick-me').map(console.log);
//> "false"

// Get value of aria-expanded on multiple elements
const getAll = compose(getAttr('aria-expanded'), domAll);
getAll('.pick-me').map(console.log);
//> ["false","false"]
```

#### getClass

`getClass :: Int → DOM Element → Either Error String`

Returns the value of class at passed in index. If there is no class at the index it returns an error.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get value of aria-expanded on single element
const getFirst = getClass(1);
getFirst('.pick-me').map(console.log);
//> "wrapper"

// Get value of aria-expanded on multiple elements
const getAll = compose(getClass(1), domAll);
getAll('.pick-me').map(console.log);
//> ["wrapper","wrapper"]
```

#### getClasses

`getClasses :: DOM Element → Either Error [String]`

Returns all classes on passed in element(s). If there are no classes it returns an error.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get value of aria-expanded on single element
const getFirst = getClasses(1);
getFirst('.pick-me').map(console.log);
//> ["wrapper", "pick-me"]

// Get value of aria-expanded on multiple elements
const getAll = compose(getClasses(1), domAll);
getAll('.pick-me').map(console.log);
//> [["wrapper", "pick-me"], ["wrapper", "pick-me"]]
```

#### getData

`getData :: String → DOM Element → Either Error String`

Returns the value of the passed in data-attribute. If data-attribute does not exist it returns an error. Gets value using the dataset property on DOM Elements so the data attribute you are getting will follow the naming rules outlined here: [HTMLElement.dataset][js:dataset]

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" data-example="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" data-expample="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get value of data-example on single element
const getFirst = getData('example');
getFirst('.pick-me').map(console.log);
//> "before"

// Get value of data-example on multiple elements
const getAll = compose(setData('example'), domAll);
getAll('.pick-me').map(console.log);
//> ["before", "before"]
```

#### getProp

`getProp :: String → DOM Element → Either Error String`

Returns the value of the passed in property. If property does not exist it returns an error.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get innerHTML property on single element
const getFirst = getProp('innerHTML');
getFirst('.pick-me').map(console.log);
//> "Title"

// Get innerHTML property on multiple elements
const getAll = compose(getProp('innerHTML'), domAll);
getAll('.pick-me').map(console.log);
//> ["Title", "Title"]
```

#### getPosition

`getPosition :: String → DOM Element → Either Error { bottom: Int, left: Int, right: Int, top: Int }`

Returns an object representing the position of the passed in element(s) using the `getBoundingClientRect` method. It cherry picks the top, right, bottom, and left positionsa from the generated `DOMRect` instance.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get position of single element. Numbers are made up.
getPosition('.pick-me').map(console.log);
//> { top: 0, right: 200, bottom: 40, left: 0 }

// Get position multiple element. Numbers are made up.
const getAll = compose(getPosition, domAll);
getAll('.pick-me').map(console.log);
//> [{ top: 0, right: 200, bottom: 40, left: 0 }, { top: 40, right: 200, bottom: 80, left: 0 }]
```

#### getStyle

`getStyle :: String → DOM Element → Either Error String`

Returns the value of the passed in style property. If style property does not exist it returns an error. All styles fetched are generated by calling the `window.getGeneratedStyles` method.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me" style"color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me" style"color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Get color on single element
const getFirst = getStyle('color');
getFirst('.pick-me').map(console.log);
//> "#6A5ACD"

// Get color on multiple elements
const getAll = compose(getStyle('color'), domAll);
getAll('.pick-me').map(console.log);
//> ["#6A5ACD", "#6A5ACD"]
```

#### serialize

`serialize :: String → DOM Element → Either Error { name: value }`

Returns object representing name/value pairs for all fields that are children of the passed in form.

```js
/* IF THIS IS OUR MARKUP
 *
 * <form class="pick-me">
 *   <input type="text" name="first" value="Will" />
 *   <input type="text" name="last" value="King" />
 *   <input type="checkbox" name="check" value="true" />
 * </form>
 *
 */

serialize('.pick-me').map(console.log);
//> { first: "Will", last: "King", check: "true" }
```

### Predicate Functions

#### hasAttr

`hasAttr :: String → DOM Element → Either Error Bool`

Returns boolean indicating if an attribute exists on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if aria-expanded attribute exists on single element
const hasFirst = hasAttr('aria-expanded');
hasFirst('.pick-me').map(console.log);
//> true

// Check if aria-expanded attribute exists on multiple elements
const hasAll = compose(hasAttr('aria-expanded'), domAll);
hasAll('.pick-me').map(console.log);
//> [true, true]
```

#### hasClass

`hasClass :: String → DOM Element → Either Error Bool`

Returns boolean indicating if a class exists on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if class exists on single element
const hasFirst = hasClass('wrapper');
hasFirst('.pick-me').map(console.log);
//> true

// Check if class exists on multiple elements
const hasAll = compose(hasClass('wrapper'), domAll);
hasAll('.pick-me').map(console.log);
//> [true, true]
```

#### hasData

`hasData :: String → DOM Element → Either Error Bool`

Returns boolean indicating if a data-attribute exists on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" data-example="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" data-expample="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if data-example exists on single element
const hasFirst = hasData('example');
hasFirst('.pick-me').map(console.log);
//> true

// Check if data-example exists on multiple elements
const hasAll = compose(hasData('example'), domAll);
hasAll('.pick-me').map(console.log);
//> [true, true]
```

#### hasProp

`hasProp :: String → DOM Element → Either Error Bool`

Returns boolean indicating if a propert exists on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if innerHTML property exists on single element
const hasFirst = hasProp('innerHTML');
hasFirst('.pick-me').map(console.log);
//> true

// Check if innerHTML property exists on multiple elements
const hasAll = compose(hasProp('innerHTML'), domAll);
hasAll('.pick-me').map(console.log);
//> [true, true]
```

#### hasStyle

`hasStyle :: String → DOM Element → Either Error Bool`

Returns boolean indicating if a style property exists on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me" style"color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me" style"color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if color property exists on single element
const hasFirst = hasStyle('color');
hasFirst('.pick-me').map(console.log);
//> true

// Check if color property exists on multiple elements
const hasAll = compose(hasStyle('color'), domAll);
hasAll('.pick-me').map(console.log);
//> [true, true]
```

#### isAttr

`isAttr :: String → String → DOM Element → Either Error Bool`

Returns boolean indicating if the passed in value matches the current value of an attribute on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if aria-expanded value is "false" on single element
const isFirst = isAttr('aria-expanded', 'false');
isFirst('.pick-me').map(console.log);
//> true

// Check if aria-expanded value is "false"  on multiple elements
const isAll = compose(isAttr('aria-expanded', 'false'), domAll);
isAll('.pick-me').map(console.log);
//> [true, true]
```

#### isData

`isData :: String → String → DOM Element → Either Error Bool`

Returns boolean indicating if the passed in value matches the current value of a data-attribute on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" data-example="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper pick-me" data-expample="before">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if data-example value equals "before" on single element
const isFirst = isData('example', 'before');
isFirst('.pick-me').map(console.log);
//> true

// Check if data-example value equals "before" on multiple elements
const isAll = compose(isData('example', 'before'), domAll);
isAll('.pick-me').map(console.log);
//> [true, true]
```

#### isProp

`isProp :: String → String → DOM Element → Either Error Bool`

Returns boolean indicating if the passed in value matches the current value of a property on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if innerHTML value equals "Title" on single element
const isFirst = isProp('innerHTML', 'Title');
isFirst('.pick-me').map(console.log);
//> true

// Check if innerHTML value equals "Title" on multiple elements
const isAll = compose(isProp('innerHTML', 'Title'), domAll);
isAll('.pick-me').map(console.log);
//> [true, true]
```

#### isStyle

`isStyle :: String → String → DOM Element → Either Error Bool`

Returns boolean indicating if the passed in value matches the current value of an a style property on the passed in element(s).

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper">
 *   <h1 class="pick-me" style="color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <div class="wrapper">
 *   <h1 class="pick-me" style="color: #6A5ACD;">Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 *
 */

// Check if color value equals "#6A5ACD" on single element
const isFirst = isStyle('color', '#6A5ACD');
isFirst('.pick-me').map(console.log);
//> true

// Check if color value equals "#6A5ACD" on multiple elements
const isAll = compose(isStyle('color', '#6A5ACD'), domAll);
isAll('.pick-me').map(console.log);
//> [true, true]
```

### Event Functions

#### on

`on :: String → (event → Either Error a) → DOM Element → DOM Element`

Add an event listener to passed in element(s) by passing in the event you want to listen for and the callback function you want to run.

```js
/* IF THIS IS OUR MARKUP
 *
 * <div class="wrapper pick-me" aria-expanded="false">
 *   <h1>Title</h1>
 *   <p>Paragraph One</p>
 * </div>
 * <button data-expand-wrapper>Click To Expand</button>
 *
 */

// Setup functions that will expand an element
const expand = setAttr('aria-expanded', 'true');
const expandOnClick = sel => e => expand(sel);

// Add click event to button with data-expand-wrapper data-attribute
on('click', expandOnClick('.pick-me'), '[data-expand-wrapper]');
```

### Utility Functions

#### toBool

`toBool :: String → Either Error Bool`

Function that takes the string representation of `true` and `false` boolean values and returns the actual boolean value. This is useful when you need an boolean when getting the value of an element attribute.

Note: Function takes both string versions of booleans and Either wrapped versions.

```js
toBool('true').map(console.log));
//> true

toBool('false').map(console.log));
//> false

toBool(1).map(console.log));
//> error: "Argument 1 is not a String or Array String."

toBool(Either.of('true')).map(console.log));
//> true

toBool(Either.of('false')).map(console.log));
//> false

toBool(Either.of(1)).map(console.log));
//> error: "Argument 1 is not a String or Array String."
```

#### identity

`identity :: a → a`

Function that just returns whatever is passed as the input.

```js
console.log(identity(4));
//> 4
```

## Build Your Own

If you are looking for how to wrap the core package with your own Data Type that info is located in the packages own [README](https://github.com/wking-io/saladbar/tree/master/packages/saladbar-core).

## License

[Apache-2.0](LICENSE)

<!-- References -->

[js:selector]: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Selectors
[js:dom]: https://developer.mozilla.org/en-US/docs/Web/API/Document
[js:element]: https://developer.mozilla.org/en-US/docs/Web/API/Element
[js:object.create]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
[js:object.assign]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create
[js:array.isarray]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
[js:dataset]: https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset
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
