## Module Merge Objects

Carry out a "deep merge" to merge everyting using this new powerful merging strategy.

## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-merge/total.svg?style=flat-square)](https://github.com/brickifyjs/module-merge)
[![npm](https://img.shields.io/npm/dt/@brickify/m-merge.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-merge)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-merge.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-merge)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-merge.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-merge)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-merge.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-merge)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-merge.svg?style=flat-square)](https://gitter.im/brickifyjs/module-merge)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-merge/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-merge)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-merge.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-merge)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-merge.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-merge/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-merge.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-merge/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-merge.js.brickify.io.svg?label=website&style=flat-square)](https://m-merge.js.brickify.io)

## Install

```bash
$ npm install @brickify/m-merge
```

## Options

*Merging strategy*

```js
{
  immutable: false, // Returns a new Object
  keepExistingValues: true, // Older properties are kept even if they didn't exist in the new object
  eraseMethods: true,  // Override or keep previous methods
  eraseValues: true, // Override string || boolean || undefined || null
  eraseNotSameType: true, // Override if not of the same type without a diff
  eraseArray: false, // Direct Override Arrays
  eraseObject: false // Direct Override Objects
}
```

## Usage

```js
var merge = require('@brickify/m-merge');


// Merge if not of the same type
var a = 1;
var b = null;
console.log(merge(a, b));
// -> null


// Merge if the object(s) is not immutable
var a = {foo: 'foo'};
var b = {bar: 'bar'};
console.log(merge(a, b));
// ->  {foo: 'foo'}


// Merge object(s) and make it immutable
var a = {foo: 'foo'};
var b = {bar: 'bar'};
console.log(merge(a, b, {immutable: true}));
// ->  {foo: 'foo'}


// Merge object(s) and erase the existing objects
var a = {foo: 'foo'};
var b = {bar: 'bar'};
console.log(merge(a, b, {eraseObject: true}));
// -> {bar: 'bar'};


// Merge object(s) without keeping existing values
var a = {foo: 'foo'};
var b = {bar: 'bar2'};
console.log(merge(a, b, {keepExistingValues: false}));
// -> {bar: 'bar2'}


// Merge object(s) keeping existing values
var a = {foo: 'foo'};
var b = {bar: 'bar'};
console.log(merge(a, b));
// -> {foo: 'foo', bar: 'bar'}

// Merge object(s)
var a = {foo: 'foo'};
var b = {foo: 'foo2', bar: 'bar'};
console.log(merge(a, b));
// -> {foo: 'foo2', bar: 'bar'};


// Merge object(s) without erasing the existing values
var a = {foo: 'foo'};
var b = {foo: 'foo2', bar: 'bar'};
console.log(merge(a, b, {eraseValues: false}));
// -> {foo: 'foo', bar: 'bar'}


// Merge array < length
var a = [0];
var b = [0, 1];
console.log(merge(a, b));
// -> [0]


// Merge array > length
var a = [0, 1];
var b = [0];
console.log(merge(a, b));
// -> [0, 1]

// Merge array < length and not keepExistingValues
var a = [0];
var b = [0, 1];
console.log(merge(a, b, {keepExistingValues: false}));
// -> [0]

// Merge array > length and not keepExistingValues
var a = [0, 1];
var b = [0];
console.log(merge(a, b, {keepExistingValues: false}));
// -> [0, 1]


// Merge array not immutable
var a = [0];
var b = [0];
console.log(merge(a, b));
// -> [0]


// Merge array immutable
var a = [0, 1, 2];
var b = [0, 1, 2, 3];
var c = merge(a, b, {immutable: true});
console.log(c);
// -> [0, 1, 2, 3]


// Merge methods
var a = function () {
};
a.foo = true;
var b = function () {
    
};
console.log(merge(a, b));
// -> b && b.foo

// eraseArray
var a = [0, 1, 2];
var b = [0, 1, 2, 3];
console.log(merge(a, b, {eraseArray: true}));
// -> [0, 1, 2, 3]

// eraseArray immutable
var a = [0, 1, 2];
var b = [0, 1, 2, 3];
var c = merge(a, b, {eraseArray: true, immutable: true});
console.log(c);
// -> [0, 1, 2, 3]


// eraseObject
var a = {foo: 'foo'};
var b = {bar: 'bar'};
console.log(merge(a, b, {eraseObject: true}));
// -> {bar: 'bar'}

// eraseObject immutable
var a = {foo: 'foo'};
var b = {bar: 'bar'};
var c = merge(a, b, {eraseObject: true, immutable: true});
console.log(c);
// -> {bar: 'bar'}

```

## Input

```js
merge(ObjectA, ObjectB ,{...options});
```
