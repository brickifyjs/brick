# 📦 BRICK.JS

<img src="https://media.giphy.com/media/zKuYMf3dcODU4/giphy-downsized-large.gif" />

> ⚠️ This project is under development, all of this things can be removed, updated or added.

__Brick.js is a LOW LEVEL API.__

> Create, pack, repack, unpack, destroy, move and link objects for creating any library, framework or JavaScript application.

* Built on a top Class system
* Built-in middleware system
* Built-in hook system
* Built-in event system
* Built-in stack system
* Built-in prevent stack system (continue, break, return the next stack/group of stack)
* Built-in diff system
* Built-in merge system 
* Built-in store system
* Built-in config/props system
* Built-in flow and lifecycle (root/sibling, manual/auto, up to down/down to up)
* Built-in methods, utils and properties
* Built-in conversion system
* Built-in package, build, bundler system
* Structure can be done by a deporting system, global system and sub bricks system.

Easily extensible and overridable

Compatible with all VanillaJS code

Compatible with all version of JavaScript/EcmaScript

Works browser side and server side

No dependencies

Use with CommonJS, AMD module, global IIFE.

# 📖 Getting started

## Define a Brick

💻 [_Learn more about methods and properties_](#api)

👉 __Using EcmaScript 5__

```js
var Foo = Brick.extends(function () {
});
```

👉 __Using EcmaScript 6__

```js
class Foo extends Brick {
}
```

## Define the Brick initializer

👉 __Using EcmaScript 5__

```js
function foo(..., config, bricks) {
    return Brick.create(new Foo(..., config, bricks));
};
```

👉 __Using EcmaScript 6__

```js
const foo = (..., config, bricks) => Brick.create(new Foo(..., config, bricks));
```

## Attach a middleware to the Class

👉 __Using EcmaScript 5__

```js
function foo(..., config, bricks) {
    return Brick.create(new Foo(..., config, bricks));
};
```

👉 __Using EcmaScript 6__



## Attach a middleware to the Instance

👉 __Using EcmaScript 5__

```js
// Using the config object
{
  mw: {
    create: function() {}
  }
}

// Using the constructor
this.constructor = function() {
  this.middleware('create',function(){});
}

// Using the constructor and the Middleware Brick
this.constructor = function() {
  middleware('create',function(){}, this);
}

// Using global system
Brick.middleware(brickId, 'create', function(){});

// Using deporting system
brick.find(brickId).middleware('pack', function(){});

// Using deporting system
var fooBrick = brick.find(brickId);
fooBrick.middleware('pack', function(){});

// Using sub bricks system
foo(..., middleware('pack', function(){}));
```

👉 __Using EcmaScript 6__

## Attach a middleware to all Bricks

👉 __Using EcmaScript 5__

👉 __Using EcmaScript 6__

## Attach a middleware to all bricks

👉 __Using EcmaScript 5__

👉 __Using EcmaScript 6__

## Extend the core

👉 __Using EcmaScript 5__

```js
// Extending the constructor
Brick.baz = function() {};
Brick.qux = {};
Brick.quux = true;

// Extending the constructor prototype
Brick.prototype.baz = function() {};
Brick.prototype.qux = {};
Brick.prototype.quux = true;
```

👉 __Using EcmaScript 6__

## Extend a Brick

👉 __Using EcmaScript 5__

```js
var Bar = Foo.extends(function(){ ... });
```

👉 __Using EcmaScript 6__

## Override a Brick

👉 __Using EcmaScript 5__

```js
// Just redefine it...
var Foo = Brick.extends(function () {
});
```

👉 __Using EcmaScript 6__

## Retreive a Brick

👉 __Using EcmaScript 5__

```js

// Using commonJS
var Foo = require('brick-foo').Foo;
var foo = require('brick-foo').foo;

// Using global
window.foo;
window.Foo;

// Using Brick
Brick.register(Foo);

Brick.foo;
Brick.Foo;

```

👉 __Using EcmaScript 6__

## Create/Instantiate a new Brick

👉 __Using EcmaScript 5__

```js
foo(...);
```

👉 __Using EcmaScript 6__

## Convert anything to a Brick object

👉 __Using EcmaScript 5__

Not sure about this feature and implementation...

```js
Brick.brickify([mainValue,...], config, prototype, public, private, static);
```

👉 __Using EcmaScript 6__


## Understrand the stack

👉 __Using EcmaScript 5__

💡

```js
```

## Understrand the flow

👉 __Using EcmaScript 5__

💡

```js
```

## Understrand the lifecyle

👉 __Using EcmaScript 5__

💡

```js
```

## Understrand the prevent system

👉 __Using EcmaScript 5__

💡

```js
```

## Understrand the reactivity system

👉 __Using EcmaScript 5__

💡

```js
```

## Retreive a brick

👉 __Using EcmaScript 5__

💡

```js
```

👉 __Using EcmaScript 6__

## Access the merging method

Will be moved has a sub package in the core.

💡 [See on NPM](https://www.npmjs.com/package/@brickify/m-merge)

👉 __Using EcmaScript 5__

```js
Brick.merge(A, B, {...});
```

👉 __Using EcmaScript 6__



# 💻 API

😿 Work in progress.

# 📦 Bundle

😿 Comming soon.

# 🎲 Playground

😿 Comming soon.

# 🔖 Bricks list

😿 Comming soon.

# 🔖 Projects and sub projects

😿 Comming soon.

# 🆘 Help

You are welcome to create Pull Requests, ask questions, comment the code, improve, suggest new features and like it or not 🙂

[![Gitter](https://badges.gitter.im/brickifys-brick-js/Lobby.svg)](https://gitter.im/brickifys-brick-js/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

# 💵 Support the project with donations

Why ?

* Maintain, create, update and support
    * API
    * Libraries
    * Projects
    * Sub projects
    * Modules 
    * Bricks
* Pay domains, servers, cloudflare
* Gift 🍺🍣


[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/5) @ 5$

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/10) @ 10$

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/25) @ 25$

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/50) @ 50$

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.me/nraibaud/100) @ 100$

❤️ Thanks and happy coding!

<img src="https://media.giphy.com/media/1VrOcCmld1a92/giphy.gif" align="center" />
