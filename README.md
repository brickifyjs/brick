
# MOTIVATIONS

I worked during three years at [INGENICO](https://www.ingenico.com) France, developing apps, webos, bridges for the new [TELIUM TETRA SMART TERMINALS](https://www.ingenico.com/our-solutions/telium-tetra).

The fastest solutions was definitely Vanilla JS.

I tried [Backbone](http://backbonejs.org/), but [Exoskeleton](http://paulmillr.com/exoskeleton), [webpack](https://webpack.github.io), and [Chaplin](http://chaplinjs.org) were a better alternative.

I tried [React](https://facebook.github.io/react), but [Mithril](https://mithril.js.org) was a better alternative.

The problem was that Mithril did not do sibling redraw and restarted diff from root.

Other VDOM frameworks were slow or did code evaluation and other CSP issues.

That's why I started to work on an embedded systems-friendly VDOM framework that would have a consise syntax, be tiny, be extremely fast, an did sibling redraw.

But I changed my mind and decided to completely rethink my project into something more flexible, open, atomic, and fully customizable…

Anyway, the VDOM Framework is well under development and will soon be release as a BrickJS project.

# GOALS

## Built-in solution for creating JavaScript projects based on Bricks (library, tools, frameworks, websites, etc.) for Node JS and the browser :

* Using Bricks (brick, projects/sub projects/API…) or whatever you name it.
* Using non BrickJS such as Npm modules or other JavaScript code.
* Using private and public domain.

## Be fast and tiny

* Using proven JavaScript techniques and good practices, benchmarking all you are doing.
* Using the smallest bundler that not produces useless code.

# 📦 BRICK.JS

<img src="https://media.giphy.com/media/zKuYMf3dcODU4/giphy-downsized-large.gif" />

> ⚠️ This project is under development, all of this things can be removed, updated or added.

> All is not here, i am still in reflection

> Please come back frequently to see news.

> A major reset commit will be released for end of April.

__Brick.js is a LOW LEVEL API.__

> Create, pack, diff, repack, unpack, destroy, move and link objects for creating any library, framework or JavaScript application.

* Built on a top Class system ✅
* Built-in middleware system
* Built-in hook system
* Built-in event system
* Built-in position system
* Built-in CRUD syntax
* Built-in REST syntax
* Built-in stack system (sync and async)
* Built-in prevent stack system
* Built-in diff system
* Built-in merge system 
* Built-in store system ✅
* Built-in config/props system
* Built-in pending system
* Built-in flow and lifecycle (root/sibling, manual/auto, up to down/down to up (phase))
* Built-in methods, utils and properties
* Built-in package, build, bundler system
* Built-in manipulation system
* Built-in envrinment system
* Built-in loader system (such as webpack, parcel or rollup)
* Structure can be done by a deporting system, global system, sub bricks system, clojure, polymorphism, sugar, alias syntax.
* Defined Brick structure
* Built-in documentation system using brickyll.js (Same as jekyll but written in JavaScript)
* Built-in unit tests system using ospec.js
* Built-in unit functionnal tests system using casper.js
* Built-in benchmark system using branchmarks.js
* Built-in coverage with instanbul.js


Easily extensible and overridable

Compatible with all VanillaJS code

Compatible with all version of JavaScript/EcmaScript

Compatible with NPM, bower.

Works browser side and server side

Works with bricks and non bricks (Any JavaScript object)

No dependencies

Few dev dependencies

Use with CommonJS, AMD module, global IIFE.

# 📖 Getting started

## Define a Brick

💻 [_Learn more about methods and properties_](#api)

👉 __Using EcmaScript 5__

```js
var Foo = B.extends(function () {
});
```

👉 __Using EcmaScript 6__

```js
class Foo extends B {
}
```


## Instantiate a new Brick

👉 __Using EcmaScript 5__

```js
// Using new operator
new Foo();

// Using b method
b(Foo);
```

👉 __Using EcmaScript 6__

```js
// Using new operator
new Foo();

// Using b method
b(Foo);
```


## Run unit tests with ospec.js

😿 Comming soon.

## Run functionnal tests with casper.js

😿 Comming soon.

## Run benchmarks

😿 Comming soon.

# 💻 Example using Slick.js

😿 Comming soon.

# 💻 Demo of Tetris

😿 Comming soon.

# 💻 API

😿 Work in progress.

* Signature methods, utils and constants.
* Examples
* Live demo

# 📦 Bundle

😿 Comming soon.

# 🎲 Playground

😿 Comming soon.

# 🔖 Bricks list

😿 Comming soon.

# 🔖 Projects and sub projects

😿 Comming soon.

# TODO

...

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
