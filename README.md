# Coming Soon

A library of composable dom functions.

## Usage

> `npm install --save saladbar`

Saladbar is bundled to work with EcmaScript version 5.

For older environments you may need to polyfill one or more of the following
functions: [`Object.assign`][js:object.assign] and [`Array.isArray`][js:array.isarray].

### CommonJS Module

<!-- eslint-disable no-var -->

<!-- eslint-disable padding-line-between-statements -->

```js
var compose = require('ramda');
var saladbar = require('saladbar');

// Given this html
// <div class="default test"></div>

var hasClassTest = compose(saladbar.hasClass('test'), saladbar.dom);

hasClassTest('.default').run(console.error, console.log);
//> true
```

### EcmaScript Module

The `package.json` sets a `module`-field for build-tools like [Rollup][].

```js
import { compose } from 'ramda';
import { dom, hasClass } from 'saladbar';

// Given this html
// <div class="default test"></div>

var hasClassTest = compose(hasClass('test'), dom);

hasClassTest('.default').run(console.error, console.log);
//> true
```

### Global Bundle (CDN)

Saladbar is hosted in full with all of its dependencies at:
[https://rawgit.com/fluture-js/Fluture/master/dist/bundle.js](https://rawgit.com/fluture-js/Fluture/master/dist/bundle.js)

This script will add `saladbar` to the global scope.
