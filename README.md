# BRICK.JS

> ⚠️ This project is under development, all of this things can be removed, updated or added.

__Brick.js is a LOW LEVEL API.__


📦 Create, pack, repack, unpack, destroy, move and link objects for creating any library, framework or JavaScript application.

* Built on a top Class system
* Built-in event system
* Built-in hook system
* Built-in middleware system
* Built-in stack system
* Built-in prevent stack system (continue, break, return the next stack/group of stack)
* Built-in diff system
* Built-in merge system 
* Built-in store system
* Built-in config/props system
* Built-in flow and life cycle (root/sibling, manual/auto, up to down/down to up)
* Built-in methods and properties
* Built-in conversion system
* Built-in package, build, bundler system
* Structure can be done by a deporting system, global system and sub bricks system.

Easily extensible and overridable

Compatible with all VanillaJS code

Compatible with all version of JavaScript/EcmaScript

Works browser side and server side

No dependencies

Use with CommonJS, AMD module, global IIFE.

# Getting started

## Define a Brick

💻 [_Learn more about methods and properties_](#api)

👉 __Using EcmaScript 5__

```
var Foo = Brick.extends(function () {
});
```

👉 __Using EcmaScript 6__

```
class Foo extends Brick {
}
```

## Define the Brick initializer

👉 __Using EcmaScript 5__

```
function foo(..., config, bricks) {
    return Brick.create(new Foo(..., config, bricks));
};
```

👉 __Using EcmaScript 6__

```
const foo = (..., config, bricks) => Brick.create(new Foo(..., config, bricks));
```

## API

## Bundle

## Bricks

## Projects and sub projects

## Support the project

Help me maintain the libraries, projects, sub projects, modules and bricks with donations.
[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/5)
