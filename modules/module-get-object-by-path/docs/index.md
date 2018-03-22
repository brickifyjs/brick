## Module Get object by path

> Find an object by giving it a path with or without context. \
  Returns an object containing information about the object and paths.

## Statistics

[![Github All Releases](https://img.shields.io/github/downloads/brickifyjs/module-get-object-by-path/total.svg?style=flat-square)](https://github.com/brickifyjs/module-get-object-by-path)
[![npm](https://img.shields.io/npm/dt/@brickify/m-gobp.svg?style=flat-square)](https://www.npmjs.com/package/@brickify/m-gobp)

## Social
[![GitHub forks](https://img.shields.io/github/forks/brickifyjs/module-get-object-by-path.svg?label=Fork&style=flat-square)](https://github.com/brickifyjs/module-get-object-by-path)
[![GitHub stars](https://img.shields.io/github/stars/brickifyjs/module-get-object-by-path.svg?label=Stars&style=flat-square)](https://github.com/brickifyjs/module-get-object-by-path)
[![GitHub watchers](https://img.shields.io/github/watchers/brickifyjs/module-get-object-by-path.svg?label=Watch&style=flat-square)](https://github.com/brickifyjs/module-get-object-by-path)
[![Gitter](https://img.shields.io/gitter/room/brickifyjs/module-get-object-by-path.svg?style=flat-square)](https://gitter.im/brickifyjs/module-get-object-by-path)

## Project Health

[![Travis branch](https://img.shields.io/travis/brickifyjs/module-get-object-by-path/master.svg?style=flat-square)](https://travis-ci.org/brickifyjs/module-get-object-by-path)
[![Codecov](https://img.shields.io/codecov/c/github/brickifyjs/module-get-object-by-path.svg?style=flat-square)](https://codecov.io/gh/brickifyjs/module-get-object-by-path)
[![bitHound](https://img.shields.io/bithound/dependencies/github/brickifyjs/module-get-object-by-path.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-get-object-by-path/master/dependencies/npm)
[![bitHound](https://img.shields.io/bithound/devDependencies/github/brickifyjs/module-get-object-by-path.svg?style=flat-square)](https://www.bithound.io/github/brickifyjs/module-get-object-by-path/master/dependencies/npm)
[![Website](https://img.shields.io/website/https/m-gobp.js.brickify.io.svg?label=website&style=flat-square)](https://m-gobp.js.brickify.io)

## Install

```bash
$ npm install @brickify/m-gobp
```

## Usage

```js
var getObject = require('@brickify/m-gobp');

var context = {
  foo: {
    bar: {
      baz: function() {
      }
    }
  }
};

// Use defined context
getObject('foo.bar.baz', context);


process.foo = {
    bar: {
      baz: function() {
      }
    }
};

// Use global context
getObject('foo.bar.baz');
```

## Returns

```js
{
  context: object|process|global|window,
  object: {
    decomposed: [...objects],
    first: object|process|global|window,
    last: End object value,
    parent: End parent object
  },
  paths: {
    decomposed: [...paths],
    first: first path,
    last: End parent object path
  }
}
```
