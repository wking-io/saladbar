# Saladbar 🥗

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

> **Disclaimer:** This library revolves around functional programming concepts. So if terms like pure functions, currying, and Monads ring zero bells my explanation of the befits of this library may fall short. If that is the case I highly recommend [Professor Frisby’s Mostly Adequate Guide To Functional Programming](https://mostly-adequate.gitbooks.io/mostly-adequate-guide/) as an introduction. It covers everything you need to get up an going with the concepts practiced in this library.

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

#### Types

You'll find that some signatures refer to concrete types, such as `Either`.
This is reference of the types used throughout the documentation:

* **Either** - Instances of Either provided by `data.either`.
* **Pair a b** - An array with exactly two elements: `[a, b]`.
* **Error** - An object with a key of error and a string value that represents the error received.
* **DOM Element** - Since functions in this library accept multiple types of DOM Element representations (see Overview section above) this type represents any of those accepted values.
* **DOM** - Global representing the browser [Document][js:dom]

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
